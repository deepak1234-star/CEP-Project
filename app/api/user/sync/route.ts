import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { recordUserScanActivity, recordBatchScanActivities } from "@/lib/clerkActivity";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = (user.unsafeMetadata || {}) as {
      scanHistory?: any[];
      customAvatar?: any;
      profileDetails?: any;
      ecoStats?: any;
      activities?: any[];
    };

    return NextResponse.json({
      success: true,
      scanHistory: metadata.scanHistory || [],
      customAvatar: metadata.customAvatar || null,
      profileDetails: metadata.profileDetails || null,
      ecoStats: metadata.ecoStats || null,
      activities: metadata.activities || [],
    });
  } catch (error) {
    console.error("Failed to retrieve user cloud metadata:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { scanHistory, batchScans, customAvatar, newScan, profileDetails } = body;

    // Handle batch scans migration from client localStorage
    const scansToBatch = batchScans || (Array.isArray(scanHistory) && scanHistory.length > 0 ? scanHistory : null);
    if (scansToBatch && scansToBatch.length > 0) {
      await recordBatchScanActivities(userId, scansToBatch);
    } else if (newScan) {
      await recordUserScanActivity(userId, newScan);
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const currentMetadata = (user.unsafeMetadata || {}) as Record<string, any>;

    const updatedMetadata = {
      ...currentMetadata,
      ...(customAvatar !== undefined ? { customAvatar } : {}),
      ...(profileDetails !== undefined ? { profileDetails } : {}),
      lastSyncedAt: new Date().toISOString(),
    };

    if (customAvatar !== undefined || profileDetails !== undefined) {
      await client.users.updateUserMetadata(userId, {
        unsafeMetadata: updatedMetadata,
      });
    }

    return NextResponse.json({
      success: true,
      scanHistory: currentMetadata.scanHistory || [],
      customAvatar: updatedMetadata.customAvatar,
      profileDetails: updatedMetadata.profileDetails,
      ecoStats: currentMetadata.ecoStats || null,
      activities: currentMetadata.activities || [],
    });
  } catch (error) {
    console.error("Failed to sync user cloud metadata:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
