// client/src/pages/LessonView.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import LessonRenderer from "../components/LessonRenderer";

export default function LessonView() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const API_BASE = "http://localhost:5000/api/ai";

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`${API_BASE}/lesson/${lessonId}`);
        const data = res.data;

        if (!data.content || data.content.length === 0) {
          // Prevent duplicate toasts
          const toastId = "lesson-generation";
          if (!toast.isActive(toastId)) {
            toast({
              id: toastId,
              title: "Generating lesson content...",
              description: "Please wait while AI creates your personalized lesson ✨",
              status: "info",
              duration: 4000,
              isClosable: true,
              position: "bottom-right",
            });
          }

          const genRes = await axios.post(`${API_BASE}/generate-lesson`, {
            courseId,
            moduleId: data.module,
            lessonId,
          });

          setLesson(genRes.data.lesson);

          //  Replace the toast with success message
          toast.update(toastId, {
            title: "Lesson ready!",
            description: "AI has generated your lesson successfully ",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setLesson(data);
        }
      } catch (err) {
        console.error("Error fetching or generating lesson:", err);
        toast({
          title: "Error fetching lesson",
          description: "Something went wrong while fetching the lesson.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId, courseId, toast]);

  if (loading)
    return (
      <Box
        textAlign="center"
        py={24}
        bg="gray.900"
        color="white"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="blue.400" thickness="4px" speed="0.7s" />
        <Text mt={4} fontSize="xl" color="gray.300">
          Loading lesson...
        </Text>
      </Box>
    );

  if (!lesson)
    return (
      <Box textAlign="center" py={20}>
        <Text fontSize="lg" color="gray.400">
          Lesson not found.
        </Text>
      </Box>
    );

  return (
<Box pt={2} px={10} bg="gray.900" color="white" minH="100vh">
    <VStack align="stretch" spacing={6} width="100%">
      <LessonRenderer content={lesson} />
    </VStack>
  </Box>
  );
}
