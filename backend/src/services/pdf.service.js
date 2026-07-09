const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
    try {
        console.log("========== PDF DEBUG ==========");
        console.log("PATH:", filePath);
        console.log("EXISTS:", fs.existsSync(filePath));

        const buffer = fs.readFileSync(filePath);

        console.log("BUFFER SIZE:", buffer.length);

        const data = await pdfParse(buffer);

        console.log("TEXT LENGTH:", data.text.length);

        return data.text;
    } catch (error) {
        console.log("PDF ERROR:");
        console.log(error);

        throw error;
    }
};

module.exports = {
    extractTextFromPDF,
};