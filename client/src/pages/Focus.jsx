import React from "react";
import FocusTimer from "../components/FocusTimer";

export default function Focus() {
  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <div>
        <p className="text-sm font-semibold text-indigo-600">Deep work</p>
        <h2 className="mt-1 text-3xl font-black">Focus Timer</h2>
        <p className="mt-2 text-slate-500">Choose a session length and protect your attention.</p>
      </div>
      <FocusTimer />
      <div className="card p-5">
        <h3 className="font-bold">Focus routine</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Choose one specific learning outcome.</li>
          <li>Put your phone and unrelated tabs away.</li>
          <li>Study until the timer ends.</li>
          <li>Record what you learned immediately afterward.</li>
        </ol>
      </div>
    </div>
  );
}
