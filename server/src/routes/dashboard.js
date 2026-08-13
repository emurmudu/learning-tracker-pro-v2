import { Router } from "express";
import Record from "../models/Record.js";
import Plan from "../models/Plan.js";

const router = Router();

function dateKey(d) {
  return d.toISOString().slice(0, 10);
}

function streak(records) {
  const dates = [...new Set(records.map(r => r.date))].sort().reverse();
  if (!dates.length) return 0;
  const today = dateKey(new Date());
  if (dates[0] !== today) return 0;
  let count = 0;
  const cursor = new Date();
  for (const value of dates) {
    if (value !== dateKey(cursor)) break;
    count++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

router.get("/", async (req, res) => {
  const uid = req.user.uid;
  const records = await Record.find({ uid }).sort({ date: -1, createdAt: -1 });
  const plans = await Plan.find({ uid }).sort({ date: 1 });

  const totalHours = records.reduce((s, r) => s + r.hours, 0);
  const completed = records.filter(r => r.status === "Completed").length;
  const totalDays = new Set(records.map(r => r.date)).size;
  const now = new Date();
  const monthPrefix = now.toISOString().slice(0, 7);
  const monthHours = records.filter(r => r.date.startsWith(monthPrefix)).reduce((s, r) => s + r.hours, 0);
  const plannedHours = plans.filter(p => p.date >= dateKey(now)).reduce((s, p) => s + p.hours, 0);

  const weekly = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dateKey(d);
    const hours = records.filter(r => r.date === key).reduce((s, r) => s + r.hours, 0);
    weekly.push({ date: key.slice(5), hours });
  }

  const subjectMap = {};
  records.forEach(r => subjectMap[r.subject] = (subjectMap[r.subject] || 0) + r.hours);
  const subjects = Object.entries(subjectMap).map(([subject, hours]) => ({ subject, hours: Number(hours.toFixed(2)) })).sort((a,b)=>b.hours-a.hours).slice(0,8);

  res.json({
    stats: {
      totalHours: Number(totalHours.toFixed(2)),
      monthHours: Number(monthHours.toFixed(2)),
      completed, totalDays,
      plannedHours: Number(plannedHours.toFixed(2)),
      streak: streak(records)
    },
    weekly, subjects,
    recent: records.slice(0,5),
    upcoming: plans.filter(p => p.date >= dateKey(now)).slice(0,5)
  });
});

export default router;
