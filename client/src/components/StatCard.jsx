import React from "react";

export default function StatCard({ icon: Icon, label, value, helper }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/40">
          <Icon size={22} />
        </div>
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="mt-1 text-3xl font-black">{value}</h3>
      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </div>
  );
}
