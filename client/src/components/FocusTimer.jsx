import React, { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, Timer } from "lucide-react";

const PRESETS = [25, 50, 90];

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(prev => {
        if (prev > 0) return prev - 1;
        if (minutes > 0) {
          setMinutes(m => m - 1);
          return 59;
        }
        setRunning(false);
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, minutes]);

  const reset = value => {
    setRunning(false);
    setMinutes(value);
    setSeconds(0);
  };

  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-5 text-white">
        <div className="flex items-center gap-2">
          <Timer size={18} />
          <span className="text-sm font-bold uppercase tracking-wider">Focus session</span>
        </div>
        <div className="my-5 text-center text-6xl font-black tabular-nums">{display}</div>
        <div className="flex justify-center gap-2">
          {PRESETS.map(p => (
            <button key={p} onClick={() => reset(p)} className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-bold hover:bg-white/25">
              {p}m
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 p-4">
        <button className="btn-primary flex-1" onClick={() => setRunning(v => !v)}>
          {running ? <Pause size={17} /> : <Play size={17} />}
          {running ? "Pause" : "Start"}
        </button>
        <button className="btn-secondary" onClick={() => reset(25)}><RotateCcw size={17} /></button>
      </div>
    </div>
  );
}
