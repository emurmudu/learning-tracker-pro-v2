import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, index: true },
    date: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true, trim: true },
    hours: { type: Number, required: true, min: 0 },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    tasks: { type: String, required: true }
  },
  { timestamps: true }
);

planSchema.index({ uid: 1, date: 1 });

export default mongoose.model("Plan", planSchema);
