const model = require("../config/gemini");

const summarizeDocument = async (documentText) => {
    const prompt = `
You are DocPilot AI.

Read the uploaded document carefully.

Return ONLY a professional summary.

Summary should include:

- Main purpose
- Key points
- Important technologies
- Important skills
- Important experience
- Maximum 250 words.

Document:

${documentText}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
};

const askGemini = async (documentText, question) => {

    const prompt = `
You are DocPilot AI.

Answer ONLY from the retrieved document context.

If the answer is not present, reply:

"I couldn't find relevant information inside the selected workspace."

Retrieved context:

${documentText}

Question:

${question}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
};

module.exports = {
    summarizeDocument,
    askGemini,
};
