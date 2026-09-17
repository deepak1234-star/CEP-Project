import { ClassificationResult, BinInfo, WasteCategory } from "@/types/ecosort";

export interface ExtendedClassificationResult extends ClassificationResult {
  decompositionTime: string;
  co2SavedPerKg: string;
  recyclabilityRating: "High" | "Medium" | "Low" | "Special Handling";
  commonMistake: string;
}

export const WASTE_DATABASE: Record<string, Omit<ExtendedClassificationResult, "id" | "createdAt">> = {
  "plastic_bottle": {
    itemName: "PET Plastic Drink Bottle (#1)",
    category: "Plastic",
    binType: "BLUE / YELLOW BIN (Dry Recyclable Waste)",
    binColor: "yellow",
    confidence: 97,
    preparationAction: "Empty all liquid contents, rinse quickly, crush flat to save bin space, and replace the cap.",
    dos: [
      "Empty and rinse out remaining liquid residual.",
      "Crush the bottle flat to optimize bin capacity.",
      "Check for PET #1 recycling triangle mark."
    ],
    donts: [
      "Do not leave liquids or food syrup inside.",
      "Do not burn plastic bottles.",
      "Do not throw in organic wet waste bins."
    ],
    explanation: "PET plastic can be melted down and spun into polyester textile fibers, carpet yarns, or new food-grade beverage bottles.",
    decompositionTime: "450 Years",
    co2SavedPerKg: "1.5 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Leaving half-full liquids inside, which contaminates paper recycling."
  },
  "plastic_bag": {
    itemName: "Polythene Carry Bag / Plastic Film",
    category: "Plastic",
    binType: "BLUE BIN (Soft Plastics Drop-off)",
    binColor: "yellow",
    confidence: 94,
    preparationAction: "Bundle soft plastic bags together and drop off at grocery store plastic film recycling collection bins.",
    dos: [
      "Stuff multiple plastic bags into a single bag for easy handling.",
      "Ensure bags are dry and free from food grease."
    ],
    donts: [
      "Do not put loose plastic bags into curbside automated sorting machines (they tangle machinery).",
      "Do not burn plastic bags."
    ],
    explanation: "Soft plastics require specialized processing. Standard automated sorting facilities get jammed by loose bags.",
    decompositionTime: "200 Years",
    co2SavedPerKg: "1.1 kg CO₂",
    recyclabilityRating: "Medium",
    commonMistake: "Tossing loose soft plastic bags into curbside recycling bins where they tangle sorting gears."
  },
  "old_phone": {
    itemName: "Smartphone / Mobile Device",
    category: "E-Waste",
    binType: "SPECIAL E-WASTE BIN (Authorized E-Waste Collection Point)",
    binColor: "purple",
    confidence: 96,
    preparationAction: "Back up personal photos and data, perform a factory data reset, remove SIM/SD cards, and take to an authorized e-waste recycler.",
    dos: [
      "Perform full factory data wipe before recycling.",
      "Remove SIM card and external memory card.",
      "Drop off at certified municipal or brand e-waste collection kiosks."
    ],
    donts: [
      "❌ NEVER throw into normal garbage or wet waste bins.",
      "❌ Do not incinerate or puncture the internal lithium-ion battery.",
      "❌ Do not store damaged swelling phones near heat sources."
    ],
    explanation: "Smartphones contain valuable precious metals (gold, silver, copper, cobalt) alongside lithium batteries. Improper disposal leaches toxic heavy metals into soil and aquifers.",
    decompositionTime: "1,000+ Years (Non-biodegradable)",
    co2SavedPerKg: "12.0 kg CO₂",
    recyclabilityRating: "Special Handling",
    commonMistake: "Throwing old phones in regular trash or hoarding them in drawers indefinitely."
  },
  "laptop_charger": {
    itemName: "Electronic Cable / Laptop Charger",
    category: "E-Waste",
    binType: "SPECIAL E-WASTE BIN (Electronics Collection)",
    binColor: "purple",
    confidence: 95,
    preparationAction: "Neatly coil the cable and drop it off at an electronic waste drop-off bin or tech retailer recycling program.",
    dos: [
      "Bundle cables with a twist tie.",
      "Recycle copper wiring inside cables."
    ],
    donts: [
      "Do not cut cables into small pieces.",
      "Do not throw in household dry trash."
    ],
    explanation: "Copper wiring inside chargers is highly valuable and easily recovered through specialized electronic shredding.",
    decompositionTime: "500+ Years",
    co2SavedPerKg: "3.2 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Cutting cables before disposal instead of coiling them whole."
  },
  "newspaper": {
    itemName: "Newspaper & Paper Printouts",
    category: "Paper",
    binType: "BLUE BIN (Dry Recyclable - Paper)",
    binColor: "blue",
    confidence: 99,
    preparationAction: "Bundle papers together, ensure they remain clean and dry, and place into the blue paper recycling bin.",
    dos: [
      "Keep paper completely dry and free from oil or food grease.",
      "Flatten cardboard and newspapers to save bin space.",
      "Remove plastic wrapping sleeves."
    ],
    donts: [
      "Do not recycle greasy pizza boxes or oil-stained paper.",
      "Do not throw wet paper into the dry paper bin."
    ],
    explanation: "Paper pulp fibers can be recycled 5 to 7 times into new newsprint, cardboard boxes, and paper towels, conserving forests.",
    decompositionTime: "2 to 6 Weeks",
    co2SavedPerKg: "0.9 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Mixing oil-stained food packaging with clean paper pulp."
  },
  "pizza_box": {
    itemName: "Greasy Pizza Box (Soiled Cardboard)",
    category: "Organic",
    binType: "GREEN BIN (Compost) OR Trash",
    binColor: "green",
    confidence: 92,
    preparationAction: "Tear off clean top lid for paper recycling; place oil-soaked bottom portion into compost or organic waste.",
    dos: [
      "Separate grease-stained bottom from clean top lid.",
      "Compost the greasy cardboard if local industrial composting allows."
    ],
    donts: [
      "❌ DO NOT put oil-greased cardboard into paper recycling bins (oil ruins clean paper pulp batches)."
    ],
    explanation: "Food grease prevents paper fibers from binding during the paper recycling process, ruining entire batches.",
    decompositionTime: "2 Months",
    co2SavedPerKg: "0.4 kg CO₂",
    recyclabilityRating: "Low",
    commonMistake: "Putting oil-drenched pizza boxes into clean paper recycling."
  },
  "banana_peel": {
    itemName: "Fruit & Vegetable Scraps (Banana Peel)",
    category: "Organic",
    binType: "GREEN BIN (Wet / Organic Waste)",
    binColor: "green",
    confidence: 98,
    preparationAction: "Place directly into your home compost bin or green organic waste container.",
    dos: [
      "Separate from plastic bags or produce price stickers.",
      "Use for home vermicomposting or garden soil enrichment.",
      "Mix with dry leaves for rich nutrient compost."
    ],
    donts: [
      "Do not enclose in non-biodegradable plastic bags.",
      "Do not mix with electronic or chemical waste."
    ],
    explanation: "Organic food scraps decompose naturally into nutrient-rich humus, boosting soil quality and preventing landfill methane gas generation.",
    decompositionTime: "2 to 5 Weeks",
    co2SavedPerKg: "0.8 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Tying organic waste inside non-biodegradable plastic bags."
  },
  "metal_can": {
    itemName: "Aluminum Beverage Can",
    category: "Metal",
    binType: "BLUE / YELLOW BIN (Dry Recyclable Metal)",
    binColor: "blue",
    confidence: 97,
    preparationAction: "Rinse out sugary drink residue, flatten if possible, and place in dry metal recycling.",
    dos: [
      "Rinse with water to avoid attracting insects.",
      "Recycle aluminum cans infinitely without any material degradation."
    ],
    donts: [
      "Do not throw filled or pressurized cans into trash."
    ],
    explanation: "Recycling aluminum requires 95% less energy than refining new metal from raw bauxite ore, making it one of the most sustainable materials.",
    decompositionTime: "80 to 200 Years",
    co2SavedPerKg: "9.0 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Leaving sticky liquid inside that attracts pests."
  },
  "glass_bottle": {
    itemName: "Glass Beverage Bottle / Jar",
    category: "Glass",
    binType: "PURPLE / BLUE BIN (Glass Recyclable)",
    binColor: "purple",
    confidence: 96,
    preparationAction: "Rinse container clean, remove metal lid or plastic cap, and handle carefully to avoid breakage.",
    dos: [
      "Rinse away food or sauce residue.",
      "Separate metal lids and plastic caps for their respective bins."
    ],
    donts: [
      "Do not mix broken window glass or ceramic mugs with bottle glass.",
      "Do not throw broken glass loosely into soft bags."
    ],
    explanation: "Glass is 100% infinitely recyclable and can be melted down endlessly into new jars without loss of quality.",
    decompositionTime: "1 Million Years (Infinite)",
    co2SavedPerKg: "0.3 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Mixing ceramic cookware or lightbulbs with glass bottles."
  },
  "battery": {
    itemName: "AA / AAA Household Battery",
    category: "Hazardous",
    binType: "RED HAZARDOUS BIN (Battery Drop-off Point)",
    binColor: "red",
    confidence: 99,
    preparationAction: "Tape battery contacts/terminals with clear tape and drop off at designated battery recycling bins at supermarkets or municipal centers.",
    dos: [
      "Store spent batteries in a dry plastic box.",
      "Tape lithium and 9V terminals to prevent short-circuits."
    ],
    donts: [
      "❌ NEVER throw batteries into household trash bins.",
      "❌ Do not burn or puncture batteries.",
      "❌ Do not store leaking batteries near paper."
    ],
    explanation: "Batteries contain corrosive acids and toxic heavy metals (cadmium, nickel, lead) that pollute groundwater if landfilled.",
    decompositionTime: "100 Years (Toxic Hazard)",
    co2SavedPerKg: "2.5 kg CO₂",
    recyclabilityRating: "Special Handling",
    commonMistake: "Tossing dead batteries into general trash bins where compaction causes chemical fires."
  }
};

