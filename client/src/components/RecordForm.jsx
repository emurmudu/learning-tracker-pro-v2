import React, { useEffect, useState } from "react";

const subjects = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Digital Marketing", "Other"];

const blank = {
  date: new Date().toISOString().slice(0, 10),
  subject: "",
  topic: "",
  hours: 1,
  status: "Completed",
  learned: "",
  practice: "",
  notes: ""
};

export default function RecordForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || blank);

  useEffect(() => setForm(initial || blank), [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, hours: Number(form.hours) });
    if (!initial) setForm(blank);
  };

  return (
    <form onSubmit={submit} className="card space-y-5 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold">Date
          <input className="input mt-1" type="date" name="date" value={form.date} onChange={change} required />
        </label>
        <label className="text-sm font-semibold">Subject
          <select className="input mt-1" name="subject" value={form.subject} onChange={change} required>
            <option value="">Select subject</option>
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Topic
          <input className="input mt-1" name="topic" value={form.topic} onChange={change} placeholder="e.g. CSS Grid" required />
        </label>
        <label className="text-sm font-semibold">Learning hours
          <input className="input mt-1" type="number" min="0" step="0.25" name="hours" value={form.hours} onChange={change} required />
        </label>
        <label className="text-sm font-semibold">Status
          <select className="input mt-1" name="status" value={form.status} onChange={change}>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Skipped</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold">What did you learn?
        <textarea className="input mt-1" rows="4" name="learned" value={form.learned} onChange={change} required />
      </label>

      <label className="block text-sm font-semibold">Practice / Project
        <textarea className="input mt-1" rows="3" name="practice" value={form.practice} onChange={change} />
      </label>

      <label className="block text-sm font-semibold">Notes
        <textarea className="input mt-1" rows="3" name="notes" value={form.notes} onChange={change} />
      </label>

      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" type="submit">{initial ? "Update Record" : "Save Learning"}</button>
        {initial && <button className="btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
