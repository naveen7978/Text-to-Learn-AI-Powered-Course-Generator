// server/controllers/aiController.js
import { generateCoursePrompt, generateLessonPrompt } from "../services/aiService.js";

export const generateCourse = async (req, res) => {
  try {
    const { topic } = req.body;
    const data = await generateCoursePrompt(topic);
    res.json(data);
  } catch (err) {
    console.error("❌ Controller Error:", err.message);
    res.status(500).json({ error: "Failed to generate course" });
  }
};

export const generateLesson = async (req, res) => {
  try {
    const { course, module, lesson } = req.body;
    const data = await generateLessonPrompt(course, module, lesson);
    res.json(data);
  } catch (err) {
    console.error("❌ Controller Error:", err.message);
    res.status(500).json({ error: "Failed to generate lesson" });
  }
};
