import React, { useEffect, useState } from "react";

const subjects = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Digital Marketing", "Other"];

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

const blank = {
  date: tomorrow(),
  subject: "",
  topic: "",
  hours: 2,
  priority: "Medium",
  tasks: ""
};

export default function PlanForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || blank);

  useEffect(() => setForm(initial || blank), [initial]);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    onSubmit({ ...form, hours: Number(form.hours) });
    if (!initial) setForm(blank);
  };

  return (
    <form onSubmit={submit} className="card space-y-5 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold">Plan date
          <input className="input mt-1" type="date" name="date" value={form.date} onChange={change} required />
        </label>
        <label className="text-sm font-semibold">Subject
          <select className="input mt-1" name="subject" value={form.subject} onChange={change} required>
            <option value="">Select subject</option>
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Topic
          <input className="input mt-1" name="topic" value={form.topic} onChange={change} required />
        </label>
        <label className="text-sm font-semibold">Target hours
          <input className="input mt-1" type="number" min="0" step="0.25" name="hours" value={form.hours} onChange={change} required />
        </label>
        <label className="text-sm font-semibold">Priority
          <select className="input mt-1" name="priority" value={form.priority} onChange={change}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold">Tasks (one task per line)
        <textarea className="input mt-1" rows="5" name="tasks" value={form.tasks} onChange={change} placeholder={"Learn JavaScript functions\nPractice 5 problems\nBuild a mini project"} required />
      </label>

      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" type="submit">{initial ? "Update Plan" : "Add Plan"}</button>
        {initial && <button className="btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
