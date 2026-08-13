import React from "react";

export default function Badge({ icon, title, description, unlocked = false }) {
  return (
    <div className={`rounded-2xl border p-4 transition ${
      unlocked
        ? "border-indigo-200 bg-indigo-50/70 dark:border-indigo-900 dark:bg-indigo-950/30"
        : "border-slate-200 bg-white opacity-55 dark:border-slate-800 dark:bg-slate-900"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${
          unlocked ? "bg-white shadow-sm dark:bg-slate-900" : "bg-slate-100 dark:bg-slate-800"
        }`}>
          {icon}
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
