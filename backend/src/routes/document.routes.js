const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    uploadDocument,
    getDocuments,
    deleteDocument,
} = require("../controllers/document.controller");

// Upload PDF
router.post(
    "/upload",
    auth,
    upload.single("file"),
    uploadDocument
);

// Get All Documents of Logged In User
router.get("/", auth, getDocuments);

// Delete Document
router.delete("/:id", auth, deleteDocument);

module.exports = router;