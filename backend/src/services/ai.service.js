const ai = require("../config/gemini");

const askGemini = async (question, content) => {
  try {
    const prompt = `
You are DocPilot AI.

Answer ONLY using the uploaded document.

If the answer is not found inside the document then reply exactly:

"I couldn't find that information in the uploaded document."

================ DOCUMENT ================

${content}

================ QUESTION ================

${question}
`;

    console.log("Sending request to Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("========== GEMINI RESPONSE ==========");
    console.dir(response, { depth: null });

    let answer = "";

    if (typeof response.text === "string") {
      answer = response.text;
    } else if (typeof response.text === "function") {
      answer = response.text();
    } else if (
      response.candidates?.[0]?.content?.parts?.[0]?.text
    ) {
      answer =
        response.candidates[0].content.parts[0].text;
    }

    if (!answer || answer.trim() === "") {
      throw new Error("Gemini returned an empty response.");
    }

    return answer.trim();

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = {
  askGemini,
};