import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  sub: { type: String, required: true, unique: true }, // Auth0 id
  name: String,
  email: String,
  picture: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
