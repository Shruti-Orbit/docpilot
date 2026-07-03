const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
  chatWithDocument,
  getChatHistory,
} = require("../controllers/chat.controller");

router.get("/history/:workspaceId", auth, getChatHistory);
router.post("/", auth, chatWithDocument);

module.exports = router;
