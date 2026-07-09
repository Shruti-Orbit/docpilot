const Document = require("../models/Document");
const VectorChunk = require("../models/VectorChunk");
const { extractTextFromPDF } = require("../services/pdf.service");
const { summarizeDocument } = require("../services/gemini.service");
const { indexDocumentChunks } = require("../services/rag.service");



const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF file",
            });
        }

        const userId = req.user.id;

        const { workspaceId } = req.body;

        if (!workspaceId) {
            return res.status(400).json({
                success: false,
                message: "Workspace is required",
            });
        }


        // 1. Save document
        const document = await Document.create({
            user: userId,

            workspace: workspaceId,

            fileName: req.file.filename,
            originalName: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,

            status: "processing",
        });

        try {
            console.log("📄 Extracting PDF...");
            console.log("FILE PATH:", document.filePath);
            console.log("REQ FILE:", req.file);

            const text = await extractTextFromPDF(document.filePath);

            if (text && text.trim().length > 0) {
                await indexDocumentChunks({
                    document,
                    text,
                });

                console.log("🤖 Generating Summary...");

                const summary = await summarizeDocument(text);

                document.summary = summary;
                document.isSummarized = true;
                document.status = "completed";

                await document.save();

                console.log("✅ Summary Generated");
            } else {
                document.status = "failed";
                await document.save();

                console.log("❌ No text found in PDF");
            }

        } catch (err) {
            console.log("Summary Error:", err.message);

            document.status = "failed";
            await document.save();
        }

        res.status(201).json({
            success: true,
            message: "Document Uploaded Successfully",
            data: document,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const getDocuments = async (req, res) => {
    try {
        const { workspaceId } = req.query;

        if (!workspaceId) {
            return res.status(400).json({
                success: false,
                message: "Workspace is required",
            });
        }

        const documents = await Document.find({
            user: req.user.id,
            workspace: workspaceId,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        await Document.findByIdAndDelete(id);
        await VectorChunk.deleteMany({
            documentId: id,
        });

        res.status(200).json({
            success: true,
            message: "Document Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    deleteDocument,
};
