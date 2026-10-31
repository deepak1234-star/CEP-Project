export type GenderOption =
  | "Male"
  | "Female"
  | "Non-binary"
  | "Prefer not to say"
  | "Other"
  | "";

export interface UserProfileDetails {
  fullName?: string;
  gender?: GenderOption;
  dob?: string; // YYYY-MM-DD format
  bio?: string;
  aboutCheckboxes?: string[];
  updatedAt?: string;
}

export interface ProfileCompletionItem {
  id: string;
  label: string;
  completed: boolean;
  weight: number;
}

export interface ProfileCompletionStats {
  percentage: number;
  completedCount: number;
  totalCount: number;
  items: ProfileCompletionItem[];
}

export const ABOUT_CHECKBOX_OPTIONS = [
  {
    id: "separate_waste",
    label: "I actively separate wet (organic) and dry waste at home",
    emoji: "♻️",
  },
  {
    id: "reusable_bottles",
    label: "I carry my own reusable water bottle & cloth shopping bag",
    emoji: "🎒",
  },
  {
    id: "avoid_single_use",
    label: "I avoid single-use plastic straws, cutlery, and cups",
    emoji: "🚫",
  },
  {
    id: "compost_scraps",
    label: "I practice composting or organic fertilizer gardening",
    emoji: "🌱",
  },
  {
    id: "ewaste_recycler",
    label: "I responsibly recycle old phones, batteries, and e-waste",
    emoji: "🔋",
  },
  {
    id: "cleanup_volunteer",
    label: "I participate or support local clean-up community drives",
    emoji: "🤝",
  },
  {
    id: "eco_enthusiast",
    label: "I am an environmental advocate & passionate recycling learner",
    emoji: "🌍",
  },
];
