import { ClassificationResult } from "@/types/wasteiq";
import { CustomAvatarState } from "./avatars";
import { UserProfileDetails } from "@/types/profile";

export async function fetchUserCloudData(): Promise<{
  scanHistory: ClassificationResult[];
  customAvatar: CustomAvatarState | null;
  profileDetails: UserProfileDetails | null;
} | null> {
  try {
    const res = await fetch("/api/user/sync", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.success) {
      return {
        scanHistory: data.scanHistory || [],
        customAvatar: data.customAvatar || null,
        profileDetails: data.profileDetails || null,
      };
    }
  } catch (err) {
    console.warn("Cloud sync fetch unavailable:", err);
  }
  return null;
}

export async function syncScanToCloud(scan: ClassificationResult) {
  try {
    await fetch("/api/user/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newScan: scan }),
    });
  } catch (err) {
    console.warn("Could not sync scan to cloud:", err);
  }
}

export async function syncAvatarToCloud(avatar: CustomAvatarState | null) {
  try {
    await fetch("/api/user/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customAvatar: avatar }),
    });
  } catch (err) {
    console.warn("Could not sync avatar to cloud:", err);
  }
}

export async function syncProfileToCloud(profile: UserProfileDetails | null) {
  try {
    await fetch("/api/user/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileDetails: profile }),
    });
  } catch (err) {
    console.warn("Could not sync profile to cloud:", err);
  }
}

export function mergeScanHistories(
  localScans: ClassificationResult[],
  cloudScans: ClassificationResult[]
): ClassificationResult[] {
  const map = new Map<string, ClassificationResult>();
  // Add cloud scans first
  cloudScans.forEach((item) => map.set(item.id, item));
  // Add local scans (will overwrite or add new)
  localScans.forEach((item) => map.set(item.id, item));

  const list = Array.from(map.values());
  // Sort descending by creation date/id
  list.sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    return timeB - timeA;
  });

  return list.slice(0, 40);
}
