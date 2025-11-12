import axios from "axios";

const API_URL =  "http://localhost:5000/api/ai";

//  Generate a new AI course
export const generateCourse = async (topic, creator) => {
  const { data } = await axios.post(`${API_URL}/generate-course`, { topic, creator });
  return data.course;
};

//  Fetch all user courses
export const fetchUserCourses = async (creator) => {
  const { data } = await axios.get(`${API_URL}/user/${creator}`);
  return data;
};

//  Fetch one course (with modules + lessons)
export const fetchCourseById = async (courseId) => {
  const { data } = await axios.get(`${API_URL}/course/${courseId}`);
  return data;
};

//  Generate (and save) a lesson
export const generateLesson = async (courseId, moduleId, lessonId) => {
  const { data } = await axios.post(`${API_URL}/generate-lesson`, {
    courseId,
    moduleId,
    lessonId,
  });
  return data.lesson;
};
