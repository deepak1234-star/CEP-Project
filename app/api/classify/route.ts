4WS3import { NextResponse } from "next/server";
import { WASTE_DATABASE } from "@/lib/wasteDatabase";

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
      // Camera snapshot without a text hint: return a safe general plastic result
      // and prompt user to use the search bar for more accurate classification
      itemData = WASTE_DATABASE["plastic_bottle"];
      classificationNote =
        "Photo captured! For more precise AI classification, type the item name in the search bar above.";
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