export const SMART_BIN_GUIDE: BinInfo[] = [
  {
    category: "Organic",
    binName: "GREEN BIN (Wet / Organic Waste)",
    colorHex: "#10b981",
    bgTailwind: "bg-emerald-950/40",
    borderTailwind: "border-emerald-500/40",
    textTailwind: "text-emerald-400",
    description: "Biodegradable food scraps, kitchen waste, garden leaves, and organic matter that decomposes naturally.",
    examples: ["Fruit & vegetable peels", "Food scraps & leftovers", "Tea bags & coffee grounds", "Garden leaves & grass", "Eggshells"],
    sortingRules: [
      "Ensure food stickers and plastic packaging are removed.",
      "Do not dump non-biodegradable polythene bags into green bins.",
      "Ideal for home composting or biogas generation."
    ]
  },
  {
    category: "Plastic",
    binName: "YELLOW / BLUE BIN (Plastics & Packaging)",
    colorHex: "#f59e0b",
    bgTailwind: "bg-amber-950/40",
    borderTailwind: "border-amber-500/40",
    textTailwind: "text-amber-400",
    description: "Clean plastic bottles, food containers, packaging films, and aluminum cans.",
    examples: ["PET Water bottles", "Shampoo bottles", "Food packaging tubs", "Aluminum soda cans", "Tin food cans"],
    sortingRules: [
      "Always empty liquids and rinse food residue.",
      "Flatten plastic bottles and crush metal cans to save bin space.",
      "Check recycling codes (#1 PET, #2 HDPE, #5 PP)."
    ]
  },
  {
    category: "Paper",
    binName: "BLUE BIN (Dry Recyclable - Paper & Cardboard)",
    colorHex: "#0284c7",
    bgTailwind: "bg-sky-950/40",
    borderTailwind: "border-sky-500/40",
    textTailwind: "text-sky-400",
    description: "Clean paper, cardboard boxes, magazines, newspapers, and office paper.",
    examples: ["Newspapers & magazines", "Cardboard delivery boxes", "Office printouts", "Paper bags", "Notebooks"],
    sortingRules: [
      "Keep paper dry; wet paper cannot be processed.",
      "Do not include greasy pizza boxes or oil-soaked paper towels.",
      "Remove heavy plastic film or metallic tape."
    ]
  },
  {
    category: "E-Waste",
    binName: "PURPLE / SPECIAL BIN (Electronics & Gadgets)",
    colorHex: "#a855f7",
    bgTailwind: "bg-purple-950/40",
    borderTailwind: "border-purple-500/40",
    textTailwind: "text-purple-400",
    description: "Discarded electronic devices, chargers, appliances, circuit boards, and cables.",
    examples: ["Smartphones & tablets", "Chargers & USB cables", "Old laptops & keyboards", "Power banks", "Earphones"],
    sortingRules: [
      "❌ NEVER throw into regular household waste bins.",
      "Back up and wipe personal data from memory storage before recycling.",
      "Hand over to authorized municipal e-waste drop-off centers."
    ]
  },
  {
    category: "Hazardous",
    binName: "RED HAZARDOUS BIN (Chemicals & Batteries)",
    colorHex: "#ef4444",
    bgTailwind: "bg-rose-950/40",
    borderTailwind: "border-rose-500/40",
    textTailwind: "text-rose-400",
    description: "Toxic household waste, batteries, paint, motor oil, medical waste, and fluorescent tubes.",
    examples: ["AA/AAA & Lithium batteries", "Paint cans & thinners", "Pesticides & cleaners", "Expired medicine", "Fluorescent bulbs"],
    sortingRules: [
      "Store separately in sealed, non-corrosive containers.",
      "Tape battery terminals to prevent short-circuits or accidental fires.",
      "Drop off at specialized hazardous waste disposal centers."
    ]
  }
];
