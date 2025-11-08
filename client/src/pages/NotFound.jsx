import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box textAlign="center" py={20}>
      <VStack spacing={5}>
        <Heading size="2xl" color="blue.500">
          404 – Page Not Found
        </Heading>
        <Text color="gray.600">
          Oops! The page you’re looking for doesn’t exist or was moved.
        </Text>
        <Link to="/">
          <Button colorScheme="blue" borderRadius="full">
            Go Back Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}
