import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { logScanActivity, getRecentActivities } from "@/lib/db/activityService";
import { isUserAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/**
 * POST /api/activity
 * Securely logs an authenticated user's scan activity into MongoDB & Clerk store.
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please log in to record scan activity." },
        { status: 401 }
      );
    }

    const user = await currentUser();
    const primaryEmail =
      user?.emailAddresses.find((e) => e.id === user?.primaryEmailAddressId)?.emailAddress ||
      user?.emailAddresses[0]?.emailAddress ||
      "";
    const userName =
      `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.username || "Eco Recycler";
    const userAvatar = user?.imageUrl || "";

    const body = await req.json();
    const {
      itemName,
      category,
      binType,
      binColor,
      co2SavedKg,
      confidence,
      preparationAction,
      dos,
      donts,
      explanation,
      resinCode,
      resinName,
      decompositionTime,
      source = "camera_scan",
    } = body;

    if (!itemName) {
      return NextResponse.json(
        { success: false, error: "itemName is required to log scan activity." },
        { status: 400 }
      );
    }

    const savedRecord = await logScanActivity({
      userId,
      userEmail: primaryEmail,
      userName,
      userAvatar,
      itemName,
      category: category || "General",
      binType: binType || "Recyclables Bin",
      binColor: binColor || "blue",
      co2SavedKg: typeof co2SavedKg === "number" ? co2SavedKg : 0.5,
      confidence: confidence || 92,
      preparationAction,
      dos,
      donts,
      explanation,
      resinCode,
      resinName,
      decompositionTime,
      source,
    });

    return NextResponse.json({
      success: true,
      message: "Scan activity recorded successfully",
      record: savedRecord,
    });
  } catch (error: any) {
    console.error("POST /api/activity error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to record activity" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/activity
 * Retrieves activity logs. If requested by Admin (all=true), returns cross-user logs.
 * Otherwise returns authenticated user's logs.
 */
export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const user = await currentUser();
    const primaryEmail =
      user?.emailAddresses.find((e) => e.id === user?.primaryEmailAddressId)?.emailAddress || "";
    const admin = isUserAdmin(
      userId,
      primaryEmail,
      { ...(user?.publicMetadata as any), ...(user?.unsafeMetadata as any) }
    );

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const binColor = searchParams.get("binColor") || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const requestAll = searchParams.get("all") === "true";

    // Only authorized admins can request all users' activity records
    const targetUserId = requestAll && admin ? undefined : userId;

    const activities = await getRecentActivities({
      userId: targetUserId,
      category,
      binColor,
      search,
      limit,
      skip,
    });

    return NextResponse.json({
      success: true,
      activities,
      totalCount: activities.length,
      isAdminView: Boolean(requestAll && admin),
    });
  } catch (error: any) {
    console.error("GET /api/activity error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve activities" },
      { status: 500 }
    );
  }
}

