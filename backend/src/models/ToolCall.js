const mongoose = require("mongoose");

const toolCallSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toolName: {
    type: String,
    required: true,
  },
  arguments: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  success: {
    type: Boolean,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ToolCall", toolCallSchema);
