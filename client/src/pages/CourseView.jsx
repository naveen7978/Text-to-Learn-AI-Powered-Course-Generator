// client/src/pages/CourseView.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseById } from "../utils/aiApi";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function CourseView() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [courseId]);

  if (loading)
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="lg" color="blue.400" />
        <Text mt={4}>Loading course...</Text>
      </Box>
    );

  if (!course)
    return (
      <Box textAlign="center" py={20}>
        <Text fontSize="lg">Course not found.</Text>
      </Box>
    );
// Inside return of CourseView.jsx
return (
  <Box
    p={[4, 8]}
    bgGradient="linear(to-br, gray.900, gray.800)"
    color="white"
    minH="100vh"
  >
    {/* Course Title */}
    <Heading
      size="2xl"
      mb={4}
      textAlign="center"
      bgGradient="linear(to-r, blue.400, teal.300)"
      bgClip="text"
      letterSpacing="wide"
    >
      {course.title}
    </Heading>

<Text
  fontSize={{ base: "lg", md: "xl" }}
  color="gray.300"
  textAlign="center"
  maxW="800px"
  mx="auto"
  lineHeight="taller"
  mt={4}
  mb={10}
  px={4}
  style={{
    textShadow: "0 0 15px rgba(0, 200, 255, 0.15)",
    letterSpacing: "0.3px",
  }}
  as={motion.p}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {course.description}
</Text>


    <Divider mb={10} borderColor="gray.600" />

    {/* Module Section */}
    <VStack align="stretch" spacing={8}>
      {course.modules?.map((module, mIdx) => (
        <MotionBox
          key={mIdx}
          p={6}
          borderRadius="xl"
          bg="rgba(255, 255, 255, 0.05)"
          border="1px solid rgba(255,255,255,0.1)"
          whileHover={{ scale: 1.01, background: "rgba(255,255,255,0.08)" }}
          transition="all 0.25s ease"
          shadow="xl"
        >
          <Heading
            size="md"
            color="teal.300"
            mb={5}
            fontWeight="semibold"
            letterSpacing="wide"
          >
            Module {mIdx + 1}: {module.title}
          </Heading>

          <VStack align="stretch" spacing={4}>
            {module.lessons.map((lesson, lIdx) => (
              <MotionButton
                key={lIdx}
                justifyContent="flex-start"
                textAlign="left"
                size="lg"
                fontSize="lg"
                bg="gray.700"
                color="gray.100"
                border="1px solid rgba(255,255,255,0.1)"
                borderRadius="lg"
                w="100%"
                px={6}
                py={7}
                _hover={{
                  bg: "teal.600",
                  color: "white",
                  transform: "translateX(6px)",
                  shadow: "md",
                }}
                onClick={() =>
                  navigate(`/courses/${course._id}/lesson/${lesson._id}`)
                }
                as={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: lIdx * 0.05 }}
              >
                {lesson.title}
              </MotionButton>
            ))}
          </VStack>
        </MotionBox>
      ))}
    </VStack>
  </Box>
);

  
}
