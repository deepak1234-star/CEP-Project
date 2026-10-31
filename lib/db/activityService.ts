import { connectToDatabase, isMongoConfigured } from "@/lib/db/mongodb";
import ScanActivity, { IScanActivity } from "@/lib/db/models/ScanActivity";
import UserProfile from "@/lib/db/models/UserProfile";
import { clerkClient } from "@clerk/nextjs/server";
import { recordUserScanActivity } from "@/lib/clerkActivity";

export interface ScanInputData {
  userId: string;
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  itemName: string;
  category: string;
  binType?: string;
  binColor?: string;
  co2SavedKg?: number;
  confidence?: number;
  preparationAction?: string;
  dos?: string[];
  donts?: string[];
  explanation?: string;
  resinCode?: number | null;
  resinName?: string | null;
  decompositionTime?: string;
  source?: "camera_scan" | "agent_chat" | "manual";
}

export interface ActivityFilterOptions {
  userId?: string;
  category?: string;
  binColor?: string;
  search?: string;
  limit?: number;
  skip?: number;
}

export interface AdminMetricsOverview {
  totalUsers: number;
  totalScans: number;
  totalCo2SavedKg: number;
  totalEcoPoints: number;
  categoryBreakdown: Record<string, number>;
  binColorBreakdown: Record<string, number>;
  mongoConnected: boolean;
}

/**
 * Normalizes bin color to safe union values.
 */
function normalizeBinColor(color?: string): "green" | "blue" | "yellow" | "purple" | "red" {
  if (!color) return "blue";
  const c = color.toLowerCase().trim();
  if (c.includes("green")) return "green";
  if (c.includes("yellow")) return "yellow";
  if (c.includes("red")) return "red";
  if (c.includes("purple")) return "purple";
  return "blue";
}

/**
 * Saves a scan activity into MongoDB (if connected) and Clerk user metadata.
 */
export async function logScanActivity(data: ScanInputData) {
  const binColor = normalizeBinColor(data.binColor);
  const co2 = typeof data.co2SavedKg === "number" ? data.co2SavedKg : 0.5;

  let mongoSaved: any = null;

  // 1. Attempt saving to MongoDB
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      mongoSaved = await ScanActivity.create({
        userId: data.userId,
        userEmail: data.userEmail || "",
        userName: data.userName || "Eco Recycler",
        userAvatar: data.userAvatar || "",
        itemName: data.itemName,
        category: data.category || "General",
        binType: data.binType || "Recyclables Bin",
        binColor,
        co2SavedKg: co2,
        confidence: data.confidence || 92,
        preparationAction: data.preparationAction,
        dos: data.dos || [],
        donts: data.donts || [],
        explanation: data.explanation,
        resinCode: data.resinCode,
        resinName: data.resinName,
        decompositionTime: data.decompositionTime,
        source: data.source || "camera_scan",
      });

      // Update UserProfile stats in MongoDB
      if (data.userId && data.userEmail) {
        await UserProfile.findOneAndUpdate(
          { clerkId: data.userId },
          {
            $set: {
              email: data.userEmail,
              name: data.userName || "Eco Recycler",
              avatar: data.userAvatar || "",
              lastActive: new Date(),
            },
            $inc: {
              totalScans: 1,
              ecoPoints: 50,
              totalCo2SavedKg: co2,
            },
          },
          { upsert: true, new: true }
        );
      }
    }
  } catch (mongoErr) {
    console.warn("MongoDB logScanActivity write warning:", mongoErr);
  }

  // 2. Always sync to Clerk metadata as dual-store fallback
  try {
    await recordUserScanActivity(data.userId, {
      id: mongoSaved?._id?.toString() || `scan-${Date.now()}`,
      itemName: data.itemName,
      category: data.category,
      binType: data.binType,
      binColor,
      confidence: data.confidence || 90,
      co2SavedPerKg: `${co2} kg CO₂`,
      preparationAction: data.preparationAction,
      createdAt: new Date().toISOString(),
    });
  } catch (clerkErr) {
    console.warn("Clerk recordUserScanActivity fallback sync warning:", clerkErr);
  }

  return mongoSaved;
}

/**
 * Fetches recent activities for the Admin dashboard or user history.
 */
