import { NextResponse } from "next/server";
import { WASTE_DATABASE } from "@/lib/wasteDatabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sampleKey, fileName, searchQuery } = body;

    let itemData = WASTE_DATABASE[sampleKey || "plastic_bottle"];

    // Instant keyword matching
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      if (q.includes("phone") || q.includes("mobile") || q.includes("cell") || q.includes("gadget")) {
        itemData = WASTE_DATABASE["old_phone"];
      } else if (q.includes("charger") || q.includes("cable") || q.includes("cord") || q.includes("wire")) {
        itemData = WASTE_DATABASE["laptop_charger"];
      } else if (q.includes("pizza") || q.includes("greasy") || q.includes("food box")) {
        itemData = WASTE_DATABASE["pizza_box"];
      } else if (q.includes("bag") || q.includes("poly") || q.includes("film") || q.includes("wrapper")) {
        itemData = WASTE_DATABASE["plastic_bag"];
      } else if (q.includes("battery") || q.includes("cell") || q.includes("accu")) {
        itemData = WASTE_DATABASE["battery"];
      } else if (q.includes("glass") || q.includes("jar") || q.includes("bottle") && q.includes("wine")) {
        itemData = WASTE_DATABASE["glass_bottle"];
      } else if (q.includes("can") || q.includes("tin") || q.includes("aluminum") || q.includes("soda")) {
        itemData = WASTE_DATABASE["metal_can"];
      } else if (q.includes("banana") || q.includes("apple") || q.includes("peel") || q.includes("food") || q.includes("fruit")) {
        itemData = WASTE_DATABASE["banana_peel"];
      } else if (q.includes("paper") || q.includes("news") || q.includes("cardboard") || q.includes("box")) {
        itemData = WASTE_DATABASE["newspaper"];
      } else {
        itemData = WASTE_DATABASE["plastic_bottle"];
      }
    } else if (!sampleKey && fileName) {
      const lower = fileName.toLowerCase();
      if (lower.includes("phone") || lower.includes("electronic") || lower.includes("charger") || lower.includes("cable")) {
        itemData = WASTE_DATABASE["old_phone"];
      } else if (lower.includes("bag") || lower.includes("poly") || lower.includes("film")) {
        itemData = WASTE_DATABASE["plastic_bag"];
      } else if (lower.includes("pizza")) {
        itemData = WASTE_DATABASE["pizza_box"];
      } else if (lower.includes("paper") || lower.includes("news") || lower.includes("cardboard")) {
        itemData = WASTE_DATABASE["newspaper"];
      } else if (lower.includes("banana") || lower.includes("apple") || lower.includes("food") || lower.includes("peel")) {
        itemData = WASTE_DATABASE["banana_peel"];
      } else if (lower.includes("can") || lower.includes("metal") || lower.includes("aluminum")) {
        itemData = WASTE_DATABASE["metal_can"];
      } else if (lower.includes("glass") || lower.includes("jar")) {
        itemData = WASTE_DATABASE["glass_bottle"];
      } else if (lower.includes("battery") || lower.includes("cell")) {
        itemData = WASTE_DATABASE["battery"];
      } else {
        itemData = WASTE_DATABASE["plastic_bottle"];
      }
    }

    const result = {
      id: `scan-${Date.now()}`,
      ...itemData,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to classify waste" },
      { status: 500 }
    );
  }
}
