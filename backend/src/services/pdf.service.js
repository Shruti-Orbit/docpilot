const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
    try {
        const buffer = fs.readFileSync(filePath);

        const data = await pdfParse(buffer);

        return data.text;
    } catch (error) {
        throw new Error("Unable to read PDF");
    }
};

module.exports = {
    extractTextFromPDF,
};