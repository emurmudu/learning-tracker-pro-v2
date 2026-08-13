import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { ChevronLeft, ChevronRight } from "lucide-react";

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export default function Calendar() {
  const [cursor, setCursor] = useState(new Date());
  const [records, setRecords] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    Promise.all([api.records(), api.plans()]).then(([r, p]) => {
      setRecords(r);
      setPlans(p);
    });
  }, []);

  const cells = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const first = new Date(y, m, 1);
    const start = first.getDay();
    const total = new Date(y, m + 1, 0).getDate();
    const arr = [];
    for (let i = 0; i < start; i++) arr.push(null);
    for (let d = 1; d <= total; d++) arr.push(new Date(y, m, d));
    return arr;
  }, [cursor]);

  const month = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const byDate = date => {
    const key = date.toISOString().slice(0, 10);
    return {
      records: records.filter(r => r.date === key),
      plans: plans.filter(p => p.date === key)
    };
  };

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-semibold text-indigo-600">Consistency view</p>
        <h2 className="mt-1 text-3xl font-black">Learning Calendar</h2>
        <p className="mt-2 text-slate-500">See learning sessions and planned work by date.</p>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
          <button className="btn-secondary p-2" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}><ChevronLeft /></button>
          <h3 className="text-xl font-black">{month}</h3>
          <button className="btn-secondary p-2" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}><ChevronRight /></button>
        </div>

        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="p-3 text-center text-xs font-bold uppercase text-slate-400">{d}</div>)}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((date, i) => {
            if (!date) return <div key={i} className="min-h-28 border-b border-r border-slate-100 dark:border-slate-800" />;
            const { records: dayRecords, plans: dayPlans } = byDate(date);
            const hours = dayRecords.reduce((sum, r) => sum + Number(r.hours), 0);
            return (
              <div key={i} className="min-h-28 border-b border-r border-slate-100 p-2 dark:border-slate-800">
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-bold">{date.getDate()}</span>
                  {hours > 0 && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">{hours}h</span>}
                </div>
                <div className="space-y-1">
                  {dayRecords.slice(0, 2).map(r => <div key={r._id} className="truncate rounded bg-green-50 px-2 py-1 text-xs text-green-700 dark:bg-green-950/30 dark:text-green-400">{r.topic}</div>)}
                  {dayPlans.slice(0, 2).map(p => <div key={p._id} className="truncate rounded bg-amber-50 px-2 py-1 text-xs text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">Plan: {p.topic}</div>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
