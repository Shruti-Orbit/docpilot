const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const documentRoutes = require("./routes/document.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const chatRoutes = require("./routes/chat.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const toolRoutes = require("./routes/tool.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://docpilot-as7g.vercel.app",
  "https://docpilot-as7g-7njuxcp8u-shrutiai2105-9980s-projects.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman/server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tools", toolRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DocPilot AI Backend Running",
  });
});

module.exports = app;