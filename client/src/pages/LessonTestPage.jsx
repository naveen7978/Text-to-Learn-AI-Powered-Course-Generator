// src/pages/LessonTestPage.jsx
import LessonRenderer from "../components/LessonRenderer";

const sampleLesson = [
  { type: "heading", text: "Introduction to AI" },
  { type: "paragraph", text: "Artificial intelligence (AI) is a rapidly evolving field focused on building intelligent systems." },
  { type: "code", language: "python", text: "print('Hello, AI!')" },
  { type: "video", url: "https://www.youtube.com/embed/2ePf9rue1Ao" },
  {
    type: "mcq",
    question: "What is AI?",
    options: ["A type of robot", "A field of computer science", "A programming language"],
    answer: 1,
  },
];

export default function LessonTestPage() {
  return <LessonRenderer content={sampleLesson} />;
}
