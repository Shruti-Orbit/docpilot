const Document = require("../models/Document");
const Chat = require("../models/Chat");
const { askGemini } = require("../services/gemini.service");
const {
  retrieveRelevantChunks,
} = require("../services/rag.service");
const {
  runGeminiToolCalling,
} = require("../services/tool.service");

const NO_RELEVANT_INFORMATION =
  "I couldn't find relevant information inside the selected workspace.";

const formatSources = (chunks) => {
  const seen = new Set();

  return chunks
    .filter((chunk) => {
      const key = `${chunk.filename}-${chunk.chunkIndex}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .map((chunk) => {
      const page = chunk.pageNumber
        ? `\nPage ${chunk.pageNumber}`
        : "";

      return `${chunk.filename}\nChunk ${chunk.chunkIndex}${page}`;
    })
    .join("\n\n");
};

const chatWithDocument = async (req, res) => {
  try {
    const { documentId, workspaceId, question } = req.body;

    if (!documentId || !question) {
      return res.status(400).json({
        success: false,
        message: "Document ID and Question are required",
      });
    }

   const document = await Document.findOne({
  _id: documentId,
  user: req.user.id,
  workspace: workspaceId,
});



    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }



    if (
      workspaceId &&
      document.workspace.toString() !== workspaceId
    ) {
      return res.status(403).json({
        success: false,
        message: "This document doesn't belong to the selected workspace.",
      });
    }

    const relevantChunks = await retrieveRelevantChunks({
      userId: req.user.id,
      workspaceId,
      question,
    });

    if (relevantChunks.length === 0) {
      await Chat.create({
        user: req.user.id,
        workspace: workspaceId,
        document: documentId,
        question,
        answer: NO_RELEVANT_INFORMATION,
      });

      return res.status(200).json({
        success: true,
        answer: NO_RELEVANT_INFORMATION,
      });
    }

    const context = relevantChunks
      .map(
        (chunk) =>
          `Source: ${chunk.filename}, Chunk ${chunk.chunkIndex}\n${chunk.chunk}`
      )
      .join("\n\n");

    const toolCallResult = await runGeminiToolCalling({
      context,
      question,
      userId: req.user.id,
      workspaceId,
    });

    if (toolCallResult.handled) {
      await Chat.create({
        user: req.user.id,
        workspace: workspaceId,
        document: documentId,
        question,
        answer: toolCallResult.answer,
      });

      return res.status(200).json({
        success: true,
        answer: toolCallResult.answer,
      });
    }

    const answer = await askGemini(context, question);
    const sources = formatSources(relevantChunks);
    const finalAnswer = `${answer}\n\nSource:\n${sources}`;

    await Chat.create({
      user: req.user.id,
      workspace: workspaceId,
      document: documentId,
      question,
      answer: finalAnswer,
    });

    return res.status(200).json({
      success: true,
      answer: finalAnswer,
    });

  } catch (error) {

    console.log("CHAT ERROR");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const chats = await Chat.find({
      user: req.user.id,
      workspace: workspaceId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  chatWithDocument,
  getChatHistory,
};
