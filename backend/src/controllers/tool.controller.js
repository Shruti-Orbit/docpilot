const ToolCall = require("../models/ToolCall");

const getRecentToolCalls = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const toolCalls = await ToolCall.find({
      user: req.user.id,
      workspace: workspaceId,
    })
      .sort({ timestamp: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      data: toolCalls,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRecentToolCalls,
};
