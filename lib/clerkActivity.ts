import { clerkClient } from "@clerk/nextjs/server";
import { ClassificationResult } from "@/types/ecosort";
import { connectToDatabase } from "@/lib/db/mongodb";
import ScanActivity from "@/lib/db/models/ScanActivity";
import UserProfile from "@/lib/db/models/UserProfile";

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

/**
 * Synchronizes a batch of scans (e.g. from localStorage migration) to Clerk & MongoDB
 */
export async function recordBatchScanActivities(userId: string, scans: any[]) {
  if (!scans || scans.length === 0) {
    return { success: true };
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = (user.unsafeMetadata || {}) as Record<string, any>;

    const existingScans: any[] = metadata.scanHistory || [];
    const existingActivities: ActivityRecord[] = metadata.activities || [];
    const currentStats: UserEcoStats = metadata.ecoStats || {
      totalScans: 0,
      ecoPoints: 0,
      totalCo2SavedKg: 0,
      agentChats: 0,
      level: "Eco Beginner 🐣 (Level 1)",
      lastActive: new Date().toISOString(),
    };

    // Merge scans avoiding duplicates
    const scanMap = new Map<string, any>();
    for (const s of existingScans) {
      if (s.id) scanMap.set(s.id, s);
    }
    for (const s of scans) {
      const id = s.id || `scan-${Date.now()}-${Math.random()}`;
      if (!scanMap.has(id)) {
        scanMap.set(id, { ...s, id });
      }
    }

    const mergedScans = Array.from(scanMap.values()).slice(0, 50);
    const totalScans = Math.max(mergedScans.length, currentStats.totalScans);

    // Compute total CO2 from all merged scans
    let totalCo2 = 0;
    for (const s of mergedScans) {
      let co2 = 0.5;
      if (s.co2SavedPerKg) {
        const match = String(s.co2SavedPerKg).match(/([\d.]+)/);
        if (match) co2 = parseFloat(match[1]);
      }
      totalCo2 += co2;
    }

    const ecoPoints = Math.max(totalScans * 50, currentStats.ecoPoints);
    const updatedStats: UserEcoStats = {
      ...currentStats,
      totalScans,
      ecoPoints,
      totalCo2SavedKg: +totalCo2.toFixed(2),
      level: calculateEcoLevel(ecoPoints),
      lastActive: new Date().toISOString(),
    };

    // Generate activity timeline entries for any newly added scans
    const newActivities: ActivityRecord[] = [];
    for (const s of mergedScans) {
      const exists = existingActivities.some(
        (a) => a.title.includes(s.itemName) || a.id === `act-${s.id}`
      );
      if (!exists) {
        newActivities.push({
          id: `act-${s.id || Date.now()}`,
          type: "scan",
          title: `Scanned ${s.itemName || "Waste Item"}`,
          category: s.category || "General",
          binColor: s.binColor || "blue",
          points: 50,
          timestamp: s.createdAt || new Date().toISOString(),
          co2Saved: s.co2SavedPerKg || "0.5 kg CO₂",
          note: s.preparationAction || "Classified with Google Gemini AI",
        });
      }
    }

    const updatedActivities = [...newActivities, ...existingActivities].slice(0, 50);

    // Update Clerk Metadata
    await client.users.updateUserMetadata(userId, {
      unsafeMetadata: {
        ...metadata,
        ecoStats: updatedStats,
        activities: updatedActivities,
        scanHistory: mergedScans,
        lastSyncedAt: new Date().toISOString(),
      },
    });

    // Also sync to MongoDB if connected
    try {
      const mongooseConn = await connectToDatabase();
      if (mongooseConn) {
        const primaryEmail =
          user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ||
          user.emailAddresses[0]?.emailAddress ||
          "";
        const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || "Eco Recycler";

        for (const s of mergedScans) {
          await ScanActivity.findOneAndUpdate(
            { userId, itemName: s.itemName, createdAt: s.createdAt },
            {
              $setOnInsert: {
                userId,
                userEmail: primaryEmail,
                userName: name,
                userAvatar: user.imageUrl || "",
                itemName: s.itemName,
                category: s.category || "General",
                binType: s.binType || "Recyclables Bin",
                binColor: (s.binColor || "blue").toLowerCase(),
                co2SavedKg: parseFloat(s.co2SavedPerKg) || 0.5,
                confidence: s.confidence || 95,
                source: "camera_scan",
                createdAt: s.createdAt ? new Date(s.createdAt) : new Date(),
              },
            },
            { upsert: true }
          );
        }

        await UserProfile.findOneAndUpdate(
          { clerkId: userId },
          {
            $set: {
              email: primaryEmail,
              name,
              avatar: user.imageUrl || "",
              totalScans: updatedStats.totalScans,
              ecoPoints: updatedStats.ecoPoints,
              totalCo2SavedKg: updatedStats.totalCo2SavedKg,
              level: updatedStats.level,
              lastActive: new Date(),
            },
          },
          { upsert: true }
        );
      }
    } catch (mongoErr) {
      console.warn("MongoDB batch sync warning:", mongoErr);
    }

    return { success: true, updatedStats, updatedActivities };
  } catch (error) {
    console.error("Failed to record batch scans in Clerk:", error);
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
