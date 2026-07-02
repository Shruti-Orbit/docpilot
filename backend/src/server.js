const path = require("path");
const express = require("express");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
