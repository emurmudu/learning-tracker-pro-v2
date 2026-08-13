import { Router } from "express";
import Record from "../models/Record.js";

const router = Router();

router.get("/", async (req, res) => {
  const records = await Record.find({ uid: req.user.uid }).sort({ date: -1, createdAt: -1 });
  res.json(records);
});

router.post("/", async (req, res) => {
  const record = await Record.create({ ...req.body, uid: req.user.uid });
  res.status(201).json(record);
});

router.put("/:id", async (req, res) => {
  const record = await Record.findOneAndUpdate(
    { _id: req.params.id, uid: req.user.uid },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!record) return res.status(404).json({ message: "Record not found." });
  res.json(record);
});

router.delete("/:id", async (req, res) => {
  const record = await Record.findOneAndDelete({ _id: req.params.id, uid: req.user.uid });
  if (!record) return res.status(404).json({ message: "Record not found." });
  res.json({ message: "Record deleted." });
});

export default router;
