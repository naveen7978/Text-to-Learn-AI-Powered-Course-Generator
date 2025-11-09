import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const generateCourse = async (topic) => {
  const res = await axios.post(`${API_BASE}/api/generate-course`, { topic });
  return res.data;
};

export const generateLesson = async (courseTitle, moduleTitle, lessonTitle) => {
  const res = await axios.post(`${API_BASE}/api/generate-lesson`, {
    courseTitle,
    moduleTitle,
    lessonTitle,
  });
  return res.data;
};