export async function getRecentActivities(options: ActivityFilterOptions = {}) {
  const { userId, category, binColor, search, limit = 50, skip = 0 } = options;

  // Try MongoDB first
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const query: any = {};
      if (userId) query.userId = userId;
      if (category && category !== "all") query.category = new RegExp(`^${category}$`, "i");
      if (binColor && binColor !== "all") query.binColor = binColor.toLowerCase();
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), "i");
        query.$or = [{ itemName: regex }, { userEmail: regex }, { userName: regex }];
      }

      const activities = await ScanActivity.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      if (activities && activities.length > 0) {
        return activities.map((a: any) => ({
          id: a._id.toString(),
          userId: a.userId,
          userEmail: a.userEmail || "anonymous@wasteiq.ai",
          userName: a.userName || "Eco User",
          userAvatar: a.userAvatar || "",
          itemName: a.itemName,
          category: a.category,
          binType: a.binType,
          binColor: a.binColor,
          co2SavedKg: a.co2SavedKg || 0.5,
          confidence: a.confidence || 90,
          source: a.source || "camera_scan",
          createdAt: a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn("Could not query activities from MongoDB, falling back to Clerk:", err);
  }

  // Graceful Fallback: Query from Clerk User List
  try {
    const client = await clerkClient();
    const userList = await client.users.getUserList({ limit: 50 });
    const aggregated: any[] = [];

    for (const u of userList.data) {
      const metadata = (u.unsafeMetadata || {}) as Record<string, any>;
      const scans = (metadata.scanHistory || []) as any[];
      const primaryEmail = u.emailAddresses[0]?.emailAddress || "anonymous@wasteiq.ai";
      const name = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Eco Recycler";

      for (const s of scans) {
        aggregated.push({
          id: s.id || `clerk-${Date.now()}-${Math.random()}`,
          userId: u.id,
          userEmail: primaryEmail,
          userName: name,
          userAvatar: u.imageUrl || "",
          itemName: s.itemName || "Classified Item",
          category: s.category || "General",
          binType: s.binType || "Recyclables",
          binColor: normalizeBinColor(s.binColor),
          co2SavedKg: parseFloat(s.co2SavedPerKg) || 0.5,
          confidence: s.confidence || 92,
          source: "camera_scan",
          createdAt: s.createdAt || new Date().toISOString(),
        });
      }
    }

    // Filter aggregated results
    let filtered = aggregated;
    if (userId) filtered = filtered.filter((a) => a.userId === userId);
    if (category && category !== "all") {
      filtered = filtered.filter((a) => a.category?.toLowerCase() === category.toLowerCase());
    }
    if (binColor && binColor !== "all") {
      filtered = filtered.filter((a) => a.binColor?.toLowerCase() === binColor.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.itemName?.toLowerCase().includes(q) ||
          a.userEmail?.toLowerCase().includes(q) ||
          a.userName?.toLowerCase().includes(q)
      );
    }

    // Sort by createdAt descending
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return filtered.slice(skip, skip + limit);
  } catch (clerkErr) {
    console.error("Clerk fallback activities query error:", clerkErr);
    return [];
  }
}

/**
 * Computes high-level Admin Overview metrics.
 */
export async function getAdminMetrics(): Promise<AdminMetricsOverview> {
  const mongoConnected = isMongoConfigured();
  let totalUsers = 0;
  let totalScans = 0;
  let totalCo2SavedKg = 0;
  let totalEcoPoints = 0;
  const categoryBreakdown: Record<string, number> = {};
  const binColorBreakdown: Record<string, number> = {};

  // Try Clerk for user count & aggregated stats
  try {
    const client = await clerkClient();
    const userList = await client.users.getUserList({ limit: 100 });
    totalUsers = userList.totalCount || userList.data.length;

    for (const u of userList.data) {
      const meta = (u.unsafeMetadata || {}) as Record<string, any>;
      const stats = meta.ecoStats || {};
      totalScans += stats.totalScans || 0;
      totalCo2SavedKg += stats.totalCo2SavedKg || 0;
      totalEcoPoints += stats.ecoPoints || 0;

      const scans = (meta.scanHistory || []) as any[];
      for (const s of scans) {
        const cat = s.category || "Other";
        categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;

        const color = normalizeBinColor(s.binColor);
        binColorBreakdown[color] = (binColorBreakdown[color] || 0) + 1;
      }
    }
  } catch (err) {
    console.warn("Could not query Clerk users for admin metrics:", err);
  }

  // If MongoDB is connected, enhance with high-precision Mongo aggregations
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const mongoScansCount = await ScanActivity.countDocuments();
      if (mongoScansCount > 0) {
        totalScans = Math.max(totalScans, mongoScansCount);

        const co2Aggr = await ScanActivity.aggregate([
          { $group: { _id: null, totalCo2: { $sum: "$co2SavedKg" } } },
        ]);
        if (co2Aggr[0]?.totalCo2) {
          totalCo2SavedKg = Math.max(totalCo2SavedKg, co2Aggr[0].totalCo2);
        }

        const catAggr = await ScanActivity.aggregate([
          { $group: { _id: "$category", count: { $sum: 1 } } },
        ]);
        for (const item of catAggr) {
          if (item._id) categoryBreakdown[item._id] = item.count;
        }

        const binAggr = await ScanActivity.aggregate([
          { $group: { _id: "$binColor", count: { $sum: 1 } } },
        ]);
        for (const item of binAggr) {
          if (item._id) binColorBreakdown[item._id] = item.count;
        }
      }
    }
  } catch (mongoErr) {
    console.warn("MongoDB metrics aggregation warning:", mongoErr);
  }

  return {
    totalUsers: Math.max(totalUsers, 1),
    totalScans,
    totalCo2SavedKg: +totalCo2SavedKg.toFixed(2),
    totalEcoPoints,
    categoryBreakdown,
    binColorBreakdown,
    mongoConnected,
  };
}

