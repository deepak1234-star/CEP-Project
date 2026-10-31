import { ToolLoopAgent, tool, isStepCount } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { WASTE_DATABASE } from "@/lib/wasteDatabase";

const geminiKey = process.env.GEMINI_API_KEY || "";
const google = createGoogleGenerativeAI({ apiKey: geminiKey });

export const FALLBACK_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

export const agentTools = {
  searchWasteDatabase: tool({
    description: "Search the official EcoSort waste database for detailed material specs, municipal bin color, preparation actions, and dos/donts.",
    inputSchema: z.object({
      query: z.string().describe("The item name or material keyword (e.g., 'plastic bottle', 'battery', 'pizza box', 'can', 'cfl')"),
    }),
    execute: async ({ query }) => {
      return executeSearchWaste(query);
    },
  }),

  calculateCarbonImpact: tool({
    description: "Calculate environmental savings (kg CO2, water saved, energy equivalent) for recycled quantities.",
    inputSchema: z.object({
      itemType: z.enum(["plastic_bottle", "aluminum_can", "cardboard_paper", "glass_bottle", "food_compost"]).describe("The category of material recycled"),
      quantity: z.number().min(1).describe("Number of items or kilograms recycled"),
    }),
    execute: async ({ itemType, quantity }) => {
      return executeCalculateImpact(itemType, quantity);
    },
  }),

  getDropOffLocations: tool({
    description: "Get specialized disposal instructions and authorized collection centers for non-curbside items (e-waste, batteries, toxic/hazardous, CFLs, pharmaceuticals).",
    inputSchema: z.object({
      wasteType: z.enum([
        "electronics_ewaste",
        "lithium_batteries",
        "cfl_mercury_bulbs",
        "hazardous_chemicals",
        "expired_medicines",
        "textiles_clothing",
      ]),
    }),
    execute: async ({ wasteType }) => {
      return executeGetDropOff(wasteType);
    },
  }),

  checkContaminationRisk: tool({
    description: "Assess contamination risk when food, liquids, or mixed non-recyclables are present.",
    inputSchema: z.object({
      primaryItem: z.string().describe("The waste item name"),
      hasFoodOrOilResidue: z.boolean().describe("Whether grease, dairy, sauce, or liquid remains"),
      targetBin: z.string().describe("Which bin the user intends to place it in"),
    }),
    execute: async ({ primaryItem, hasFoodOrOilResidue, targetBin }) => {
      return executeCheckContamination(primaryItem, hasFoodOrOilResidue, targetBin);
    },
  }),
};

export function executeSearchWaste(query: string) {
  const q = query.toLowerCase().trim();
  const matches: Array<{ key: string; item: any }> = [];

  for (const [key, val] of Object.entries(WASTE_DATABASE)) {
    if (
      key.toLowerCase().includes(q) ||
      val.itemName.toLowerCase().includes(q) ||
      val.category.toLowerCase().includes(q) ||
      val.explanation.toLowerCase().includes(q)
    ) {
      matches.push({ key, item: val });
    }
  }

  if (matches.length > 0) {
    const top = matches[0].item;
    return {
      found: true,
      itemName: top.itemName,
      category: top.category,
      binColor: top.binColor,
      binType: top.binType,
      resinCode: top.resinCode ?? null,
      resinName: top.resinName ?? null,
      preparationAction: top.preparationAction,
      dos: top.dos,
      donts: top.donts,
      decompositionTime: top.decompositionTime,
      co2SavedPerKg: top.co2SavedPerKg,
      recyclabilityRating: top.recyclabilityRating,
      commonMistake: top.commonMistake,
    };
  }

  return {
    found: false,
    message: `No exact database match found for "${query}".`,
  };
}

