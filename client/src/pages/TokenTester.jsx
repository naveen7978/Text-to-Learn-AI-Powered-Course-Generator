import { useAuth0 } from "@auth0/auth0-react";
import { apiClient, setAuthHeader } from "../utils/api";
import { Box, Button, Text } from "@chakra-ui/react";

export default function TokenTester() {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();

  // Test frontend token retrieval
  const handleTest = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("ACCESS TOKEN:", token);
      alert("Access token printed in console ");
    } catch (err) {
      console.error("Error getting token:", err);
    }
  };

  // Test backend verification
  const testBackend = async () => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      const res = await apiClient.get("/courses/me");
      console.log("Backend response:", res.data);
      alert("Backend verified successfully ");
    } catch (err) {
      console.error("Error verifying backend:", err);
      alert("Backend verification failed  (check console)");
    }
  };

  if (!isAuthenticated) {
    return <Text p="4">Please log in first.</Text>;
  }

  //  All code inside the component function
  return (
    <Box p="4">
      <Text mb="2">Welcome, {user.name}</Text>
      <Button colorScheme="teal" mr="3" onClick={handleTest}>
        Get Access Token
      </Button>
      <Button colorScheme="blue" onClick={testBackend}>
        Verify Backend
      </Button>
    </Box>
  );
}
