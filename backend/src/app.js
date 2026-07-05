const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const documentRoutes = require("./routes/document.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const chatRoutes = require("./routes/chat.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const toolRoutes = require("./routes/tool.routes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://docpilot-28c2-7yfswhfkg-shrutiai2105-9980s-projects.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
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
