import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import RecordForm from "../components/RecordForm";
import { Pencil, Trash2, Plus, X, Search, SlidersHorizontal } from "lucide-react";

export default function Records() {
  const [records, setRecords] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [error, setError] = useState("");

  const load = async () => { try { setRecords(await api.records()); } catch (e) { setError(e.message); } };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => records.filter(r => {
    const q = query.toLowerCase();
    return (subject === "All" || r.subject === subject) &&
      (!q || r.topic.toLowerCase().includes(q) || r.learned.toLowerCase().includes(q));
  }), [records, query, subject]);

  const save = async body => {
    try {
      if (editing) await api.updateRecord(editing._id, body);
      else await api.createRecord(body);
      setEditing(null); setShowForm(false); await load();
    } catch (e) { setError(e.message); }
  };

  const remove = async id => {
    if (!confirm("Delete this learning record?")) return;
    try { await api.deleteRecord(id); await load(); } catch (e) { setError(e.message); }
  };

  const subjects = ["All", ...new Set(records.map(r => r.subject))];

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-sm font-semibold text-indigo-600">Your knowledge base</p><h2 className="mt-1 text-3xl font-black">Learning Records</h2><p className="mt-2 text-slate-500">Search and refine everything you have learned.</p></div>
        <button className="btn-primary" onClick={() => { setEditing(null); setShowForm(v => !v); }}>{showForm ? <X size={18}/> : <Plus size={18}/>} {showForm ? "Close" : "Add Record"}</button>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-3 text-red-600">{error}</div>}
      {(showForm || editing) && <RecordForm initial={editing} onSubmit={save} onCancel={() => {setEditing(null);setShowForm(false)}} />}

      <div className="card p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-64 flex-1">
            <Search size={17} className="absolute left-3 top-3 text-slate-400"/>
            <input className="input pl-10" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search topic or notes..." />
          </div>
          <div className="relative">
            <SlidersHorizontal size={16} className="absolute left-3 top-3 text-slate-400"/>
            <select className="input min-w-44 pl-9" value={subject} onChange={e=>setSubject(e.target.value)}>
              {subjects.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(record => (
          <article key={record._id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-black">{record.topic}</h3>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-950/40">{record.subject}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold dark:bg-slate-800">{record.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{record.date} · {record.hours} hours</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary" onClick={()=>{setEditing(record);setShowForm(true)}}><Pencil size={16}/> Edit</button>
                <button className="btn-danger" onClick={()=>remove(record._id)}><Trash2 size={16}/></button>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div><p className="text-xs font-black uppercase text-slate-400">Learned</p><p className="mt-1 whitespace-pre-wrap text-sm">{record.learned}</p></div>
              <div><p className="text-xs font-black uppercase text-slate-400">Practice</p><p className="mt-1 whitespace-pre-wrap text-sm">{record.practice || "—"}</p></div>
              <div><p className="text-xs font-black uppercase text-slate-400">Notes</p><p className="mt-1 whitespace-pre-wrap text-sm">{record.notes || "—"}</p></div>
            </div>
          </article>
        ))}
        {!filtered.length && <div className="card p-10 text-center text-slate-500">No records match your filters.</div>}
      </div>
    </div>
  );
}
