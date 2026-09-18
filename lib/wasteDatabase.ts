import { ClassificationResult, BinInfo, WasteCategory, ResinCodeInfo, EcoBadge } from "@/types/ecosort";

export interface ExtendedClassificationResult extends ClassificationResult {
  decompositionTime?: string;
  co2SavedPerKg?: string;
  recyclabilityRating?: "High" | "Medium" | "Low" | "Special Handling";
  commonMistake?: string;
  resinCode?: number;
  resinName?: string;
}

export const WASTE_DATABASE: Record<string, Omit<ExtendedClassificationResult, "id" | "createdAt">> = {
  "plastic_bottle": {
    itemName: "PET Plastic Drink Bottle (#1)",
    category: "Plastic",
    binType: "BLUE / YELLOW BIN (Dry Recyclable Waste)",
    binColor: "yellow",
    confidence: 97,
    resinCode: 1,
    resinName: "PETE (Polyethylene Terephthalate)",
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
  "milk_jug": {
    itemName: "HDPE Milk Jug / Detergent Bottle (#2)",
    category: "Plastic",
    binType: "BLUE / YELLOW BIN (Plastics Recycling)",
    binColor: "yellow",
    confidence: 98,
    resinCode: 2,
    resinName: "HDPE (High-Density Polyethylene)",
    preparationAction: "Rinse with water to remove milk/soap residue, flatten gently, and place in dry recyclables.",
    dos: [
      "Rinse out dairy or detergent residue.",
      "Leave plastic cap on or screw tightly.",
      "Crush jug body to save space."
    ],
    donts: [
      "Do not leave sour milk curd inside.",
      "Do not mix with hazardous chemical containers."
    ],
    explanation: "HDPE is one of the easiest plastics to recycle and is remade into drainage pipes, park benches, detergent bottles, and recycling bins.",
    decompositionTime: "100 Years",
    co2SavedPerKg: "1.8 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Discarding unrinsed milk jugs which cause bacterial odor."
  },
  "plastic_bag": {
    itemName: "LDPE Soft Plastic Carry Bag (#4)",
    category: "Plastic",
    binType: "BLUE BIN (Soft Plastics Drop-off)",
    binColor: "yellow",
    confidence: 94,
    resinCode: 4,
    resinName: "LDPE (Low-Density Polyethylene)",
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
  "food_container_pp": {
    itemName: "PP Food Container / Takeout Box (#5)",
    category: "Plastic",
    binType: "YELLOW BIN (Clean Plastics)",
    binColor: "yellow",
    confidence: 93,
    resinCode: 5,
    resinName: "PP (Polypropylene)",
    preparationAction: "Scrape food debris completely, wipe off grease with a paper towel, and place in plastics bin.",
    dos: [
      "Rinse away food traces.",
      "Check for microwave-safe #5 triangle symbol."
    ],
    donts: [
      "Do not recycle containers coated with heavy grease or curry oils.",
      "Do not melt in oven."
    ],
    explanation: "Polypropylene has high heat tolerance and is recycled into auto parts, storage bins, dishware, and battery cables.",
    decompositionTime: "300 Years",
    co2SavedPerKg: "1.4 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Recycling grease-soaked takeout containers without scraping."
  },
  "styrofoam": {
    itemName: "Expanded Polystyrene (Styrofoam / EPS #6)",
    category: "Plastic",
    binType: "BLACK BIN (Landfill) or Specialized EPS Drop-off",
    binColor: "yellow",
    confidence: 91,
    resinCode: 6,
    resinName: "PS (Polystyrene / Styrofoam)",
    preparationAction: "Check if local depot accepts EPS foam block drop-off; otherwise dispose in general landfill trash.",
    dos: [
      "Break down bulky blocks if accepted at specialist centers.",
      "Keep free of tape and sticky labels."
    ],
    donts: [
      "❌ DO NOT put in standard curbside blue recycling bins (breaks into microplastics).",
      "❌ Never heat styrofoam in microwave."
    ],
    explanation: "Styrofoam is 95% air and easily fragments into environmental microplastics that contaminate waterways and wildlife.",
    decompositionTime: "500+ Years",
    co2SavedPerKg: "0.2 kg CO₂",
    recyclabilityRating: "Low",
    commonMistake: "Throwing styrofoam cups and packaging peanuts in curbside recycling."
  },
  "toothbrush": {
    itemName: "Plastic Toothbrush (Mixed Composite #7)",
    category: "Plastic",
    binType: "GENERAL TRASH BIN or TerraCycle Dedicated Program",
    binColor: "yellow",
    confidence: 95,
    resinCode: 7,
    resinName: "OTHER / Mixed Resin & Nylon Bristles",
    preparationAction: "Standard municipal curbside cannot separate nylon bristles from rubberized handles; utilize dedicated mail-in recycling or general bin.",
    dos: [
      "Reuse old clean toothbrushes for household cleaning chores before discarding.",
      "Look into bamboo toothbrush alternatives."
    ],
    donts: [
      "Do not put into standard blue curbside recycling.",
      "Do not burn plastic brushes."
    ],
    explanation: "Toothbrushes fuse multi-layer elastomers with nylon bristles, making mechanical separation impossible in regular municipal plants.",
    decompositionTime: "400 Years",
    co2SavedPerKg: "0.3 kg CO₂",
    recyclabilityRating: "Special Handling",
    commonMistake: "Assuming all plastic items can go into curbside bins."
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
  "tetra_pak": {
    itemName: "Tetra Pak Milk / Juice Carton (Aseptic Composite)",
    category: "Paper",
    binType: "BLUE BIN (Carton Recycling / Paper Mill Stream)",
    binColor: "blue",
    confidence: 94,
    preparationAction: "Empty completely, rinse with water, push the straw/cap back inside or screw cap on, and flatten.",
    dos: [
      "Rinse out dairy or juice residue.",
      "Flatten to maximize collection volume.",
      "Check local municipality for carton acceptance."
    ],
    donts: [
      "Do not toss full cartons into recycling.",
      "Do not separate aluminum foil layer manually."
    ],
    explanation: "Tetra Paks are 75% paperboard with ultra-thin polyethylene and aluminum foil barriers. Hydro-pulper machines separate these materials effectively.",
    decompositionTime: "5 Years",
    co2SavedPerKg: "1.2 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Throwing non-rinsed milk cartons that spoil collection bins."
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
  "aluminum_foil": {
    itemName: "Aluminum Food Foil & Pie Trays",
    category: "Metal",
    binType: "BLUE BIN (Metal Recycling)",
    binColor: "blue",
    confidence: 93,
    preparationAction: "Wipe off visible food grease and roll clean foil into a ball (at least 5cm diameter) so sorting machines detect it.",
    dos: [
      "Wipe clean of major cheese or food residue.",
      "Scrunch smaller pieces together into a large fist-sized ball."
    ],
    donts: [
      "Do not recycle foil caked with burnt cheese or meat.",
      "Do not throw loose tiny shreds that fall through sorting screens."
    ],
    explanation: "Clean aluminum foil can be re-melted into new aluminum ingots endlessly with zero loss of quality.",
    decompositionTime: "400 Years",
    co2SavedPerKg: "7.5 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Throwing tiny individual foil wrappers that slip through machinery."
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
  },
  "cfl_bulb": {
    itemName: "CFL Fluorescent Bulb / Mercury Tube",
    category: "Hazardous",
    binType: "RED HAZARDOUS BIN (Lighting Takeback Center)",
    binColor: "red",
    confidence: 96,
    preparationAction: "Wrap in original box or paper to prevent shattering; take to a municipal hazardous collection or hardware store drop box.",
    dos: [
      "Wrap gently so bulb doesn't break in transit.",
      "Use home improvement retailer collection boxes."
    ],
    donts: [
      "❌ NEVER throw in household trash (releases neurotoxic mercury gas when broken).",
      "❌ Do not vacuum a broken bulb (ventilate room immediately)."
    ],
    explanation: "Fluorescent and CFL bulbs contain mercury vapor. Specialized recovery extracts mercury and recycles phosphor powders safely.",
    decompositionTime: "1,000+ Years",
    co2SavedPerKg: "1.8 kg CO₂",
    recyclabilityRating: "Special Handling",
    commonMistake: "Throwing fluorescent tubes in general trash where they shatter and emit toxic vapor."
  },
  "expired_medicine": {
    itemName: "Expired Medicines & Blister Packs",
    category: "Hazardous",
    binType: "PHARMACY DROP-OFF BOX (Take-Back Program)",
    binColor: "red",
    confidence: 97,
    preparationAction: "Leave in original bottles/blister packs with personal name blacked out, and return to an authorized pharmacy drop box.",
    dos: [
      "Cross out personal prescription info on bottle labels.",
      "Drop off at local community pharmacy take-back boxes."
    ],
    donts: [
      "❌ NEVER flush pills down the toilet or sink (contaminates rivers and drinking water).",
      "❌ Do not throw loose pills into household trash."
    ],
    explanation: "Pharmaceuticals flushed into wastewater pass through treatment facilities and bioaccumulate in marine life and water ecosystems.",
    decompositionTime: "Chemical Hazard",
    co2SavedPerKg: "0.5 kg CO₂",
    recyclabilityRating: "Special Handling",
    commonMistake: "Flushing unused antibiotics or painkillers down the toilet."
  },
  "coffee_cup": {
    itemName: "Disposable Coffee Cup (Polyethylene-Lined Paper)",
    category: "Paper",
    binType: "GENERAL LANDFILL or Dedicated Cup Recycling Bins",
    binColor: "yellow",
    confidence: 92,
    resinCode: 7,
    resinName: "Composite Paper + PE Plastic Lining",
    preparationAction: "Recycle the plastic lid (usually #5 or #6) in plastic bin; dispose the paper cup body in trash unless specialized cup collectors exist.",
    dos: [
      "Separate the plastic lid and recycle according to resin number.",
      "Use a reusable ceramic or insulated thermos cup whenever possible."
    ],
    donts: [
      "❌ Do not toss the cup body into standard clean paper recycling (plastic lining clogs paper pulping)."
    ],
    explanation: "Coffee cups have a waterproof plastic coating bonded to the paper that ordinary paper recycling mills cannot melt or filter.",
    decompositionTime: "30 Years",
    co2SavedPerKg: "0.2 kg CO₂",
    recyclabilityRating: "Low",
    commonMistake: "Assuming paper coffee cups are 100% biodegradable paper."
  },
  "clothes": {
    itemName: "Used Clothes & Cotton Fabric",
    category: "Organic",
    binType: "TEXTILE DONATION DROP-BOX / Textile Bin",
    binColor: "green",
    confidence: 95,
    preparationAction: "Wash and dry items thoroughly; donate wearable clothes to charity or drop off worn-out textiles at fabric recycling kiosks.",
    dos: [
      "Donate clean, wearable clothing to local shelters.",
      "Turn old cotton rags into cleaning cloths.",
      "Drop unwearable textiles in municipal fabric bins."
    ],
    donts: [
      "Do not throw clean garments into curbside landfill bins.",
      "Do not donate wet or mildewed textiles."
    ],
    explanation: "Textile recycling shreds fabrics into insulation, acoustic padding, or new recycled yarns, saving enormous amounts of water.",
    decompositionTime: "5 Months (Cotton) to 200 Years (Polyester)",
    co2SavedPerKg: "4.0 kg CO₂",
    recyclabilityRating: "High",
    commonMistake: "Sending good wearable clothes to municipal landfills."
  }
};

export const RESIN_CODES_DATABASE: ResinCodeInfo[] = [
  {
    code: 1,
    symbol: "♳",
    abbreviation: "PET / PETE",
    fullName: "Polyethylene Terephthalate",
    recyclability: "Widely Recycled",
    safetyLevel: "Safe",
    commonProducts: ["Water bottles", "Soft drink bottles", "Salad dressing containers", "Peanut butter jars"],
    recycledInto: ["Fleece jackets", "Carpet fibers", "Tote bags", "New plastic bottles", "Sleeping bag insulation"],
    description: "The most widely recycled clear plastic. Intended for single use; avoid reusing with warm liquids as bacteria can harbor in micro-grooves.",
    microwaveSafe: false,
    colorHex: "#0284c7"
  },
  {
    code: 2,
    symbol: "♴",
    abbreviation: "HDPE",
    fullName: "High-Density Polyethylene",
    recyclability: "Widely Recycled",
    safetyLevel: "Safe",
    commonProducts: ["Milk jugs", "Detergent & shampoo bottles", "Bleach containers", "Butter tubs", "Motor oil bottles"],
    recycledInto: ["Drainage pipes", "Outdoor park benches", "Picnic tables", "Plastic lumber", "Recycling bins"],
    description: "Extremely durable, chemically resistant plastic that does not leach chemicals. Readily accepted in almost all curbside recycling programs.",
    microwaveSafe: false,
    colorHex: "#10b981"
  },
  {
    code: 3,
    symbol: "♵",
    abbreviation: "PVC / V",
    fullName: "Polyvinyl Chloride",
    recyclability: "Rarely Recycled",
    safetyLevel: "Avoid / Toxic Hazard",
    commonProducts: ["Plumbing pipes", "Vinyl flooring", "Shower curtains", "Medical tubing", "Window frames"],
    recycledInto: ["Speed bumps", "Gutters", "Mudflaps", "Electrical conduit"],
    description: "Contains harmful plasticizers (phthalates) and releases dioxins when burned. Rarely recyclable through curbside municipal bins.",
    microwaveSafe: false,
    colorHex: "#ef4444"
  },
  {
    code: 4,
    symbol: "♶",
    abbreviation: "LDPE",
    fullName: "Low-Density Polyethylene",
    recyclability: "Locally Recycled",
    safetyLevel: "Safe",
    commonProducts: ["Grocery carry bags", "Bread wrappers", "Squeeze condiment bottles", "Bubble wrap", "Dry cleaner bags"],
    recycledInto: ["Trash can liners", "Floor tiles", "Compost bins", "Lumber", "Shipping envelopes"],
    description: "Flexible and tough plastic film. Must NOT be tossed loose into curbside automated sorting lines; drop off at supermarket collection bins.",
    microwaveSafe: false,
    colorHex: "#f59e0b"
  },
  {
    code: 5,
    symbol: "♷",
    abbreviation: "PP",
    fullName: "Polypropylene",
    recyclability: "Widely Recycled",
    safetyLevel: "Safe",
    commonProducts: ["Yogurt tubs", "Medicine bottles", "Syrup bottles", "Bottle caps", "Microwaveable food containers"],
    recycledInto: ["Battery cables", "Signal lights", "Ice scrapers", "Bicycle racks", "Storage bins"],
    description: "High melting point makes it safe for hot foods and dishwasher cleaning. Highly recyclable and increasingly collected curbside.",
    microwaveSafe: true,
    colorHex: "#06b6d4"
  },
  {
    code: 6,
    symbol: "♸",
    abbreviation: "PS",
    fullName: "Polystyrene / Styrofoam",
    recyclability: "Rarely Recycled",
    safetyLevel: "Caution",
    commonProducts: ["Disposable coffee cups", "Styrofoam meat trays", "Packing peanuts", "Plastic cutlery", "Egg cartons"],
    recycledInto: ["Thermal insulation", "License plate frames", "Rulers", "Foam packing"],
    description: "Can leach styrene (a suspected carcinogen) when heated. Difficult and cost-prohibitive to recycle in municipal sorting streams.",
    microwaveSafe: false,
    colorHex: "#f97316"
  },
  {
    code: 7,
    symbol: "♹",
    abbreviation: "OTHER",
    fullName: "Miscellaneous / Polycarbonate / PLA Bioplastics",
    recyclability: "Difficult to Recycle",
    safetyLevel: "Caution",
    commonProducts: ["Baby bottles (older polycarbonate)", "Eyeglass lenses", "5-gallon water jugs", "Compostable PLA plastics", "Nylon cords"],
    recycledInto: ["Plastic lumber", "Custom industrial molded goods"],
    description: "A catch-all category for multi-layer composites and newer bioplastics. Polycarbonate can leach BPA; PLA bioplastics require industrial composting.",
    microwaveSafe: false,
    colorHex: "#a855f7"
  }
];

export const ECO_BADGES_LIST: EcoBadge[] = [
  {
    id: "first_scan",
    title: "First Scan Pioneer",
    description: "Classified your very first waste item using AI",
    icon: "🌱",
    category: "scanner",
    requiredCount: 1,
  },
  {
    id: "scanner_pro",
    title: "Eco Detective",
    description: "Scanned 5 or more items to classify recyclables",
    icon: "🔍",
    category: "scanner",
    requiredCount: 5,
  },
  {
    id: "ewaste_guardian",
    title: "E-Waste Guardian",
    description: "Identified electronic waste or spent batteries",
    icon: "⚡",
    category: "category",
    requiredCount: 1,
  },
  {
    id: "compost_master",
    title: "Compost Master",
    description: "Sorted organic food scraps or natural waste",
    icon: "🍂",
    category: "category",
    requiredCount: 2,
  },
  {
    id: "plastic_patrol",
    title: "Ocean Guardian",
    description: "Sorted 3 or more plastic items responsibly",
    icon: "🌊",
    category: "category",
    requiredCount: 3,
  },
  {
    id: "quiz_champ",
    title: "Recycling Scholar",
    description: "Tested your eco-knowledge on the recycling quiz",
    icon: "🧠",
    category: "quiz",
    requiredCount: 1,
  },
  {
    id: "eco_champion",
    title: "Zero-Waste Hero",
    description: "Scanned 10+ items and completed quiz training",
    icon: "🏆",
    category: "milestone",
    requiredCount: 10,
  },
  {
    id: "voice_listener",
    title: "Audio Scholar",
    description: "Listened to the AI voice guide disposal instructions",
    icon: "🔊",
    category: "milestone",
    requiredCount: 1,
  }
];

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

/**
 * Pure Web Audio API Synthesizer sounds - zero external sound files required!
 */
export function playSound(type: "scan" | "success" | "chime" | "click") {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === "scan") {
      // Futuristic laser frequency sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === "success") {
      // Warm chord chime (Major triad)
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.36);
      });
    } else if (type === "chime") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }
  } catch (e) {
    // AudioContext blocked or not allowed by policy
  }
}
