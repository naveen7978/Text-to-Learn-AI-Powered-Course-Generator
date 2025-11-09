import express from "express";
import { generateCourse, generateLesson } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-course", generateCourse);
router.post("/generate-lesson", generateLesson);

export default router;
