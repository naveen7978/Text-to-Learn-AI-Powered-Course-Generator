import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  SimpleGrid,
  Spinner,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { generateCourse, fetchUserCourses } from "../utils/aiApi";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Home() {
  const { user } = useAuth0();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.sub) {
      fetchUserCourses(user.sub)
        .then(setCourses)
        .catch(() =>
          toast({ title: "Failed to fetch saved courses", status: "error" })
        );
    }
  }, [user]);

  const handleGenerate = async () => {
    if (!topic.trim()) return toast({ title: "Enter a topic!", status: "warning" });
    setLoading(true);
    try {
      const newCourse = await generateCourse(topic, user.sub);
      setCourses((prev) => [newCourse, ...prev]);
      toast({ title: "Course generated!", status: "success" });
    } catch (err) {
      toast({ title: "Error generating course", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      w="100%"
      minH="100vh"
      bgGradient="linear(to-br, gray.900, gray.800)"
      color="white"
      p={10}
    >
      {/* Personalized Greeting */}
      <Heading
        size="2xl"
        bgGradient="linear(to-r, blue.400, teal.300)"
        bgClip="text"
        textAlign="center"
        mb={8}
      >
        {user?.name
          ? `Welcome, ${user.name.split(" ")[0]} `
          : "Welcome "}
      </Heading>

      {/* Course Generator */}
{/* Course Generator */}
<Flex justify="center" align="center" mb={14} gap={4} flexWrap="wrap">
  <Input
    placeholder="Enter a topic "
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    w={["90%", "70%", "45%"]}
    h="60px"
    fontSize="lg"
    fontWeight="medium"
    px={6}
    bg="whiteAlpha.200"
    border="1px solid rgba(255,255,255,0.2)"
    color="white"
    borderRadius="full"
    _placeholder={{ color: "gray.400", fontStyle: "italic" }}
    _focus={{
      borderColor: "blue.400",
      boxShadow: "0 0 10px rgba(66,153,225,0.6)",
    }}
  />
  <Button
    colorScheme="blue"
    onClick={handleGenerate}
    isDisabled={loading}
    h="60px"
    px={10}
    fontSize="lg"
    borderRadius="full"
    fontWeight="semibold"
    _hover={{
      transform: "scale(1.05)",
      boxShadow: "0 0 20px rgba(66,153,225,0.4)",
    }}
    transition="all 0.2s ease"
  >
    {loading ? <Spinner size="md" /> : "Generate "}
  </Button>
</Flex>


      {/* Course Cards */}
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {courses.map((course) => (
          <MotionBox
            key={course._id}
            bg="rgba(255,255,255,0.05)"
            borderRadius="2xl"
            p={6}
            textAlign="center"
            cursor="pointer"
            border="1px solid rgba(255,255,255,0.1)"
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            <Heading fontSize="lg" color="blue.300" mb={3}>
              {course.title}
            </Heading>
            <Text color="gray.400" noOfLines={3}>
              {course.description}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}
