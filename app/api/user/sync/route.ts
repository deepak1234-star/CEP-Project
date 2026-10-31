import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { recordUserScanActivity } from "@/lib/clerkActivity";

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
    const { scanHistory, customAvatar, newScan, profileDetails } = body;

    // If new scan is provided, record it with eco points and activity logging
    if (newScan) {
      await recordUserScanActivity(userId, newScan);
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const currentMetadata = (user.unsafeMetadata || {}) as Record<string, any>;

    let updatedHistory = currentMetadata.scanHistory || [];

    if (newScan) {
      updatedHistory = [newScan, ...updatedHistory.filter((item: any) => item.id !== newScan.id)].slice(0, 40);
    } else if (Array.isArray(scanHistory)) {
      updatedHistory = scanHistory.slice(0, 40);
    }

    const updatedMetadata = {
      ...currentMetadata,
      scanHistory: updatedHistory,
      ...(customAvatar !== undefined ? { customAvatar } : {}),
      ...(profileDetails !== undefined ? { profileDetails } : {}),
      lastSyncedAt: new Date().toISOString(),
    };

    await client.users.updateUserMetadata(userId, {
      unsafeMetadata: updatedMetadata,
    });

    return NextResponse.json({
      success: true,
      scanHistory: updatedHistory,
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
