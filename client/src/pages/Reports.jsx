import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

export default function Reports() {
  const [month, setMonth] = useState(currentMonth());
  const [data, setData] = useState(null);

  useEffect(() => {
    api.monthlyReport(month).then(setData).catch(console.error);
  }, [month]);

  const download = () => {
    if (!data) return;
    const lines = [
      `Learning Report - ${month}`,
      `Total hours: ${data.summary.totalHours}`,
      `Completed topics: ${data.summary.completed}`,
      `Learning days: ${data.summary.days}`,
      `Average hours/day: ${data.summary.averageHours}`,
      "",
      "Subject breakdown:",
      ...data.subjects.map(s => `${s.subject}: ${s.hours} hours`)
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `learning-report-${month}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Measure your growth</p>
          <h2 className="mt-1 text-3xl font-black">Monthly Report</h2>
          <p className="mt-2 text-slate-500">Understand where your learning time went.</p>
        </div>
        <div className="flex gap-2">
          <input className="input" type="month" value={month} onChange={e => setMonth(e.target.value)} />
          <button className="btn-secondary" onClick={download}><Download size={17} /> Export</button>
        </div>
      </div>

      {!data ? <div>Loading report...</div> : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card p-5"><p className="text-sm text-slate-500">Total Hours</p><p className="mt-1 text-3xl font-black text-indigo-600">{data.summary.totalHours}h</p></div>
            <div className="card p-5"><p className="text-sm text-slate-500">Learning Days</p><p className="mt-1 text-3xl font-black">{data.summary.days}</p></div>
            <div className="card p-5"><p className="text-sm text-slate-500">Completed</p><p className="mt-1 text-3xl font-black">{data.summary.completed}</p></div>
            <div className="card p-5"><p className="text-sm text-slate-500">Average / Day</p><p className="mt-1 text-3xl font-black">{data.summary.averageHours}h</p></div>
          </div>

          <div className="card p-5">
            <h3 className="mb-5 text-lg font-bold">Subject Breakdown</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.subjects}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#4f46e5" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 className="text-lg font-bold">Monthly Sessions</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.records.map(r => (
                <div key={r._id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-bold">{r.topic}</p>
                    <p className="text-sm text-slate-500">{r.date} · {r.subject}</p>
                  </div>
                  <span className="font-bold text-indigo-600">{r.hours}h</span>
                </div>
              ))}
              {!data.records.length && <p className="p-6 text-center text-slate-500">No sessions in this month.</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
