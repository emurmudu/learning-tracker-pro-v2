import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error("You are not authenticated.");

  const token = await user.getIdToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

export const api = {
  dashboard: () => request("/dashboard"),
  records: () => request("/records"),
  createRecord: (body) => request("/records", { method: "POST", body: JSON.stringify(body) }),
  updateRecord: (id, body) => request(`/records/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteRecord: (id) => request(`/records/${id}`, { method: "DELETE" }),
  plans: () => request("/plans"),
  createPlan: (body) => request("/plans", { method: "POST", body: JSON.stringify(body) }),
  updatePlan: (id, body) => request(`/plans/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deletePlan: (id) => request(`/plans/${id}`, { method: "DELETE" }),
  monthlyReport: (month) => request(`/reports/monthly?month=${month}`)
};
