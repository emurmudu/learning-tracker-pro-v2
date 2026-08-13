import React, { useEffect, useState } from "react";
import { api } from "../api";
import PlanForm from "../components/PlanForm";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try { setPlans(await api.plans()); } catch (e) { setError(e.message); }
  };

  useEffect(() => { load(); }, []);

  const save = async body => {
    try {
      if (editing) await api.updatePlan(editing._id, body);
      else await api.createPlan(body);
      setEditing(null);
      setShowForm(false);
      await load();
    } catch (e) { setError(e.message); }
  };

  const remove = async id => {
    if (!confirm("Delete this plan?")) return;
    try { await api.deletePlan(id); await load(); } catch (e) { setError(e.message); }
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Plan your next move</p>
          <h2 className="mt-1 text-3xl font-black">Tomorrow Plans</h2>
          <p className="mt-2 text-slate-500">Turn your goals into specific tasks.</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditing(null); setShowForm(v => !v); }}>
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close" : "Add Plan"}
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-3 text-red-600">{error}</div>}

      {(showForm || editing) && <PlanForm initial={editing} onSubmit={save} onCancel={() => { setEditing(null); setShowForm(false); }} />}

      <div className="grid gap-4 lg:grid-cols-2">
        {plans.map(plan => (
          <article key={plan._id} className="card border-l-4 border-l-indigo-500 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${plan.priority === "High" ? "bg-red-50 text-red-600" : plan.priority === "Low" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>{plan.priority}</span>
                <h3 className="mt-3 text-xl font-bold">{plan.topic}</h3>
                <p className="text-sm text-slate-500">{plan.subject} · {plan.date} · {plan.hours}h</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary p-2" onClick={() => { setEditing(plan); setShowForm(true); }}><Pencil size={16} /></button>
                <button className="btn-danger p-2" onClick={() => remove(plan._id)}><Trash2 size={16} /></button>
              </div>
            </div>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
              {plan.tasks.split("\n").filter(Boolean).map((task, i) => <li key={i}>{task}</li>)}
            </ul>
          </article>
        ))}
        {!plans.length && <div className="card p-10 text-center text-slate-500 lg:col-span-2">No plans yet. Add what you want to learn next.</div>}
      </div>
    </div>
  );
}
