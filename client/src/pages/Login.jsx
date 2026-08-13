import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) await updateProfile(result.user, { displayName: name.trim() });
      }
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const google = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100 p-4 dark:from-slate-950 dark:to-indigo-950">
      <div className="card w-full max-w-md p-7">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white">📚</div>
          <h1 className="text-3xl font-black">Learning Tracker</h1>
          <p className="mt-2 text-sm text-slate-500">Build a consistent learning habit.</p>
        </div>

        <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button onClick={() => setMode("login")} className={`rounded-lg py-2 text-sm font-bold ${mode === "login" ? "bg-white shadow dark:bg-slate-700" : ""}`}>Login</button>
          <button onClick={() => setMode("register")} className={`rounded-lg py-2 text-sm font-bold ${mode === "register" ? "bg-white shadow dark:bg-slate-700" : ""}`}>Register</button>
        </div>

        {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          {mode === "register" && (
            <label className="block text-sm font-semibold">Name
              <input className="input mt-1" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </label>
          )}

          <label className="block text-sm font-semibold">Email
            <input className="input mt-1" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>

          <label className="block text-sm font-semibold">Password
            <input className="input mt-1" type="password" value={password} onChange={e => setPassword(e.target.value)} minLength="6" required />
          </label>

          <button className="btn-primary w-full" type="submit">{mode === "login" ? "Sign in" : "Create account"}</button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" /> OR <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        <button className="btn-secondary w-full" onClick={google}>Continue with Google</button>
      </div>
    </div>
  );
}
