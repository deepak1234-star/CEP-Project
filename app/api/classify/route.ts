import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { logScanActivity } from "@/lib/db/activityService";

// Active Gemini models with available quota, tested and prioritized
const GEMINI_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-3.8-flash",
];

interface GeminiClassificationResponse {
  itemName: string;
  category: string;
  binType: string;
  binColor: string;
  confidence: number;
  preparationAction: string;
  dos: string[];
  donts: string[];
  explanation: string;
  resinCode?: number | null;
  resinName?: string | null;
  decompositionTime?: string;
  co2SavedPerKg?: string;
  recyclabilityRating?: string;
  commonMistake?: string;
}

async function classifyWithGemini(params: {
  imageBase64?: string;
  searchQuery?: string;
  fileName?: string;
}): Promise<GeminiClassificationResponse | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined in environment variables.");
    return null;
  }

  const { imageBase64, searchQuery, fileName } = params;

  let cleanBase64: string | null = null;
  let mimeType = "image/jpeg";

  if (imageBase64) {
    const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      mimeType = matches[1];
      cleanBase64 = matches[2];
    } else {
      cleanBase64 = imageBase64;
    }
  }

  const userQueryText = searchQuery || (fileName ? `File: ${fileName}` : "");

  const prompt = `You are WasteIQ AI, a world-class environmental scientist, material researcher, and recycling expert.
Analyze the provided ${cleanBase64 ? "image" : `item inquiry: "${userQueryText}"`} and classify the primary waste or recyclable item.

Return ONLY a valid JSON object matching this schema with no markdown code fences:
{
  "itemName": "Specific item name (e.g. Clear PET Beverage Bottle, Cardboard Shipping Box, Lithium-ion Phone Battery, Aluminum Beverage Can, Banana Peel)",
  "category": "Must be one of: Plastic | Paper | Metal | Glass | Organic | E-Waste | Hazardous | Textile",
  "binType": "Appropriate municipal collection bin name (e.g. Dry Recyclables Blue Bin, Organic Compost Green Bin, Hazardous Waste Red Bin, Plastics Yellow Bin)",
  "binColor": "Must be exactly one of: green | blue | yellow | purple | red",
  "confidence": An integer between 85 and 99 reflecting classification certainty,
  "preparationAction": "One clear, concise action instruction (e.g. Empty all liquids, rinse thoroughly, and crush flat)",
  "dos": ["Array of 3 practical DO instructions for recycling or composting this item correctly"],
  "donts": ["Array of 3 common DONT mistakes to avoid contaminating the batch"],
  "explanation": "2 clear sentences explaining the material composition, why it belongs to this category, and how it is processed",
  "resinCode": An integer from 1 to 7 if plastic (1 for PET, 2 for HDPE, 5 for PP), or null if not plastic,
  "resinName": "Plastic resin abbreviation and full name if plastic (e.g. PETE (Polyethylene Terephthalate)), or null",
  "decompositionTime": "Estimated landfill decomposition duration (e.g. ~450 Years, ~2-4 Weeks, 100+ Years)",
  "co2SavedPerKg": "Estimated CO2 savings metric (e.g. 1.8 kg CO2, 2.5 kg CO2)",
  "recyclabilityRating": "Must be one of: High | Medium | Low | Special Handling",
  "commonMistake": "The single most common sorting mistake made with this specific item"
}`;

  const parts: any[] = [{ text: prompt }];

  if (cleanBase64) {
    parts.push({
      inlineData: {
        mimeType,
        data: cleanBase64,
      },
    });
  }

  const payload = {
    contents: [{ parts }],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
    },
  };

  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const cleaned = text
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();
          const parsed = JSON.parse(cleaned);

          if (parsed && parsed.itemName && parsed.category) {
            // Normalize binColor to lowercase valid values
            let normalizedBinColor = (parsed.binColor || "blue").toLowerCase().trim();
            if (!["green", "blue", "yellow", "purple", "red"].includes(normalizedBinColor)) {
              if (normalizedBinColor.includes("green")) normalizedBinColor = "green";
              else if (normalizedBinColor.includes("blue")) normalizedBinColor = "blue";
              else if (normalizedBinColor.includes("yellow")) normalizedBinColor = "yellow";
              else if (normalizedBinColor.includes("red")) normalizedBinColor = "red";
              else if (normalizedBinColor.includes("purple")) normalizedBinColor = "purple";
              else normalizedBinColor = "blue";
            }

            // Normalize confidence to percentage integer (80 - 99)
            let conf = parsed.confidence;
            if (typeof conf === "number") {
              if (conf <= 1) conf = Math.round(conf * 100);
              conf = Math.min(99, Math.max(80, Math.round(conf)));
            } else {
              conf = 95;
            }

            return {
              ...parsed,
              binColor: normalizedBinColor,
              confidence: conf,
              dos: Array.isArray(parsed.dos) ? parsed.dos : [parsed.dos || "Check local municipal recycling rules."],
              donts: Array.isArray(parsed.donts) ? parsed.donts : [parsed.donts || "Do not dispose in unauthorized bins."],
            };
          }
        }
      } else {
        const errText = await res.text();
        console.warn(`Gemini model ${model} failed with HTTP ${res.status}: ${errText.slice(0, 150)}`);
      }
    } catch (err) {
      console.warn(`Error attempting Gemini model ${model}:`, err);
    }
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64, searchQuery, fileName } = body;

    if (!imageBase64 && !searchQuery && !fileName) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide an image or item name for Gemini AI waste classification.",
        },
        { status: 400 }
      );
    }

    // Pure Google Gemini AI classification
    const geminiResult = await classifyWithGemini({
      imageBase64,
      searchQuery,
      fileName,
    });

    if (!geminiResult) {
      return NextResponse.json(
        {
          success: false,
          error: "Google Gemini AI was unable to classify this item. Please ensure an active GEMINI_API_KEY is configured.",
        },
        { status: 502 }
      );
    }

    const result = {
      id: `scan-${Date.now()}`,
      ...geminiResult,
      imageUrl: imageBase64 || undefined,
      classificationNote: "Classified by Google Gemini Multimodal Vision AI in real time ✨",
      createdAt: new Date().toISOString(),
    };

    // If user is logged in via Clerk, automatically record activity into MongoDB & Clerk metadata
    try {
      const { userId } = await auth();
      if (userId) {
        const user = await currentUser();
        const primaryEmail =
          user?.emailAddresses.find((e) => e.id === user?.primaryEmailAddressId)?.emailAddress ||
          user?.emailAddresses[0]?.emailAddress ||
          "";
        const userName =
          `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.username || "Eco Recycler";
        const userAvatar = user?.imageUrl || "";

        let co2Num = 0.5;
        if (result.co2SavedPerKg) {
          const match = result.co2SavedPerKg.match(/([\d.]+)/);
          if (match) co2Num = parseFloat(match[1]);
        }

        await logScanActivity({
          userId,
          userEmail: primaryEmail,
          userName,
          userAvatar,
          itemName: result.itemName,
          category: result.category,
          binType: result.binType,
          binColor: result.binColor,
          co2SavedKg: co2Num,
          confidence: result.confidence,
          preparationAction: result.preparationAction,
          dos: result.dos,
          donts: result.donts,
          explanation: result.explanation,
          resinCode: result.resinCode,
          resinName: result.resinName,
          decompositionTime: result.decompositionTime,
          source: "camera_scan",
        });
      }
    } catch (syncErr) {
      console.warn("Could not sync scan activity to DB/Clerk:", syncErr);
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Gemini classification API route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to classify waste with Google Gemini",
      },
      { status: 500 }
    );
  }
}
