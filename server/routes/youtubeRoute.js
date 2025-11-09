import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query.query;
    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&maxResults=3&type=video&videoEmbeddable=true&key=${apiKey}`;

    const { data } = await axios.get(url);
    const videos = data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    res.json(videos);
  } catch (error) {
    console.error("YouTube API error:", error);
    res.status(500).json({ message: "Failed to fetch YouTube videos" });
  }
});

export default router;
