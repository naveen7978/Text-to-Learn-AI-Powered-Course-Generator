import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Use a model that supports JSON schema (e.g., 1.5-flash or 2.5-flash)
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

// ---------------- SCHEMAS ----------------

// Schema for a detailed Lesson, as per Milestone 8 rules
const lessonSchema = z.object({
  title: z.string(),
  objectives: z.array(z.string()), // Rule: "Include a structured field for lesson objectives"
  content: z.array(
    z.object({
      type: z.enum(["heading", "paragraph", "code", "video", "mcq"]),
      // For heading, paragraph, code
      text: z.string().optional(),
      // For code
      language: z.string().optional(),
      // For video
      query: z.string().optional(), // Rule: "Include a video search query instead of direct links"
      // For MCQ
      question: z.string().optional(),
      options: z.array(z.string()).optional(),
      answer: z.number().optional(), // 0-indexed integer
      explanation: z.string().optional(), // Rule: "including an explanation for the correct answer"
    })
  ),
});

// Schema for the main Course outline
const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  modules: z.array(
    z.object({
      title: z.string(),
      lessons: z.array(z.string()), // Array of lesson titles
    })
  ),
});

// ---------------- GENERATORS ----------------

/**
 * Generates a full course outline.
 * Follows Milestone 8: "generateCoursePrompt"
 */
export async function generateCoursePrompt(topic) {
  const prompt = `
  Create a comprehensive course outline for the topic: "${topic}".
  The curriculum must progress logically from foundational concepts to more advanced subtopics.
  The response must be valid JSON matching the schema.
  Include a course title, a brief description, relevant tags, and 3-5 modules.
  Each module must contain 3-5 lesson titles (as strings).
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(courseSchema),
      },
    });

    const json = JSON.parse(result.response.text());
    return json;
  } catch (err) {
    console.error("❌ Gemini structured output error:", err);
    throw new Error("Failed to generate structured course JSON");
  }
}

/**
 * Generates detailed content for a single lesson.
 * Follows Milestone 8: "generateLessonPrompt"
 */
export async function generateLessonPrompt(course, module, lesson) {
  const prompt = `
  Create a detailed lesson for:
  Course: "${course}"
  Module: "${module}"
  Lesson: "${lesson}"

  You MUST follow these rules:
  1. The output must be raw JSON only, matching the provided schema.
  2. Include a "title" for the lesson.
  3. Include a structured "objectives" array with 2-3 learning goals (e.g., "Understand...", "Identify...").
  4. The "content" array should have a mix of block types: "heading", "paragraph", "video", and "mcq".
  5. Include a "code" block *only if* it is relevant to the lesson topic.
  6. For the "video" block, provide a "query" string for a YouTube search. DO NOT provide a URL. (e.G., { "type": "video", "query": "What is Supervised Learning" }).
  7. At the end of the lesson, include 4-5 "mcq" blocks.
  8. Each "mcq" block MUST include a "question", "options" array, the "answer" (as a 0-based index), and an "explanation" for why that answer is correct.
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(lessonSchema),
      },
    });

    const json = JSON.parse(result.response.text());
    return json;
  } catch (err) {
    console.error("❌ Gemini lesson generation error:", err);
    throw new Error("Failed to generate structured lesson JSON");
  }
}