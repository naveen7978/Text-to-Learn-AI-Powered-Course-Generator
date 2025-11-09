// server/test.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function main() {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
  
    const prompt = "Hello Gemini, tell me a one-line programming joke.";
    console.log("🧠 Sending prompt:", prompt);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("\n✅ Gemini Response:");
    console.log(text);
  } catch (err) {
    console.error("\n❌ Gemini API Error:", err);
  }
}

main();
