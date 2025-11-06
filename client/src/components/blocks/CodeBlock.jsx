import { Box, Code } from "@chakra-ui/react";

export default function CodeBlock({ language, text }) {
  return (
    <Box bg="gray.900" color="white" p={4} borderRadius="md" mb={4} overflowX="auto">
      <Code whiteSpace="pre" fontSize="sm">
        {text}
      </Code>
    </Box>
  );
}
