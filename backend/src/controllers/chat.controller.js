const Document = require("../models/Document");
const { extractTextFromPDF } = require("../services/pdf.service");
const { askGemini } = require("../services/gemini.service");

const chatWithDocument = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    if (!documentId || !question) {
      return res.status(400).json({
        success: false,
        message: "Document ID and Question are required",
      });
    }

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    console.log("========== DOCUMENT ==========");
    console.log(document.filePath);

    // Extract PDF Text
    const documentText = await extractTextFromPDF(document.filePath);

    console.log("========== PDF TEXT ==========");
    console.log("Length :", documentText.length);
    console.log(documentText.substring(0, 500));
    console.log("==============================");

    if (!documentText || documentText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "No text found in this PDF.",
      });
    }

    // Gemini
    const answer = await askGemini(documentText, question);

    return res.status(200).json({
      success: true,
      answer,
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

module.exports = {
  chatWithDocument,
};