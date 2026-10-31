import { NextResponse } from "next/server";
import { getCurrentUserAdminStatus } from "@/lib/adminAuth";
import { getAdminMetrics } from "@/lib/db/activityService";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/metrics
 * Protected route providing overview metrics, statistics, and category distribution.
 * Strictly limited to authorized administrators.
 */
export async function GET() {
  try {
    const { isAdmin, userId } = await getCurrentUserAdminStatus();

    if (!isAdmin || !userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: You do not possess administrator credentials to access this endpoint.",
        },
        { status: 403 }
      );
    }

    const metrics = await getAdminMetrics();

    return NextResponse.json({
      success: true,
      metrics,
    });
  } catch (error: any) {
    console.error("GET /api/admin/metrics error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to retrieve administrator metrics",
      },
      { status: 500 }
    );
  }
}

