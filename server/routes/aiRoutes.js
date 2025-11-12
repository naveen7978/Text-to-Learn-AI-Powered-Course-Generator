// server/routes/aiRoutes.js
import express from "express";
import {
  generateCourse,
  generateLesson,
  getUserCourses,
  getCourseById,
} from "../controllers/aiController.js";
import Lesson from "../models/Lesson.js";

const router = express.Router();

router.post("/generate-course", generateCourse);
router.post("/generate-lesson", generateLesson);
router.get("/user/:creator", getUserCourses);
router.get("/course/:id", getCourseById);

// NEW: Fetch individual lesson
router.get("/lesson/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    return res.status(200).json(lesson);
  } catch (err) {
    console.error("Error fetching lesson:", err.stack || err.message);
    return res.status(500).json({ error: "Failed to fetch lesson" });
  }
});

export default router;
