import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Plans from "./pages/Plans";
import Focus from "./pages/Focus";
import Layout from "./components/Layout";

function Protected({ children }) {
  return auth.currentUser ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, current => { setUser(current); setLoading(false); }), []);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"/></div>;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/*" element={<Protected><Layout><Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/records" element={<Records />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes></Layout></Protected>} />
    </Routes>
  );
}
