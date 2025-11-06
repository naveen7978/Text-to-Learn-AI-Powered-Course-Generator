import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Compute absolute path to .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") }); // ✅ ensures correct absolute path

import express from "express";
import cors from "cors";
import courseRoutes from "./routes/course.js";

const app = express();
app.use(cors());
app.use(express.json());

console.log("AUTH0_DOMAIN:", process.env.AUTH0_DOMAIN);
console.log("AUTH0_AUDIENCE:", process.env.AUTH0_AUDIENCE);

app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => res.send("Hello from the Text-to-Learn Backend (ESM)!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
