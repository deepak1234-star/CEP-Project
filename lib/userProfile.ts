import {
  UserProfileDetails,
  ProfileCompletionStats,
  ProfileCompletionItem,
} from "@/types/profile";

export const PROFILE_CHANGED_EVENT = "wasteiq_profile_updated";

export function getProfileStorageKey(userId: string): string {
  return `wasteiq_profile_${userId}`;
}

export function getStoredProfile(userId: string): UserProfileDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getProfileStorageKey(userId));
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read stored user profile:", err);
  }
  return null;
}

export function saveStoredProfile(
  userId: string,
  profile: UserProfileDetails
): void {
  if (typeof window === "undefined") return;
  try {
    const updated = {
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(getProfileStorageKey(userId), JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent<UserProfileDetails>(PROFILE_CHANGED_EVENT, {
        detail: updated,
      })
    );
  } catch (err) {
    console.warn("Could not save user profile:", err);
  }
}

export function calculateProfileCompletion(params: {
  fullName?: string;
  email?: string;
  hasAvatar?: boolean;
  profile?: UserProfileDetails | null;
}): ProfileCompletionStats {
  const { fullName, email, hasAvatar, profile } = params;

  const resolvedName = (profile?.fullName || fullName || "").trim();
  const resolvedEmail = (email || "").trim();
  const gender = (profile?.gender || "").trim();
  const dob = (profile?.dob || "").trim();
  const bio = (profile?.bio || "").trim();
  const checkboxes = profile?.aboutCheckboxes || [];

  const items: ProfileCompletionItem[] = [
    {
      id: "name",
      label: "Full Name",
      completed: resolvedName.length >= 2,
      weight: 15,
    },
    {
      id: "email",
      label: "Verified Email",
      completed: resolvedEmail.length > 3 && resolvedEmail.includes("@"),
      weight: 15,
    },
    {
      id: "avatar",
      label: "Profile Picture / Avatar",
      completed: Boolean(hasAvatar),
      weight: 15,
    },
    {
      id: "gender",
      label: "Gender Identity",
      completed: gender.length > 0,
      weight: 15,
    },
    {
      id: "dob",
      label: "Date of Birth",
      completed: dob.length >= 8,
      weight: 15,
    },
    {
      id: "bio",
      label: "Bio Summary",
      completed: bio.length >= 10,
      weight: 15,
    },
    {
      id: "about_checkboxes",
      label: "Self & Eco Habits (Checkboxes)",
      completed: checkboxes.length >= 1,
      weight: 10,
    },
  ];

  const completedItems = items.filter((item) => item.completed);
  const totalWeight = items.reduce((acc, curr) => acc + curr.weight, 0);
  const completedWeight = completedItems.reduce(
    (acc, curr) => acc + curr.weight,
    0
  );

  // Exact integer percentage (capped at 100)
  const percentage = Math.min(
    100,
    Math.round((completedWeight / totalWeight) * 100)
  );

  return {
    percentage,
    completedCount: completedItems.length,
    totalCount: items.length,
    items,
  };
}