export function executeCalculateImpact(itemType: string, quantity: number) {
  const metrics: Record<string, { co2PerUnit: number; waterLitersPerUnit: number; kwhPerUnit: number; unitLabel: string }> = {
    plastic_bottle: { co2PerUnit: 0.08, waterLitersPerUnit: 3.0, kwhPerUnit: 0.35, unitLabel: "bottles" },
    aluminum_can: { co2PerUnit: 0.17, waterLitersPerUnit: 4.5, kwhPerUnit: 0.70, unitLabel: "cans" },
    cardboard_paper: { co2PerUnit: 1.10, waterLitersPerUnit: 26.0, kwhPerUnit: 4.0, unitLabel: "kg" },
    glass_bottle: { co2PerUnit: 0.30, waterLitersPerUnit: 1.5, kwhPerUnit: 0.42, unitLabel: "bottles" },
    food_compost: { co2PerUnit: 0.85, waterLitersPerUnit: 8.0, kwhPerUnit: 0.20, unitLabel: "kg" },
  };

  const config = metrics[itemType] || metrics["plastic_bottle"];
  const totalCo2 = +(quantity * config.co2PerUnit).toFixed(2);
  const totalWater = +(quantity * config.waterLitersPerUnit).toFixed(1);
  const totalKwh = +(quantity * config.kwhPerUnit).toFixed(2);
  const treeAbsorptionDays = +(totalCo2 / 0.06).toFixed(1);

  return {
    quantity,
    itemType,
    totalCo2SavedKg: totalCo2,
    totalWaterSavedLiters: totalWater,
    totalEnergySavedKwh: totalKwh,
    treeAbsorptionDaysEquivalent: treeAbsorptionDays,
  };
}

export function executeGetDropOff(wasteType: string) {
  const directory: Record<string, { binColor: string; facilityType: string; preparationSteps: string[]; hazards: string }> = {
    electronics_ewaste: {
      binColor: "red",
      facilityType: "Municipal E-Waste Recycling Center or Retail Tech Kiosks (e.g. Best Buy, Staples)",
      preparationSteps: [
        "Wipe all personal accounts and data from devices",
        "Remove detachable batteries and recycle them separately",
        "Keep cords wrapped together with rubber bands",
      ],
      hazards: "Prevents toxic lead, arsenic, and cadmium from leaching into groundwater.",
    },
    lithium_batteries: {
      binColor: "red",
      facilityType: "Battery Recycling Bins (Call2Recycle partner drop-offs, Home Depot, hardware stores)",
      preparationSteps: [
        "Tape over both terminal ends with clear packing tape or electrical tape to prevent short-circuits",
        "Never place swollen or leaking batteries in general bins",
        "Store in a cool dry container until drop-off",
      ],
      hazards: "Untaped lithium batteries cause compactor truck and recycling facility fires.",
    },
    cfl_mercury_bulbs: {
      binColor: "purple",
      facilityType: "Household Hazardous Waste (HHW) Facility or Home Improvement Store drop-offs",
      preparationSteps: [
        "Wrap in bubble wrap or place in original packaging so the glass doesn't shatter",
        "Never crush CFL or fluorescent tubes",
      ],
      hazards: "Contains vaporized mercury which is a potent neurological toxin.",
    },
    hazardous_chemicals: {
      binColor: "red",
      facilityType: "Municipal Hazardous Materials Drop-off Day",
      preparationSteps: [
        "Keep in original container with chemical hazard label intact",
        "Ensure tight caps; never mix different chemical cleaners together",
      ],
      hazards: "Can generate poisonous chlorine gas or chemical burns for waste workers.",
    },
    expired_medicines: {
      binColor: "red",
      facilityType: "Pharmacy Drug Take-Back Kiosks (Walgreens, CVS, hospital return bins)",
      preparationSteps: [
        "Scratch off personal patient info from pill bottles",
        "Never flush prescription pills down toilets or sinks",
      ],
      hazards: "Flushed pharmaceuticals contaminate drinking water reservoirs and aquatic life.",
    },
    textiles_clothing: {
      binColor: "blue",
      facilityType: "Textile Donation Bins, Goodwill, or Salvation Army Drop Boxes",
      preparationSteps: [
        "Wash and dry thoroughly",
        "Bag clean clothes in weather-proof bags before placing in donation bins",
      ],
      hazards: "Synthetic fabrics take 200+ years to degrade and shed harmful microplastics.",
    },
  };

  return directory[wasteType] || directory["electronics_ewaste"];
}

