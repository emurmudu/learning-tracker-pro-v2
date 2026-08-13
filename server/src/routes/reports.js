import { Router } from "express";
import Record from "../models/Record.js";

const router = Router();

router.get("/monthly", async (req, res) => {
  const month = req.query.month;
  if (!/^\d{4}-\d{2}$/.test(month || "")) {
    return res.status(400).json({ message: "month must be YYYY-MM." });
  }

  const records = await Record.find({
    uid: req.user.uid,
    date: { $regex: `^${month}` }
  }).sort({ date: -1 });

  const totalHours = records.reduce((s, r) => s + r.hours, 0);
  const completed = records.filter(r => r.status === "Completed").length;
  const days = new Set(records.map(r => r.date)).size;

  const subjectMap = {};
  records.forEach(r => {
    subjectMap[r.subject] = (subjectMap[r.subject] || 0) + r.hours;
  });

  const subjects = Object.entries(subjectMap)
    .map(([subject, hours]) => ({ subject, hours: Number(hours.toFixed(2)) }))
    .sort((a, b) => b.hours - a.hours);

  res.json({
    summary: {
      totalHours: Number(totalHours.toFixed(2)),
      completed,
      days,
      averageHours: days ? Number((totalHours / days).toFixed(2)) : 0
    },
    subjects,
    records
  });
});

export default router;
