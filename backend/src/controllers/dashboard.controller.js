const User = require("../models/User");
const Document = require("../models/Document");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // User
    const user = await User.findById(userId).select("-password");

    // Documents
    const documents = await Document.find({ user: userId }).sort({
      createdAt: -1,
    });

    // Total Storage
    const totalStorage = documents.reduce(
      (total, doc) => total + doc.fileSize,
      0
    );

    // Convert Bytes → MB
    const storageInMB = (totalStorage / (1024 * 1024)).toFixed(2);

    res.status(200).json({
      success: true,
      data: {
        user,
        stats: {
          totalDocuments: documents.length,
          totalStorage: `${storageInMB} MB`,
          recentUpload:
            documents.length > 0
              ? documents[0].originalName
              : "No Documents",
        },
        recentDocuments: documents.slice(0, 5),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};