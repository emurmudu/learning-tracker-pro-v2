import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { requireAuth } from "./middleware/auth.js";
import recordsRouter from "./routes/records.js";
import plansRouter from "./routes/plans.js";
import dashboardRouter from "./routes/dashboard.js";
import reportsRouter from "./routes/reports.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "Learning Tracker API",
    status: "running"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "learning-tracker-api"
  });
});

app.use("/api", requireAuth);

app.use("/api/records", recordsRouter);
app.use("/api/plans", plansRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/reports", reportsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error."
  });
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  })
  .catch(error => {
    console.error("Startup failed:", error);
    process.exit(1);
  });