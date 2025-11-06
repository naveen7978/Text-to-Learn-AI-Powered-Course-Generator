import express from "express";
import Course from "../models/Course.js";
import checkJwt from "../middlewares/auth0.js";

const router = express.Router();

//  Secure this endpoint with Auth0 middleware
router.post("/add", checkJwt, async (req, res) => {
  try {
    // The token has been verified successfully here
    // req.auth contains the decoded JWT payload
    const user = req.auth; // Auth0 user info from token

    const { title, description } = req.body;
    const course = await Course.create({
      title,
      description,
      creator: user.sub, // use verified user id from token
    });

    console.log("New course added by:", user.sub);
    console.log("Course details:", course);
    res.status(201).json(course);
  } catch (err) {
    console.error(" Error adding course:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
