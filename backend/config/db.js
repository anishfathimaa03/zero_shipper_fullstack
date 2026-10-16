import mongoose from "mongoose";

// Config layer: everything about connecting to outside resources.

export async function connectDB() {
  const uri =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zero_shipper";

  try {
    // Short timeout so a missing MongoDB doesn't stall startup for 30s.
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log("MongoDB connected:", mongoose.connection.name);
  } catch (err) {
    console.warn(
      `MongoDB unavailable (${err.message}) — API runs without saving reviews.`
    );
  }
}
