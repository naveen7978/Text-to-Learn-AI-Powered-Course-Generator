import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: [mongoose.Schema.Types.Mixed], required: true },
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  isEnriched: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Lesson", lessonSchema);
