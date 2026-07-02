const Document = require("../models/Document");

// ================================
// Upload Document
// ================================

const uploadDocument = async (req, res) => {
    try {
        // Check File
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF file",
            });
        }

        // Logged In User
        const userId = req.user.id;

        // Save Document
        const document = await Document.create({
            user: userId,
            fileName: req.file.filename,
            originalName: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            status: "completed",
        });

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

// ================================
// Get User Documents
// ================================

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
            user: req.user.id,
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

// ================================
// Delete Document
// ================================

const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        await Document.findByIdAndDelete(id);

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