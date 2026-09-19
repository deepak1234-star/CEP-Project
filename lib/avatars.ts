export interface AvatarPreset {
  id: string;
  name: string;
  category: "eco" | "gradient";
  type: "emoji" | "gradient" | "custom_url";
  emoji?: string;
  bgGradient: string;
  description: string;
}

export const ECO_AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: "sprout_hero",
    name: "Sprout Guardian",
    category: "eco",
    type: "emoji",
    emoji: "🌱",
    bgGradient: "from-emerald-500 via-teal-600 to-green-700",
    description: "Champion of organic recycling and zero waste",
  },
  {
    id: "earth_keeper",
    name: "Earth Custodian",
    category: "eco",
    type: "emoji",
    emoji: "🌍",
    bgGradient: "from-cyan-500 via-blue-600 to-indigo-700",
    description: "Dedicated to protecting global ecosystems",
  },
  {
    id: "recycler_pro",
    name: "Recycling Master",
    category: "eco",
    type: "emoji",
    emoji: "♻️",
    bgGradient: "from-teal-400 via-emerald-600 to-cyan-700",
    description: "Expert in sorting resins #1-7 and circular economy",
  },
  {
    id: "solar_pioneer",
    name: "Solar Pioneer",
    category: "eco",
    type: "emoji",
    emoji: "☀️",
    bgGradient: "from-amber-400 via-orange-500 to-rose-600",
    description: "Harnessing clean and renewable solar energy",
  },
  {
    id: "ocean_protector",
    name: "Ocean Defender",
    category: "eco",
    type: "emoji",
    emoji: "🌊",
    bgGradient: "from-sky-400 via-cyan-600 to-blue-800",
    description: "Preventing plastic pollution from entering marine habitats",
  },
  {
    id: "wildlife_friend",
    name: "Forest Fox",
    category: "eco",
    type: "emoji",
    emoji: "🦊",
    bgGradient: "from-orange-500 via-amber-600 to-yellow-600",
    description: "Protecting biodiversity and wilderness",
  },
  {
    id: "bamboo_panda",
    name: "Bamboo Friend",
    category: "eco",
    type: "emoji",
    emoji: "🐼",
    bgGradient: "from-slate-700 via-emerald-900 to-slate-900",
    description: "Advocate for sustainable bamboo and forestry",
  },
  {
    id: "flora_botanist",
    name: "Flora Botanist",
    category: "eco",
    type: "emoji",
    emoji: "🌸",
    bgGradient: "from-pink-500 via-rose-600 to-purple-700",
    description: "Restoring native pollinators and green spaces",
  },
  {
    id: "clean_spark",
    name: "Clean Energy Spark",
    category: "eco",
    type: "emoji",
    emoji: "⚡",
    bgGradient: "from-yellow-400 via-amber-500 to-emerald-600",
    description: "Electrifying a green future without fossil emissions",
  },
  {
    id: "smart_bot",
    name: "EcoSort AI Bot",
    category: "eco",
    type: "emoji",
    emoji: "🤖",
    bgGradient: "from-cyan-400 via-blue-600 to-purple-700",
    description: "AI-driven precision waste classification",
  },
];

export const GRADIENT_AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: "grad_emerald_cyan",
    name: "Emerald Aurora",
    category: "gradient",
    type: "gradient",
    bgGradient: "from-emerald-400 via-teal-500 to-cyan-600",
    description: "Fresh and vibrant emerald aurora",
  },
  {
    id: "grad_cyan_blue",
    name: "Oceanic Depth",
    category: "gradient",
    type: "gradient",
    bgGradient: "from-cyan-400 via-blue-600 to-indigo-700",
    description: "Deep oceanic blue and cyan gradient",
  },
  {
    id: "grad_violet_fuchsia",
    name: "Cosmic Violet",
    category: "gradient",
    type: "gradient",
    bgGradient: "from-purple-500 via-fuchsia-600 to-pink-600",
    description: "Vibrant cosmic violet and fuchsia",
  },
  {
    id: "grad_sunset_amber",
    name: "Sunset Ember",
    category: "gradient",
    type: "gradient",
    bgGradient: "from-amber-400 via-orange-500 to-rose-600",
    description: "Warm sunset ember tones",
  },
  {
    id: "grad_slate_dark",
    name: "Stealth Titanium",
    category: "gradient",
    type: "gradient",
    bgGradient: "from-slate-700 via-slate-800 to-slate-950",
    description: "Modern minimalist stealth titanium",
  },
  {
    id: "grad_mint_lime",
    name: "Bio Lime",
    category: "gradient",
    type: "gradient",
    bgGradient: "from-lime-400 via-emerald-500 to-teal-700",
    description: "Lively bio lime and mint gradient",
  },
];

export interface CustomAvatarState {
  type: "preset" | "gradient" | "uploaded" | "clerk";
  presetId?: string;
  uploadedDataUrl?: string;
  gradientClass?: string;
  emoji?: string;
  avatarName?: string;
}

const STORAGE_KEY_PREFIX = "ecosort_user_avatar_";

export function getStoredAvatar(userId: string): CustomAvatarState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Could not read stored avatar:", e);
  }
  return null;
}

export function saveStoredAvatar(userId: string, avatar: CustomAvatarState | null) {
  if (typeof window === "undefined") return;
  try {
    const key = `${STORAGE_KEY_PREFIX}${userId}`;
    if (!avatar || avatar.type === "clerk") {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(avatar));
    }
    // Notify components that avatar was updated
    window.dispatchEvent(new CustomEvent("ecosort_avatar_changed", { detail: avatar }));
  } catch (e) {
    console.warn("Could not save avatar:", e);
  }
}
