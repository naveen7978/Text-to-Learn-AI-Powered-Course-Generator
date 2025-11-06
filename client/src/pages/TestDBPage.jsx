import { useState } from "react";
import { apiClient, setAuthHeader } from "../utils/api";
import { Box, Button, Input, Text, Spinner, VStack } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function TestDBPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");

  const { getAccessTokenSilently, isAuthenticated, user, isLoading } = useAuth0();

  const testDB = async () => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await apiClient.post("/testdb/add", {
        title,
        description,
        creator: user.sub,
      });

      setResult(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error(err);
      setResult("Error: " + err.message);
    }
  };

  //  Wait until Auth0 SDK finishes loading
  if (isLoading) {
    return (
      <VStack p="4" spacing="4">
        <Spinner size="xl" />
        <Text>Checking your login status...</Text>
      </VStack>
    );
  }

  //  Require authentication
  if (!isAuthenticated) {
    return (
      <Box p="4">
        <Text>Please log in to test the database connection.</Text>
      </Box>
    );
  }

  //  Logged-in user view
  return (
    <Box p="4">
      <Text fontSize="lg" mb="2">🔒 Test Secure Database Connection</Text>
      <Input
        placeholder="Course title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb="2"
      />
      <Input
        placeholder="Course description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb="2"
      />
      <Button colorScheme="teal" onClick={testDB}>
        Add Secure Course to DB
      </Button>

      {result && (
        <Box mt="4" p="3" bg="gray.100" borderRadius="md">
          <pre>{result}</pre>
        </Box>
      )}
    </Box>
  );
}
