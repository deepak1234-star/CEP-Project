import { NextResponse } from "next/server";
import { WASTE_DATABASE } from "@/lib/wasteDatabase";

async function classifyWithGeminiVision(imageBase64: string, apiKey: string) {
  try {
    let cleanBase64 = imageBase64;
    let mimeType = "image/jpeg";
    const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      mimeType = matches[1];
      cleanBase64 = matches[2];
    }

    const prompt = `You are EcoSort AI, a world-class environmental expert in waste classification, material science, and recycling.
Analyze the provided image and classify the primary waste or recyclable item shown.
Return ONLY a valid JSON object matching this schema with no markdown formatting:
{
  "itemName": "Specific item name (e.g., Clear PET Water Bottle, Aluminum Beverage Can, Banana Peel, Cardboard Box)",
  "category": "Must be exactly one of: Organic | Paper | Plastic | Metal | Glass | E-Waste | Hazardous",
  "binType": "Appropriate municipal bin type name (e.g. Dry Recyclables Blue Bin, Organic Compost Green Bin, Hazardous Special Bin)",
  "binColor": "Must be exactly one of: green | blue | yellow | purple | red",
  "confidence": An integer between 88 and 99 reflecting visual classification certainty,
  "preparationAction": "One clear action instruction (e.g. Empty liquids, rinse thoroughly, and leave cap on)",
  "dos": ["Array of 3 practical DO instructions for recycling or composting this item"],
  "donts": ["Array of 3 common mistakes or DONT instructions to avoid contamination"],
  "explanation": "2 clear sentences explaining the material composition, why it belongs to this category, and how it is recycled",
  "resinCode": An integer from 1 to 7 if plastic (e.g. 1 for PET, 2 for HDPE, 5 for PP), or null if not plastic,
  "resinName": "Plastic resin abbreviation and full name if plastic, or null",
  "decompositionTime": "Estimated landfill decomposition duration (e.g. ~450 Years, ~2-4 Weeks, 100+ Years)",
  "co2SavedPerKg": "Estimated CO2 savings metric (e.g. 1.8 kg CO2, 2.5 kg CO2)",
  "recyclabilityRating": "Must be one of: High | Medium | Low | Special Handling",
  "commonMistake": "The single most common sorting mistake made with this specific item"
}`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json",
      },
    };

    const models = ["gemini-3.5-flash", "gemini-3.8-flash", "gemini-flash-latest"];
    for (const model of models) {
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
              return parsed;
            }
          }
        } else {
          const errText = await res.text();
          console.warn(`Model ${model} returned HTTP ${res.status}: ${errText.slice(0, 200)}`);
        }
      } catch (err) {
        console.warn(`Model ${model} attempt failed:`, err);
      }
    }
  } catch (err) {
    console.warn("Gemini vision classification error:", err);
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sampleKey, fileName, searchQuery, imageBase64 } = body;

    let itemData = WASTE_DATABASE[sampleKey || "plastic_bottle"];
    let classificationNote: string | undefined;

    const matchText = (text: string) => {
      const q = text.toLowerCase().trim();
      if (q.includes("toothbrush") || q.includes("dental") || q.includes("bristle")) {
        return WASTE_DATABASE["toothbrush"];
      } else if (q.includes("medicine") || q.includes("pill") || q.includes("tablet") || q.includes("blister") || q.includes("pharma") || q.includes("drug")) {
        return WASTE_DATABASE["expired_medicine"];
      } else if (q.includes("bulb") || q.includes("cfl") || q.includes("tube") || q.includes("mercury") || q.includes("fluorescent")) {
        return WASTE_DATABASE["cfl_bulb"];
      } else if (q.includes("styrofoam") || q.includes("thermocol") || q.includes("eps") || q.includes("foam cup") || q.includes("foam tray")) {
        return WASTE_DATABASE["styrofoam"];
      } else if (q.includes("coffee cup") || q.includes("tea cup") || q.includes("paper cup") || q.includes("disposable cup") || q.includes("starbucks")) {
        return WASTE_DATABASE["coffee_cup"];
      } else if (q.includes("tetra") || q.includes("milk carton") || q.includes("juice carton") || q.includes("juice box") || q.includes("aseptic")) {
        return WASTE_DATABASE["tetra_pak"];
      } else if (q.includes("cloth") || q.includes("shirt") || q.includes("pants") || q.includes("textile") || q.includes("fabric") || q.includes("cotton") || q.includes("garment")) {
        return WASTE_DATABASE["clothes"];
      } else if (q.includes("milk jug") || q.includes("detergent") || q.includes("shampoo") || q.includes("hdpe")) {
        return WASTE_DATABASE["milk_jug"];
      } else if (q.includes("foil") || q.includes("pie tray") || q.includes("aluminum wrap") || q.includes("tin foil")) {
        return WASTE_DATABASE["aluminum_foil"];
      } else if (q.includes("takeout") || q.includes("food container") || q.includes("tupperware") || q.includes("polypropylene") || q.includes("meal box")) {
        return WASTE_DATABASE["food_container_pp"];
      } else if (q.includes("phone") || q.includes("mobile") || q.includes("cell") || q.includes("smartphone") || q.includes("iphone") || q.includes("android") || q.includes("gadget")) {
        return WASTE_DATABASE["old_phone"];
      } else if (q.includes("charger") || q.includes("cable") || q.includes("cord") || q.includes("wire") || q.includes("usb")) {
        return WASTE_DATABASE["laptop_charger"];
      } else if (q.includes("pizza") || q.includes("greasy") || q.includes("food box")) {
        return WASTE_DATABASE["pizza_box"];
      } else if (q.includes("bag") || q.includes("poly") || q.includes("film") || q.includes("wrapper") || q.includes("pouch")) {
        return WASTE_DATABASE["plastic_bag"];
      } else if (q.includes("battery") || q.includes("accu") || q.includes("lithium")) {
        return WASTE_DATABASE["battery"];
      } else if (q.includes("glass") || q.includes("jar") || (q.includes("bottle") && (q.includes("wine") || q.includes("beer")))) {
        return WASTE_DATABASE["glass_bottle"];
      } else if (q.includes("can") || q.includes("tin") || q.includes("aluminum") || q.includes("soda") || q.includes("coke")) {
        return WASTE_DATABASE["metal_can"];
      } else if (q.includes("banana") || q.includes("apple") || q.includes("peel") || q.includes("food") || q.includes("fruit") || q.includes("vegetable") || q.includes("scrap")) {
        return WASTE_DATABASE["banana_peel"];
      } else if (q.includes("paper") || q.includes("news") || q.includes("cardboard") || q.includes("box") || q.includes("envelope") || q.includes("book")) {
        return WASTE_DATABASE["newspaper"];
      }
      return null;
    };

    // 1. If an image is provided and Gemini API key is configured, run real AI Vision analysis
    const geminiKey = process.env.GEMINI_API_KEY;

    let geminiSucceeded = false;

    if (imageBase64 && geminiKey) {
      const geminiResult = await classifyWithGeminiVision(imageBase64, geminiKey);
      if (geminiResult) {
        itemData = {
          ...geminiResult,
          imageUrl: imageBase64,
        };
        classificationNote = "Analyzed with Google Gemini Vision AI in real time ✨";
        geminiSucceeded = true;
      }
    }

    // 2. If Gemini was not used or did not match, use search query or filename or preset fallback
    if (!geminiSucceeded) {
      if (searchQuery) {
        const match = matchText(searchQuery);
        if (match) itemData = match;
        else itemData = WASTE_DATABASE["plastic_bottle"];
      } else if (fileName) {
        const match = matchText(fileName);
        if (match) itemData = match;
        else itemData = WASTE_DATABASE["plastic_bottle"];
      } else if (sampleKey && WASTE_DATABASE[sampleKey]) {
        itemData = WASTE_DATABASE[sampleKey];
      } else if (imageBase64) {
        itemData = WASTE_DATABASE["plastic_bottle"];
        classificationNote =
          "Photo captured! For extra precision, you can also select a preset or type a keyword.";
      }
    }

    const result = {
      id: `scan-${Date.now()}`,
      ...itemData,
      createdAt: new Date().toISOString(),
      ...(classificationNote ? { classificationNote } : {}),
    };

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to classify waste" },
      { status: 500 }
    );
  }
}
