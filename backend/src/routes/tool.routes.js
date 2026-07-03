const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
  getRecentToolCalls,
} = require("../controllers/tool.controller");

router.get("/recent/:workspaceId", auth, getRecentToolCalls);

module.exports = router;
