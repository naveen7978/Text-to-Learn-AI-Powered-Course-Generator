import express from "express";
import checkJwt from "../middlewares/auth0.js";
import Course from "../models/Course.js";

const router = express.Router();

/**
 * Public route (optional)
 * You can leave this unprotected if you want to show sample data
 */
router.get("/public", (req, res) => {
  res.json({ message: "This route is public (no auth required)." });
});

/**
 *  Protected route — only Auth0-verified users can access
 * checkJwt verifies the token before running the route logic
 */
router.get("/me", checkJwt, async (req, res) => {
  try {
    const user = req.auth; // Comes from verified JWT
    res.json({
      message: "Token verified successfully ✅",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 *  Protected route — create a new course
 * Only logged-in users can create courses
 */
router.post("/create", checkJwt, async (req, res) => {
  try {
    const { title, description } = req.body;
    const creator = req.auth.sub; // Auth0 user ID

    const course = await Course.create({
      title,
      description,
      creator,
    });

    res.status(201).json({
      message: "Course created successfully!",
      course,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
