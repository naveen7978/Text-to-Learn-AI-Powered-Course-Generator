import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, blue.500, teal.400)"
      color="white"
    >
      <Box
        bg="white"
        color="gray.800"
        p={{ base: 8, md: 12 }}
        borderRadius="2xl"
        boxShadow="2xl"
        textAlign="center"
        maxW="md"
        w="full"
      >
        <VStack spacing={6}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
            alt="Logo"
            boxSize="80px"
          />
          <Heading size="lg" color="blue.600">
             Text-to-Learn
          </Heading>
          <Text fontSize="md" color="gray.600">
           generate and explore AI-powered courses .
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            borderRadius="full"
            px={10}
            onClick={() => loginWithRedirect()}
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s ease"
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
