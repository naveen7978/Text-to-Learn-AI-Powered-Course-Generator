import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";

export default function CourseView() {
  const { courseId } = useParams();
  const gridCols = useBreakpointValue({ base: 1, sm: 2, lg: 3 });

  const modules = [
    { title: "Introduction to AI", lessons: 3 },
    { title: "Machine Learning Basics", lessons: 4 },
    { title: "Applications of AI", lessons: 2 },
  ];

  return (
    <Box w="100%" h="100%">
      <Heading mb={6}>Course #{courseId}</Heading>

      <Grid templateColumns={`repeat(${gridCols}, 1fr)`} gap={6}>
        {modules.map((m, i) => (
          <GridItem
            key={i}
            p={6}
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
            _hover={{ boxShadow: "md", transform: "translateY(-4px)" }}
            transition="all 0.2s"
          >
            <Heading size="md" mb={2}>
              {m.title}
            </Heading>
            <Text mb={3} color="gray.500">
              {m.lessons} lessons
            </Text>
            <Button
              as={RouterLink}
              to={`/courses/${courseId}/module/${i}/lesson/0`}
              colorScheme="blue"
              size="sm"
            >
              Start Module
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
