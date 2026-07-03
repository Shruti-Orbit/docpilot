const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { chatWithDocument } = require("../controllers/chat.controller");

router.post("/", auth, chatWithDocument);

module.exports = router;