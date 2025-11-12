// client/src/components/layout/Sidebar.jsx
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserCourses } from "../../utils/aiApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(() => {
    // Load the sidebar state from localStorage on mount
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved) : false; // default closed
  });
  const [courses, setCourses] = useState([]);
  const { user } = useAuth0();
  const navigate = useNavigate();

  const loadCourses = async () => {
    if (!user?.sub) return;
    try {
      const res = await fetchUserCourses(user.sub);
      setCourses(res);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    loadCourses();

    // Refresh when new course created
    window.addEventListener("courseUpdated", loadCourses);
    return () => window.removeEventListener("courseUpdated", loadCourses);
  }, [user]);

  // Save sidebar open/close state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <>
      {/* Sidebar */}
      <Box
        as="nav"
        position="relative"
        h="100vh"
        transition="all 0.3s ease"
        bgGradient="linear(to-b, gray.900, gray.800)"
        borderRight="1px solid rgba(255,255,255,0.1)"
        overflowY="auto"
        w={isOpen ? "250px" : "0px"}
        opacity={isOpen ? 1 : 0}
        pointerEvents={isOpen ? "auto" : "none"}
        zIndex="20"
      >
        <Flex direction="column" h="full" p={4} color="white">
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={4}
            color="teal.200"
            letterSpacing="wide"
          >
            Your Courses
          </Text>

          <VStack align="start" spacing={2}>
            {courses.map((course) => (
              <Button
                key={course._id}
                variant="ghost"
                justifyContent="flex-start"
                w="full"
                colorScheme="teal"
                _hover={{ bg: "whiteAlpha.200" }}
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                <BookOpen size={16} style={{ marginRight: "8px" }} />
                <Text isTruncated>{course.title}</Text>
              </Button>
            ))}
          </VStack>
        </Flex>
      </Box>

      {/* Toggle Button */}
      <IconButton
        aria-label="Toggle Sidebar"
        icon={isOpen ? <ChevronLeft /> : <ChevronRight />}
        position="absolute"
        top="50%"
        left={isOpen ? "250px" : "0"}
        transform="translateY(-50%)"
        colorScheme="blue"
        variant="solid"
        borderRadius="full"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        zIndex="30"
        transition="all 0.3s ease"
      />
    </>
  );
}
