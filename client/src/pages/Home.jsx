import { Box, Heading, Text, Button, VStack, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Flex
      direction="column"
      align={{ base: "center", md: "flex-start" }}
      justify="center"
      w="100%"
      h="100%"
      px={{ base: 2, md: 8 }}
      py={{ base: 6, md: 10 }}
      bg="gray.50"
    >
      <Heading
        size="2xl"
        bgGradient="linear(to-r, blue.500, teal.400)"
        bgClip="text"
        mb={4}
      >
        Welcome to Text-to-Learn
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
        Instantly turn any topic into a structured, multi-module online course
        with AI-generated lessons, code examples, and quizzes.
      </Text>
      <Link to="/courses/1">
        <Button
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          px={6}
          _hover={{ transform: "scale(1.05)" }}
          transition="all 0.2s"
        >
          🚀 View Sample Course
        </Button>
      </Link>
    </Flex>
  );
}