export function executeCheckContamination(primaryItem: string, hasFoodOrOilResidue: boolean, targetBin: string) {
  if (hasFoodOrOilResidue && (targetBin.toLowerCase().includes("blue") || targetBin.toLowerCase().includes("recycl"))) {
    return {
      isContaminated: true,
      warning: `High Contamination Risk! Food oil and liquid residue cannot be washed out of paper fibers and will spoil entire truckloads of recyclable paper and cardboard.`,
      recommendedAction: "Separate greasy parts into Organic Compost / Trash, and only recycle clean, grease-free dry portions.",
    };
  }

  return {
    isContaminated: false,
    warning: "No severe contamination detected.",
    recommendedAction: "Ensure item is empty, clean, and dry before placing in the recycling bin.",
  };
}

export function generateSmartAgentFallback(rawQuery: string) {
  const q = rawQuery.toLowerCase().trim();
  const toolsUsed: Array<{ toolName: string; args: any; output: any }> = [];

  // 1. SPECIFIC ITEM: Pizza Box & Greasy Food Contamination (MUST BE CHECKED FIRST)
  if (q.includes("pizza") || q.includes("grease") || q.includes("greasy")) {
    const contamResult = executeCheckContamination("pizza box", true, "blue recycling bin");
    const searchResult = executeSearchWaste("pizza box");

    toolsUsed.push({
      toolName: "checkContaminationRisk",
      args: { primaryItem: "pizza box", hasFoodOrOilResidue: true, targetBin: "blue" },
      output: contamResult,
    });
    if (searchResult.found) {
      toolsUsed.push({
        toolName: "searchWasteDatabase",
        args: { query: "pizza box" },
        output: searchResult,
      });
    }

    return {
      text: `### 🍕 Can You Recycle a Pizza Box?\n\n` +
        `**It depends on whether it is greasy or clean:**\n\n` +
        `⚠️ **Greasy/Cheese-Soaked Parts:** **DO NOT place in Blue Recycling Bin.**\n` +
        `* Food oil and grease cannot be separated from paper fibers during paper recycling, ruining entire truckloads of cardboard.\n\n` +
        `✅ **How to Sort Properly:**\n` +
        `1. **Tear off the clean lid:** Place the clean top half in the **Blue Recyclables Bin**.\n` +
        `2. **Greasy bottom section:** Tear it up and put it in the **Green Organic Compost Bin** (or general trash if no municipal composting).\n\n` +
        `* **Recyclability Rating:** **Special Handling (Separate Clean vs Greasy)**`,
      toolsUsed,
      modelUsed: "eco-rules-engine (deterministic)",
    };
  }

  // 2. SPECIFIC ITEM: Batteries & Hazardous E-Waste
  if (q.includes("battery") || q.includes("batteries") || q.includes("phone") || q.includes("electronic") || q.includes("ewaste") || q.includes("cfl") || q.includes("medicine")) {
    let wasteType = "electronics_ewaste";
    if (q.includes("battery") || q.includes("batteries")) wasteType = "lithium_batteries";
    else if (q.includes("cfl") || q.includes("bulb")) wasteType = "cfl_mercury_bulbs";
    else if (q.includes("medicine") || q.includes("drug") || q.includes("pill")) wasteType = "expired_medicines";

    const dropOffResult = executeGetDropOff(wasteType);
    toolsUsed.push({
      toolName: "getDropOffLocations",
      args: { wasteType },
      output: dropOffResult,
    });

    return {
      text: `### ⚠️ Safe Special Disposal Instructions\n\n` +
        `This item requires **Special Handling** and must **NOT** be placed in regular curbside bins:\n\n` +
        `* **Designated Bin Color:** **${dropOffResult.binColor.toUpperCase()} (Hazardous / Special Drop-Off)**\n` +
        `* **Authorized Facility:** ${dropOffResult.facilityType}\n` +
        `* **Preparation Steps:**\n` +
        dropOffResult.preparationSteps.map((s) => `  - ${s}`).join("\n") + "\n" +
        `* **Environmental Hazard:** ${dropOffResult.hazards}`,
      toolsUsed,
      modelUsed: "eco-rules-engine (deterministic)",
    };
  }

  // 3. CARBON CALCULATION: Only if user explicitly asks to calculate CO2/savings with numbers
  const hasCalcIntent = /\b(calculate|carbon|savings?|co2|water\s+saved|impact|how\s+much\s+co2)\b/.test(q);
  const qtyMatch = q.match(/(\d+)\s*(bottles?|cans?|kg|items?)/);
  if (hasCalcIntent) {
    const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 10;
    let itemType: "plastic_bottle" | "aluminum_can" | "cardboard_paper" | "glass_bottle" | "food_compost" = "plastic_bottle";
    if (/\b(aluminum|soda\s*can|drink\s*can|tin\s*can|cans)\b/.test(q)) itemType = "aluminum_can";
    else if (/\b(paper|cardboard|box|boxes)\b/.test(q)) itemType = "cardboard_paper";
    else if (/\b(glass|jars?)\b/.test(q)) itemType = "glass_bottle";
    else if (/\b(food|compost|scraps?)\b/.test(q)) itemType = "food_compost";

    const calcResult = executeCalculateImpact(itemType, qty);
    toolsUsed.push({
      toolName: "calculateCarbonImpact",
      args: { itemType, quantity: qty },
      output: calcResult,
    });

    return {
      text: `### 🌿 Environmental Savings Calculation\n\n` +
        `Recycling **${qty} ${itemType.replace("_", " ")}s** generates significant planetary savings:\n\n` +
        `* **CO₂ Emissions Avoided:** **${calcResult.totalCo2SavedKg} kg CO₂**\n` +
        `* **Water Conserved:** **${calcResult.totalWaterSavedLiters} Liters**\n` +
        `* **Energy Saved:** **${calcResult.totalEnergySavedKwh} kWh**\n` +
        `* **Tree Absorption Equivalent:** Equal to **${calcResult.treeAbsorptionDaysEquivalent} days** of carbon absorbed by a mature tree!\n\n` +
        `Keep up the great sorting habit! Every item recycled keeps virgin materials in the ground.`,
      toolsUsed,
      modelUsed: "eco-rules-engine (deterministic)",
    };
  }

  // 4. DATABASE SEARCH: Look for matching items in WASTE_DATABASE
  const itemKeywords = [
    { match: /\b(bottle|water\s*bottle|pet)\b/, key: "plastic_bottle" },
    { match: /\b(milk\s*jug|detergent|shampoo|hdpe)\b/, key: "milk_jug" },
    { match: /\b(cans?|aluminum\s*can|soda\s*can|tin\s*can)\b/, key: "metal_can" },
    { match: /\b(glass|wine\s*bottle|beer\s*bottle|jar)\b/, key: "glass_bottle" },
    { match: /\b(newspaper|paper|cardboard|carton)\b/, key: "newspaper" },
    { match: /\b(styrofoam|thermocol|foam)\b/, key: "styrofoam" },
    { match: /\b(coffee\s*cup|disposable\s*cup)\b/, key: "coffee_cup" },
    { match: /\b(tetra\s*pak|juice\s*carton)\b/, key: "tetra_pak" },
    { match: /\b(banana|apple|fruit|food\s*scrap)\b/, key: "banana_peel" },
    { match: /\b(clothes?|shirt|pants?|textile)\b/, key: "clothes" },
  ];

  let foundKey = "plastic_bottle";
  let didMatch = false;
  for (const item of itemKeywords) {
    if (item.match.test(q)) {
      foundKey = item.key;
      didMatch = true;
      break;
    }
  }

  const dbResult = executeSearchWaste(foundKey);
  toolsUsed.push({
    toolName: "searchWasteDatabase",
    args: { query: foundKey },
    output: dbResult,
  });

  if (dbResult.found && didMatch) {
    return {
      text: `### ♻️ EcoSort Sorting Guide: ${dbResult.itemName}\n\n` +
        `* **Material Category:** **${dbResult.category}**\n` +
        `* **Assigned Bin Color:** **${dbResult.binColor.toUpperCase()} (${dbResult.binType})**\n` +
        (dbResult.resinCode ? `* **Resin ID Code:** **#${dbResult.resinCode} (${dbResult.resinName})**\n` : "") +
        `* **Preparation Step:** ${dbResult.preparationAction}\n` +
        `* **Decomposition Lifespan:** ~${dbResult.decompositionTime || "N/A"}\n` +
        `* **Recyclability Rating:** **${dbResult.recyclabilityRating || "High"}**\n\n` +
        `**Key DOs:**\n` +
        (dbResult.dos || []).map((d: string) => ` - ${d}`).join("\n") + "\n\n" +
        `**Common Mistake to Avoid:**\n` +
        ` ⚠️ ${dbResult.commonMistake || "Placing without rinsing."}`,
      toolsUsed,
      modelUsed: "eco-rules-engine (deterministic)",
    };
  }

  return {
    text: `Hello! I am EcoSort AI. Ask me about any specific item (e.g. *"Can I recycle a pizza box?"*, *"How to dispose of batteries?"*, or *"Calculate CO2 for 15 plastic bottles"*).`,
    toolsUsed,
    modelUsed: "eco-rules-engine (deterministic)",
  };
}

