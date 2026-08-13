import React, { useEffect, useState } from "react";
import { api } from "../api";
import StatCard from "../components/StatCard";
import GoalCard from "../components/GoalCard";
import Badge from "../components/Badge";
import FocusTimer from "../components/FocusTimer";
import { Clock3, Flame, CheckCircle2, Target, TrendingUp, BookOpen } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.dashboard().then(setData).catch(e => setError(e.message));
  }, []);

  if (error) return <div className="card p-6 text-red-600">{error}</div>;
  if (!data) return <div className="flex min-h-64 items-center justify-center text-slate-500">Loading your workspace...</div>;

  const goal = Number(localStorage.getItem("monthlyGoal") || 20);
  const badges = [
    { icon: "🔥", title: "First Streak", description: "Study for 3 days in a row", unlocked: data.stats.streak >= 3 },
    { icon: "⏱️", title: "10 Hour Club", description: "Reach 10 total learning hours", unlocked: data.stats.totalHours >= 10 },
    { icon: "📚", title: "Topic Builder", description: "Complete 10 topics", unlocked: data.stats.completed >= 10 },
    { icon: "🏆", title: "50 Hour Club", description: "Reach 50 total learning hours", unlocked: data.stats.totalHours >= 50 }
  ];

  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-700 p-6 text-white shadow-xl lg:p-8">
        <div className="max-w-3xl">
          <p className="mb-2 text-sm font-bold text-indigo-200">YOUR LEARNING WORKSPACE</p>
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">Make progress visible.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-indigo-100 md:text-base">
            Track your learning, protect your focus, plan tomorrow, and use your data to improve the way you learn.
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Flame} label="Current Streak" value={`${data.stats.streak} days`} helper="Consistency compounds" />
        <StatCard icon={Clock3} label="Total Learning" value={`${data.stats.totalHours}h`} helper="All recorded sessions" />
        <StatCard icon={CheckCircle2} label="Completed Topics" value={data.stats.completed} helper={`${data.stats.totalDays} active days`} />
        <StatCard icon={Target} label="Planned Hours" value={`${data.stats.plannedHours}h`} helper="Upcoming learning" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card p-5 xl:col-span-2">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-black">Learning momentum</h3>
              <p className="text-sm text-slate-500">Hours studied over the last 7 days</p>
            </div>
            <TrendingUp className="text-indigo-500" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.weekly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.13} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <GoalCard hours={goal} achieved={data.stats.monthHours} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card p-5 xl:col-span-2">
          <h3 className="text-lg font-black">Subject focus</h3>
          <p className="mb-5 text-sm text-slate-500">Where your learning time is going</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.subjects} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                <XAxis type="number" />
                <YAxis dataKey="subject" type="category" width={105} />
                <Tooltip />
                <Bar dataKey="hours" fill="#4f46e5" radius={[0, 7, 7, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <FocusTimer />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2"><BookOpen size={19} className="text-indigo-500"/><h3 className="text-lg font-black">Recent learning</h3></div>
          <div className="space-y-3">
            {data.recent.map(item => (
              <div key={item._id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <div><p className="font-bold">{item.topic}</p><p className="text-xs text-slate-500">{item.subject} · {item.date}</p></div>
                <span className="font-black text-indigo-600">{item.hours}h</span>
              </div>
            ))}
            {!data.recent.length && <p className="text-sm text-slate-500">No records yet.</p>}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="mb-4 text-lg font-black">Next up</h3>
          <div className="space-y-3">
            {data.upcoming.map(item => (
              <div key={item._id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <div><p className="font-bold">{item.topic}</p><p className="text-xs text-slate-500">{item.subject} · {item.date}</p></div>
                <span className="font-black text-amber-600">{item.hours}h</span>
              </div>
            ))}
            {!data.upcoming.length && <p className="text-sm text-slate-500">No plans yet.</p>}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-lg font-black">Achievements</h3>
          <p className="text-sm text-slate-500">Small milestones that make consistency rewarding.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {badges.map(b => <Badge key={b.title} {...b} />)}
        </div>
      </div>
    </div>
  );
}
