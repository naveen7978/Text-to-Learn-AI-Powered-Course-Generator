// --------------------
// Load environment variables
// --------------------
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from /server directory (absolute path)
dotenv.config({ path: path.join(__dirname, ".env") });

// --------------------
//  Import dependencies
// --------------------
import express from "express";
import cors from "cors";

// --------------------
//  Import local modules
// --------------------
import { connectDB } from "./config/db.js"; // MongoDB connection
import courseRoutes from "./routes/course.js"; // Secure routes
import testRoutes from "./routes/testdb.js";   // Test routes
import aiRoutes from "./routes/aiRoutes.js"; // AI routes
import youtubeRoute from "./routes/youtubeRoute.js"; //youtube route

// --------------------
//  Initialize app
// --------------------
const app = express();

// --------------------
//  Global middlewares
// --------------------
const corsOptions = {
  origin: "http://localhost:5173", // frontend origin
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

// --------------------
// 🔗 Connect to MongoDB
// --------------------
connectDB();

// --------------------
//  Environment sanity check
// --------------------
console.log("AUTH0_DOMAIN:", process.env.AUTH0_DOMAIN);
console.log("AUTH0_AUDIENCE:", process.env.AUTH0_AUDIENCE);
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing!");
console.log("🔑 GEMINI API Key Loaded:", !!process.env.GEMINI_API_KEY);
// --------------------
//  Routes
// --------------------
app.use("/api/courses", courseRoutes); // Auth-protected endpoints
app.use("/api/testdb", testRoutes);   // Auth-protected endpoints
app.use("/api/ai",aiRoutes);
app.use("/api/youtube", youtubeRoute); 
// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello  from the Text-to-Learn Backend (MERN + Auth0 + MongoDB)");
});

// --------------------
//  Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



