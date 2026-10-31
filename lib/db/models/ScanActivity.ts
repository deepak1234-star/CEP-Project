import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScanActivity extends Document {
  userId: string;
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  itemName: string;
  category: string;
  binType: string;
  binColor: "green" | "blue" | "yellow" | "purple" | "red";
  co2SavedKg: number;
  confidence: number;
  preparationAction?: string;
  dos?: string[];
  donts?: string[];
  explanation?: string;
  resinCode?: number | null;
  resinName?: string | null;
  decompositionTime?: string;
  source: "camera_scan" | "agent_chat" | "manual";
  createdAt: Date;
  updatedAt: Date;
}

const ScanActivitySchema: Schema = new Schema<IScanActivity>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    userEmail: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    userAvatar: {
      type: String,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    binType: {
      type: String,
      default: "Recyclables Bin",
    },
    binColor: {
      type: String,
      enum: ["green", "blue", "yellow", "purple", "red"],
      default: "blue",
      index: true,
    },
    co2SavedKg: {
      type: Number,
      default: 0.5,
    },
    confidence: {
      type: Number,
      default: 90,
      min: 0,
      max: 100,
    },
    preparationAction: {
      type: String,
    },
    dos: {
      type: [String],
      default: [],
    },
    donts: {
      type: [String],
      default: [],
    },
    explanation: {
      type: String,
    },
    resinCode: {
      type: Number,
      default: null,
    },
    resinName: {
      type: String,
      default: null,
    },
    decompositionTime: {
      type: String,
    },
    source: {
      type: String,
      enum: ["camera_scan", "agent_chat", "manual"],
      default: "camera_scan",
    },
  },
  {
    timestamps: true,
  }
);

// High-speed compound indexes for admin dashboard filters
ScanActivitySchema.index({ createdAt: -1 });
ScanActivitySchema.index({ userId: 1, createdAt: -1 });
ScanActivitySchema.index({ category: 1, createdAt: -1 });

export const ScanActivity: Model<IScanActivity> =
  mongoose.models.ScanActivity ||
  mongoose.model<IScanActivity>("ScanActivity", ScanActivitySchema);

export default ScanActivity;

