import { ToolLoopAgent, tool, isStepCount } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const geminiKey = process.env.GEMINI_API_KEY || "";
const google = createGoogleGenerativeAI({ apiKey: geminiKey });

// High-availability models with active quota on Google Generative AI
export const AGENT_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-3.8-flash",
];

const agentTools = {
  calculateCarbonImpact: tool({
    description: "Calculate carbon, water, and energy savings when the user mentions specific quantities of recycled items (e.g. 10 bottles, 5 cans, 20 kg paper).",
    inputSchema: z.object({
      itemType: z.enum(["plastic_bottle", "aluminum_can", "cardboard_paper", "glass_bottle", "food_compost"]).describe("Material category"),
      quantity: z.number().min(1).describe("Number of items or kilograms"),
    }),
    execute: async ({ itemType, quantity }) => {
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
        itemType,
        quantity,
        totalCo2SavedKg: totalCo2,
        totalWaterSavedLiters: totalWater,
        totalEnergySavedKwh: totalKwh,
        treeAbsorptionDaysEquivalent: treeAbsorptionDays,
      };
    },
  }),

  getSpecializedDisposalGuide: tool({
    description: "Retrieve safety protocols and authorized drop-off guidance for hazardous items, electronic e-waste, lithium batteries, mercury bulbs, or chemicals that cannot go in normal household bins.",
    inputSchema: z.object({
      hazardousType: z.enum([
        "lithium_or_household_batteries",
        "electronics_and_smartphones",
        "cfl_or_mercury_bulbs",
        "paint_and_solvents",
        "expired_pharmaceuticals",
      ]),
    }),
    execute: async ({ hazardousType }) => {
      const guide: Record<string, { binColor: string; facility: string; safetySteps: string[]; risk: string }> = {
        lithium_or_household_batteries: {
          binColor: "RED",
          facility: "Call2Recycle partner drop-offs, hardware stores, or municipal hazardous waste drop-off",
          safetySteps: [
            "Tape the battery terminals with clear tape or electrical tape to prevent short circuits",
            "Never throw in trash or standard curbside recycling — risk of vehicle/facility fires",
          ],
          risk: "Heavy metals (lithium, cobalt) and fire hazard when crushed in compactor trucks",
        },
        electronics_and_smartphones: {
          binColor: "RED",
          facility: "Authorized E-Waste collection kiosks, tech retailer recycling bins, or municipal depot",
          safetySteps: [
            "Factory reset device and remove SIM/SD cards",
            "Recycle detachable batteries separately",
          ],
          risk: "Toxic lead, cadmium, and arsenic contaminating groundwater",
        },
        cfl_or_mercury_bulbs: {
          binColor: "PURPLE / RED",
          facility: "Municipal Household Hazardous Waste (HHW) drop-off center",
          safetySteps: [
            "Keep bulb intact, never crush or break",
            "Wrap carefully in bubble wrap or cardboard before transporting",
          ],
          risk: "Mercury vapor is a potent neurotoxin released if shattered",
        },
        paint_and_solvents: {
          binColor: "RED",
          facility: "Hazardous Materials Drop-Off Day",
          safetySteps: [
            "Keep in original labeled container",
            "Never pour down drains, sewers, or toilets",
          ],
          risk: "Toxic groundwater contamination and sewer pipe corrosion",
        },
        expired_pharmaceuticals: {
          binColor: "RED",
          facility: "Pharmacy Drug Take-Back Kiosk (e.g. hospital or local pharmacy return bin)",
          safetySteps: [
            "Scratch out patient identity from the bottle",
            "Never flush medicines down toilet or drain",
          ],
          risk: "Contaminates aquatic ecosystems and municipal drinking water supplies",
        },
      };

      return guide[hazardousType] || guide["electronics_and_smartphones"];
    },
  }),
};

export function createEcoSortAgent(modelName = "gemini-3.5-flash-lite") {
  return new ToolLoopAgent({
    model: google(modelName),
    instructions: `You are EcoSort AI, a friendly, authoritative environmental scientist and waste sorting expert powered by Google Gemini and the Vercel AI SDK.

Core Responsibilities:
1. Always understand the user's natural language question accurately and respond in a helpful, conversational, and direct manner.
2. For municipal waste sorting:
   - Food waste, organic scraps, vegetable peels ➡️ Green Compost / Organic Bin
   - Clean paper, dry cardboard, metal cans, glass jars ➡️ Blue / Yellow Recyclables Bin
   - Greasy pizza boxes, soiled food paper, non-recyclable plastic wraps ➡️ Trash or Compost for clean cardboard top
   - Batteries, electronics, CFL bulbs, chemicals ➡️ Red / Hazardous Specialized drop-off
3. Highlight bin colors (Green, Blue, Yellow, Red, Purple) clearly using markdown formatting.
4. When the user asks to calculate carbon savings or mentions counts of recycled items (e.g. 10 bottles), call the 'calculateCarbonImpact' tool.
5. When the user asks about hazardous or electronic waste, call 'getSpecializedDisposalGuide'.
6. Keep answers concise, clear, and encouraging. Never make up fake errors or use robotic fallback templates.`,
    stopWhen: isStepCount(5),
    tools: agentTools,
  });
}

export async function runEcoSortAgent({ prompt }: { prompt: string }) {
  let lastError: any = null;

  // Try active Gemini models in priority order
  for (const modelName of AGENT_MODELS) {
    try {
      const agent = createEcoSortAgent(modelName);
      const result = await agent.generate({ prompt });
      return { result, modelUsed: modelName };
    } catch (err: any) {
      console.warn(`Model ${modelName} failed, attempting next:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to reach Gemini AI services.");
}

export const ecoSortAgent = createEcoSortAgent("gemini-3.5-flash-lite");
