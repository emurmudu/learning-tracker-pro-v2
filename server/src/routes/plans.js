import { Router } from "express";
import Plan from "../models/Plan.js";

const router = Router();

router.get("/", async (req, res) => {
  const plans = await Plan.find({ uid: req.user.uid }).sort({ date: 1, createdAt: -1 });
  res.json(plans);
});

router.post("/", async (req, res) => {
  const plan = await Plan.create({ ...req.body, uid: req.user.uid });
  res.status(201).json(plan);
});

router.put("/:id", async (req, res) => {
  const plan = await Plan.findOneAndUpdate(
    { _id: req.params.id, uid: req.user.uid },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!plan) return res.status(404).json({ message: "Plan not found." });
  res.json(plan);
});

router.delete("/:id", async (req, res) => {
  const plan = await Plan.findOneAndDelete({ _id: req.params.id, uid: req.user.uid });
  if (!plan) return res.status(404).json({ message: "Plan not found." });
  res.json({ message: "Plan deleted." });
});

export default router;
