import express from "express";
import checkJwt from "../middlewares/auth0.js";

const router = express.Router();

router.get("/me", checkJwt, async (req, res) => {
  try {
    const user = req.auth;
    res.json({
      message: "Token verified successfully! ✅",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
