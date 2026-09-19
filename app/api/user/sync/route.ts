import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
    };

    return NextResponse.json({
      success: true,
      scanHistory: metadata.scanHistory || [],
      customAvatar: metadata.customAvatar || null,
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
    const { scanHistory, customAvatar, newScan } = body;

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const currentMetadata = (user.unsafeMetadata || {}) as Record<string, any>;

    let updatedHistory = currentMetadata.scanHistory || [];

    if (newScan) {
      // Prepend new scan, prevent duplicates by ID, cap at 40 items
      updatedHistory = [newScan, ...updatedHistory.filter((item: any) => item.id !== newScan.id)].slice(0, 40);
    } else if (Array.isArray(scanHistory)) {
      updatedHistory = scanHistory.slice(0, 40);
    }

    const updatedMetadata = {
      ...currentMetadata,
      scanHistory: updatedHistory,
      ...(customAvatar !== undefined ? { customAvatar } : {}),
      lastSyncedAt: new Date().toISOString(),
    };

    await client.users.updateUserMetadata(userId, {
      unsafeMetadata: updatedMetadata,
    });

    return NextResponse.json({
      success: true,
      scanHistory: updatedHistory,
      customAvatar: updatedMetadata.customAvatar,
    });
  } catch (error) {
    console.error("Failed to sync user cloud metadata:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
