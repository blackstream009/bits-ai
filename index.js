import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  organization: "org-CO9qL8IcT9h1dOMLD6zMW48k",
  apiKey: "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",
});

const COMPLETIONS_MODEL = "text-davinci-003";
const EMBEDDING_MODEL = "text-embedding-ada-002";

function cosineSimilarity(A, B) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < A.length; i++) {
    dotProduct += A[i] * B[i];
    normA += A[i] * A[i];
    normB += B[i] * B[i];
  }
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  return dotProduct / (normA * normB);
}

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a BITS-AI. You can help with graphic design tasks",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});