const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  deleteWorkspace,
} = require("../controllers/workspace.controller");

router.post("/", auth, createWorkspace);

router.get("/", auth, getWorkspaces);

router.get("/:id", auth, getWorkspace);

router.delete("/:id", auth, deleteWorkspace);

module.exports = router;