import mongoose from "mongoose";

// Data layer: the shape of a stored review.

const reviewSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileSize: Number,
    filePath: String, // name of the file stored in backend/uploads
    jdText: String, // job description pasted alongside the resume
    score: { type: Number, required: true },
    presentSkills: [String],
    missingSkills: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
