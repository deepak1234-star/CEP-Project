import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserProfile extends Document {
  clerkId: string;
  email: string;
  name?: string;
  avatar?: string;
  role: "user" | "admin";
  ecoPoints: number;
  totalScans: number;
  totalCo2SavedKg: number;
  level: string;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema: Schema = new Schema<IUserProfile>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      default: "Eco Recycler",
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    ecoPoints: {
      type: Number,
      default: 0,
    },
    totalScans: {
      type: Number,
      default: 0,
    },
    totalCo2SavedKg: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      default: "Eco Beginner 🐣 (Level 1)",
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

UserProfileSchema.index({ ecoPoints: -1 });
UserProfileSchema.index({ lastActive: -1 });

export const UserProfile: Model<IUserProfile> =
  mongoose.models.UserProfile ||
  mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);

export default UserProfile;

