import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, index: true },
    date: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true, trim: true },
    hours: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["Completed", "In Progress", "Skipped"], default: "Completed" },
    learned: { type: String, required: true },
    practice: { type: String, default: "" },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

recordSchema.index({ uid: 1, date: -1 });

export default mongoose.model("Record", recordSchema);
