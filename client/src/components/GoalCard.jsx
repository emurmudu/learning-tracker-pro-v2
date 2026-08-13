import React from "react";
import { Target } from "lucide-react";

export default function GoalCard({ hours = 20, achieved = 0 }) {
  const percent = Math.min(100, Math.round((achieved / Math.max(hours, 1)) * 100));
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Monthly goal</p>
          <h3 className="mt-1 text-xl font-black">{achieved}h / {hours}h</h3>
        </div>
        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/30">
          <Target size={21} />
        </div>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{percent}% complete</span>
        <span>{Math.max(0, hours - achieved)}h remaining</span>
      </div>
    </div>
  );
}
