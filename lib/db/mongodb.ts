import mongoose from "mongoose";

/**
 * Global cache for MongoDB Mongoose connection in Next.js Serverless environment.
 * Prevents multiple connections across Vercel fluid lambdas during hot reloading and scaling.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export function isMongoConfigured(): boolean {
  const uri = process.env.MONGODB_URI?.trim();
  return Boolean(uri && uri.length > 10 && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://")));
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const MONGODB_URI = process.env.MONGODB_URI?.trim();

  // If MongoDB URI is not configured, return null gracefully (fallback to Clerk data store)
  if (!isMongoConfigured()) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((m) => {
        console.log("✅ Successfully connected to MongoDB Atlas");
        return m;
      })
      .catch((err) => {
        console.warn("⚠️ MongoDB connection failed. Falling back to Clerk store:", err.message);
        cached.promise = null;
        return null as any;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export default connectToDatabase;