export function createEcoSortAgent(modelName = "gemini-3.5-flash") {
  return new ToolLoopAgent({
    model: google(modelName),
    instructions: `You are EcoSort AI, an elite environmental scientist and conversational recycling assistant built with the Vercel AI SDK.
Your mission is to provide crystal-clear, scientifically accurate, and encouraging advice to help users sort waste, recycle correctly, prevent municipal bin contamination, and calculate their real environmental impact.

Guidelines:
1. When a user asks about an item or material, ALWAYS call the 'searchWasteDatabase' tool first to retrieve official recycling rules, resin codes, bin colors, and preparation steps.
2. If the user asks about carbon savings, impact, or quantities (e.g. "I recycled 10 bottles"), use the 'calculateCarbonImpact' tool to compute exact metrics.
3. If the user asks about hazardous items, batteries, e-waste, chemicals, or medicines, call 'getDropOffLocations' to provide safe specialized disposal instructions.
4. If the item might contain grease, liquids, or mixed materials, use 'checkContaminationRisk' to advise on preventing batch contamination.
5. Provide actionable, concise, friendly responses using markdown formatting (bullet points, bold text). Highlight the correct bin color (Green, Blue, Yellow, Red, Purple) prominently.`,
    stopWhen: isStepCount(5),
    tools: agentTools,
  });
}

export async function runEcoSortAgent({ prompt, userQuery }: { prompt: string; userQuery?: string }) {
  const queryToEvaluate = userQuery || prompt;

  // First attempt using Gemini with tool calling
  for (const modelName of FALLBACK_MODELS) {
    try {
      const agent = createEcoSortAgent(modelName);
      const result = await agent.generate({ prompt });
      return { result, modelUsed: modelName, isFallback: false };
    } catch (err: any) {
      console.warn(`Model ${modelName} call failed:`, err.message);
    }
  }

  // Graceful deterministic fallback when Gemini API free-tier quota is hit
  console.log("Using EcoSort intelligent rules engine fallback for query:", queryToEvaluate);
  const fallback = generateSmartAgentFallback(queryToEvaluate);
  return {
    result: {
      text: fallback.text,
      steps: [
        {
          toolCalls: fallback.toolsUsed.map((t, idx) => ({
            toolCallId: `call_${idx}`,
            toolName: t.toolName,
            args: t.args,
          })),
          toolResults: fallback.toolsUsed.map((t, idx) => ({
            toolCallId: `call_${idx}`,
            result: t.output,
          })),
        },
      ],
    },
    modelUsed: fallback.modelUsed,
    isFallback: true,
  };
}
