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
