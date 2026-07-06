const { CohereClient } = require("cohere-ai");
const VectorChunk = require("../models/VectorChunk");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 100;
const TOP_K = 5;

// ------------------------
// Split Document
// ------------------------

const splitIntoChunks = (text) => {
  const normalizedText = text.replace(/\s+/g, " ").trim();
  const chunks = [];

  for (
    let start = 0;
    start < normalizedText.length;
    start += CHUNK_SIZE - CHUNK_OVERLAP
  ) {
    const chunk = normalizedText
      .slice(start, start + CHUNK_SIZE)
      .trim();

    if (chunk) {
      chunks.push(chunk);
    }
  }

  return chunks;
};

// ------------------------
// Generate Embedding
// ------------------------

const createEmbedding = async (
  text,
  inputType = "search_document"
) => {
  const response = await cohere.embed({
    texts: [text],
    model: "embed-english-v3.0",
    inputType,
    embeddingTypes: ["float"],
  });

  return response.embeddings.float[0];
};

// ------------------------
// Cosine Similarity
// ------------------------

const cosineSimilarity = (a, b) => {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (!normA || !normB) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

// ------------------------
// Index Document
// ------------------------

const indexDocumentChunks = async ({
  document,
  text,
}) => {
  const chunks = splitIntoChunks(text);

  await VectorChunk.deleteMany({
    documentId: document._id,
  });

  const vectors = [];

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await createEmbedding(
      chunks[i],
      "search_document"
    );

    vectors.push({
      user: document.user,
      workspaceId: document.workspace,
      documentId: document._id,
      filename: document.originalName,
      chunkIndex: i + 1,
      pageNumber: null,
      chunk: chunks[i],
      embedding,
    });
  }

  if (vectors.length) {
    await VectorChunk.insertMany(vectors);
  }

  console.log("✅ Indexed Chunks:", vectors.length);
};

// ------------------------
// Retrieve Relevant Chunks
// ------------------------

const retrieveRelevantChunks = async ({
  userId,
  workspaceId,
  question,
}) => {
  console.log("\n========== RAG DEBUG ==========");
  console.log("USER ID:", userId);
  console.log("WORKSPACE ID:", workspaceId);
  console.log("QUESTION:", question);

  const questionEmbedding = await createEmbedding(
    question,
    "search_query"
  );

  const chunks = await VectorChunk.find({
    user: userId,
    workspaceId,
  }).lean();

  console.log("TOTAL CHUNKS FOUND:", chunks.length);

  const ranked = chunks
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(
        questionEmbedding,
        chunk.embedding
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);

  console.log("TOP CHUNKS:", ranked.length);

  if (ranked.length > 0) {
    console.log("TOP SCORE:", ranked[0].score);
    console.log("FIRST FILE:", ranked[0].filename);
  }

  console.log("================================\n");

  return ranked;
};

module.exports = {
  indexDocumentChunks,
  retrieveRelevantChunks,
};