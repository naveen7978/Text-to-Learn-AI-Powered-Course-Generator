// server/controllers/aiController.js
import { generateCoursePrompt, generateLessonPrompt } from "../services/aiService.js";
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Lesson from "../models/Lesson.js";

/**
 * Generate a new course and save it (with modules + lesson titles)
 * POST /api/ai/generate-course
 */
export const generateCourse = async (req, res) => {
  try {
    const { topic, creator } = req.body;
    if (!topic || !creator)
      return res.status(400).json({ error: "Missing required fields (topic, creator)" });

    console.log(`Generating course for topic: "${topic}" by user: ${creator}`);

    // 1️ Generate structured course outline using Gemini
    const aiCourse = await generateCoursePrompt(topic);

    // 2️ Create main Course document
    const newCourse = await Course.create({
      title: aiCourse.title,
      description: aiCourse.description,
      creator,
      tags: aiCourse.tags || [],
    });

    // 3️ Create modules & lessons
    const savedModules = [];

    for (const mod of aiCourse.modules || []) {
      const lessonIds = [];

      // Create minimal Lesson docs with titles
      for (const lessonTitle of mod.lessons || []) {
        const lessonDoc = await Lesson.create({
          title: lessonTitle,
          content: [], // empty, to be generated later
          module: null, // will be set later
        });
        lessonIds.push(lessonDoc._id);
      }

      // Create the module with those lesson IDs
      const moduleDoc = await Module.create({
        title: mod.title,
        course: newCourse._id,
        lessons: lessonIds,
      });

      // Update lesson docs with the module reference
      await Lesson.updateMany({ _id: { $in: lessonIds } }, { module: moduleDoc._id });

      savedModules.push(moduleDoc._id);
    }

    // 4️ Link modules to the course
    newCourse.modules = savedModules;
    await newCourse.save();

    console.log(`Course "${newCourse.title}" saved with ${savedModules.length} modules.`);

    // 5️ Return populated course
    const populatedCourse = await Course.findById(newCourse._id).populate({
      path: "modules",
      populate: { path: "lessons", select: "title" },
    });

    return res.status(201).json({
      message: "Course generated and saved successfully",
      course: populatedCourse,
    });
  } catch (err) {
    console.error("Controller Error (generateCourse):", err.stack || err.message);
    return res.status(500).json({ error: "Failed to generate and save course" });
  }
};

/**
 * Generate a detailed lesson and save it
 * POST /api/ai/generate-lesson
 *
 * Body:
 * { courseId, moduleId, lessonId }
 *
 * Behavior:
 * - If lesson is already enriched, return it (idempotent).
 * - Safely parse AI content and update using findByIdAndUpdate (avoids concurrency __v issues).
 */
export const generateLesson = async (req, res) => {
  try {
    const { courseId, moduleId, lessonId } = req.body;
    if (!courseId || !moduleId || !lessonId)
      return res.status(400).json({ error: "Missing required fields (courseId, moduleId, lessonId)" });

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    // Idempotent: if already enriched, return immediately
    if (lesson.isEnriched && Array.isArray(lesson.content) && lesson.content.length > 0) {
      console.log(`Lesson "${lesson.title}" already enriched — returning existing content.`);
      return res.status(200).json({
        message: "Lesson already enriched",
        lesson,
      });
    }

    console.log(`Generating content for lesson: "${lesson.title}" (id: ${lessonId})`);

    // Generate structured lesson content from AI service
    const aiLesson = await generateLessonPrompt("Course", "Module", lesson.title);
    console.log("AI lesson generated (raw):", aiLesson && typeof aiLesson === "object" ? JSON.stringify(aiLesson).slice(0, 1000) : aiLesson);

    // Normalize/parse AI response to ensure array content
    let parsedContent = [];
    try {
      if (aiLesson && Array.isArray(aiLesson.content)) {
        parsedContent = aiLesson.content;
      } else if (aiLesson && typeof aiLesson.content === "string") {
        parsedContent = JSON.parse(aiLesson.content || "[]");
      } else if (aiLesson && aiLesson.content == null && Array.isArray(aiLesson)) {
        // If aiLesson itself is an array (rare), treat as content
        parsedContent = aiLesson;
      } else {
        parsedContent = aiLesson?.content ?? [];
      }
    } catch (parseErr) {
      console.error("Error parsing AI lesson content:", parseErr.message);
      parsedContent = [];
    }

    // Safe, concurrency-friendly update
    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { content: parsedContent, isEnriched: true },
      { new: true, runValidators: false }
    );

    if (!updatedLesson) {
      // Rare: if race condition still caused a problem
      console.error("Failed to update lesson via findByIdAndUpdate (no document returned).");
      return res.status(500).json({ error: "Failed to save generated lesson" });
    }

    console.log("Lesson saved successfully:", updatedLesson.title);
    return res.status(200).json({
      message: "Lesson content generated successfully",
      lesson: updatedLesson,
    });
  } catch (err) {
    console.error("Controller Error (generateLesson):", err.stack || err.message);
    return res.status(500).json({ error: "Failed to generate and save lesson" });
  }
};

/**
 * Fetch all courses by creator
 */
export const getUserCourses = async (req, res) => {
  try {
    const { creator } = req.params;
    if (!creator) return res.status(400).json({ error: "Missing creator ID" });

    const courses = await Course.find({ creator })
      .populate({
        path: "modules",
        populate: { path: "lessons", select: "title" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(courses);
  } catch (err) {
    console.error("Controller Error (getUserCourses):", err.stack || err.message);
    return res.status(500).json({ error: "Failed to fetch user courses" });
  }
};

/**
 * Fetch full course with lessons
 */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: "modules",
      populate: { path: "lessons", select: "title content isEnriched" },
    });

    if (!course) return res.status(404).json({ error: "Course not found" });

    return res.status(200).json(course);
  } catch (err) {
    console.error("Controller Error (getCourseById):", err.stack || err.message);
    return res.status(500).json({ error: "Failed to fetch course details" });
  }
};
