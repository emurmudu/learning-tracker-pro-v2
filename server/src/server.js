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

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without Origin
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error(`CORS blocked origin: ${origin}`);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(express.json());

// Root
app.get("/", (_req, res) => {
  res.json({
    name: "Learning Tracker API",
    status: "running"
  });
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "learning-tracker-api"
  });
});

// Authentication required for API routes
app.use("/api", requireAuth);

app.use("/api/records", recordsRouter);
app.use("/api/plans", plansRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/reports", reportsRouter);

// Error handler
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
  .catch((error) => {
    console.error("Startup failed:", error);
    process.exit(1);
  });