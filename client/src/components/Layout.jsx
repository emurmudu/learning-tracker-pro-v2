import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  LayoutDashboard, BookOpen, CalendarDays, BarChart3, Target,
  LogOut, Moon, Sun, Menu, X, Timer, Sparkles
} from "lucide-react";

const links = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/records", label: "Learning Records", icon: BookOpen },
  { to: "/plans", label: "Tomorrow Plans", icon: Target },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/reports", label: "Reports", icon: BarChart3 }
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white p-5 transition-transform dark:border-slate-800 dark:bg-slate-900 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"><Sparkles size={20}/></div>
            <div>
              <h1 className="text-lg font-black">LearnFlow</h1>
              <p className="text-xs text-slate-500">Learning OS</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)}><X /></button>
        </div>

        <nav className="space-y-1.5">
          <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[.18em] text-slate-400">Workspace</p>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
          <NavLink to="/focus" onClick={() => setOpen(false)} className={({isActive}) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>
            <Timer size={18}/> Focus Timer
          </NavLink>
        </nav>

        <div className="absolute bottom-5 left-5 right-5 space-y-2">
          <button className="btn-secondary w-full" onClick={() => setDark(v => !v)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="btn-danger w-full" onClick={logout}><LogOut size={18} /> Sign out</button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:px-8">
          <div className="flex items-center justify-between">
            <button className="lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 md:block">
                Stay curious. Keep building.
              </div>
              <img className="h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-800"
                src={auth.currentUser?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.currentUser?.displayName || auth.currentUser?.email || "User")}`}
                alt="profile" />
              <div className="hidden sm:block">
                <p className="text-sm font-bold">{auth.currentUser?.displayName || "Learner"}</p>
                <p className="text-xs text-slate-500">{auth.currentUser?.email}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
