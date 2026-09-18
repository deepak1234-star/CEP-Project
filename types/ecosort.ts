export type WasteCategory =
  | "Organic"
  | "Paper"
  | "Plastic"
  | "Metal"
  | "Glass"
  | "E-Waste"
  | "Hazardous";

export interface ClassificationResult {
  id: string;
  itemName: string;
  category: WasteCategory;
  binType: string;
  binColor: "green" | "blue" | "yellow" | "purple" | "red";
  confidence: number;
  preparationAction: string;
  dos: string[];
  donts: string[];
  explanation: string;
  imageUrl?: string;
  createdAt: string;
  resinCode?: number;
  resinName?: string;
  decompositionTime?: string;
  co2SavedPerKg?: string;
  recyclabilityRating?: "High" | "Medium" | "Low" | "Special Handling";
  commonMistake?: string;
  /** Hint shown after a camera capture when no item keyword is provided */
  classificationNote?: string;
}

export interface BinInfo {
  category: WasteCategory;
  binName: string;
  colorHex: string;
  bgTailwind: string;
  borderTailwind: string;
  textTailwind: string;
  description: string;
  examples: string[];
  sortingRules: string[];
}

export interface ResinCodeInfo {
  code: number;
  symbol: string;
  abbreviation: string;
  fullName: string;
  recyclability: "Widely Recycled" | "Locally Recycled" | "Difficult to Recycle" | "Rarely Recycled";
  safetyLevel: "Safe" | "Caution" | "Avoid / Toxic Hazard";
  commonProducts: string[];
  recycledInto: string[];
  description: string;
  microwaveSafe: boolean;
  colorHex: string;
}

export interface EcoBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "scanner" | "quiz" | "category" | "milestone";
  requiredCount: number;
  unlockedAt?: string;
}
