import { clerkClient } from "@clerk/nextjs/server";
import { ClassificationResult } from "@/types/ecosort";

export interface ActivityRecord {
  id: string;
  type: "scan" | "agent_chat" | "quiz";
  title: string;
  category?: string;
  binColor?: string;
  points: number;
  timestamp: string;
  co2Saved?: string;
  note?: string;
}

export interface UserEcoStats {
  totalScans: number;
  ecoPoints: number;
  totalCo2SavedKg: number;
  agentChats: number;
  level: string;
  lastActive: string;
}

export function calculateEcoLevel(points: number): string {
  if (points >= 1000) return "Planet Guardian 🌍 (Level 5)";
  if (points >= 500) return "Zero-Waste Hero 🛡️ (Level 4)";
  if (points >= 250) return "Master Recycler 🌿 (Level 3)";
  if (points >= 100) return "Eco Enthusiast 🌱 (Level 2)";
  return "Eco Beginner 🐣 (Level 1)";
}

export async function recordUserScanActivity(
  userId: string,
  scanResult: any
) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = (user.unsafeMetadata || {}) as Record<string, any>;

    const currentStats: UserEcoStats = metadata.ecoStats || {
      totalScans: 0,
      ecoPoints: 0,
      totalCo2SavedKg: 0,
      agentChats: 0,
      level: "Eco Beginner 🐣 (Level 1)",
      lastActive: new Date().toISOString(),
    };

    // Calculate incremental CO2
    let co2Num = 0.5;
    if (scanResult.co2SavedPerKg) {
      const match = scanResult.co2SavedPerKg.match(/([\d.]+)/);
      if (match) co2Num = parseFloat(match[1]);
    }

    const newPoints = currentStats.ecoPoints + 50;
    const newTotalScans = currentStats.totalScans + 1;
    const newTotalCo2 = +(currentStats.totalCo2SavedKg + co2Num).toFixed(2);

    const updatedStats: UserEcoStats = {
      ...currentStats,
      totalScans: newTotalScans,
      ecoPoints: newPoints,
      totalCo2SavedKg: newTotalCo2,
      level: calculateEcoLevel(newPoints),
      lastActive: new Date().toISOString(),
    };

    // New Activity Entry
    const newActivity: ActivityRecord = {
      id: `act-${Date.now()}`,
      type: "scan",
      title: `Scanned ${scanResult.itemName || "Waste Item"}`,
      category: scanResult.category || "General",
      binColor: scanResult.binColor || "blue",
      points: 50,
      timestamp: new Date().toISOString(),
      co2Saved: scanResult.co2SavedPerKg || `${co2Num} kg CO₂`,
      note: scanResult.preparationAction || "Classified with Google Gemini AI",
    };

    const currentActivities: ActivityRecord[] = metadata.activities || [];
    const updatedActivities = [newActivity, ...currentActivities].slice(0, 50);

    const currentScans: any[] = metadata.scanHistory || [];
    const updatedScans = [
      {
        ...scanResult,
        id: scanResult.id || `scan-${Date.now()}`,
        createdAt: scanResult.createdAt || new Date().toISOString(),
      },
      ...currentScans.filter((s) => s.id !== scanResult.id),
    ].slice(0, 40);

    await client.users.updateUserMetadata(userId, {
      unsafeMetadata: {
        ...metadata,
        ecoStats: updatedStats,
        activities: updatedActivities,
        scanHistory: updatedScans,
        lastSyncedAt: new Date().toISOString(),
      },
    });

    return { success: true, updatedStats, newActivity };
  } catch (error) {
    console.error("Failed to record user scan activity in Clerk:", error);
    return { success: false, error };
  }
}

export async function recordUserAgentActivity(
  userId: string,
  userPrompt: string
) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = (user.unsafeMetadata || {}) as Record<string, any>;

    const currentStats: UserEcoStats = metadata.ecoStats || {
      totalScans: 0,
      ecoPoints: 0,
      totalCo2SavedKg: 0,
      agentChats: 0,
      level: "Eco Beginner 🐣 (Level 1)",
      lastActive: new Date().toISOString(),
    };

    const newPoints = currentStats.ecoPoints + 15;
    const newAgentChats = (currentStats.agentChats || 0) + 1;

    const updatedStats: UserEcoStats = {
      ...currentStats,
      ecoPoints: newPoints,
      agentChats: newAgentChats,
      level: calculateEcoLevel(newPoints),
      lastActive: new Date().toISOString(),
    };

    const newActivity: ActivityRecord = {
      id: `act-chat-${Date.now()}`,
      type: "agent_chat",
      title: `AI Assistant: "${userPrompt.slice(0, 40)}${userPrompt.length > 40 ? "..." : ""}"`,
      points: 15,
      timestamp: new Date().toISOString(),
      note: "Learned waste reduction with Gemini AI Agent",
    };

    const currentActivities: ActivityRecord[] = metadata.activities || [];
    const updatedActivities = [newActivity, ...currentActivities].slice(0, 50);

    await client.users.updateUserMetadata(userId, {
      unsafeMetadata: {
        ...metadata,
        ecoStats: updatedStats,
        activities: updatedActivities,
        lastSyncedAt: new Date().toISOString(),
      },
    });

    return { success: true, updatedStats };
  } catch (error) {
    console.error("Failed to record agent chat activity in Clerk:", error);
    return { success: false, error };
  }
}
