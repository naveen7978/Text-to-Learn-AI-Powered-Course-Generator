import { Flex, Spinner, Text, VStack, Image } from "@chakra-ui/react";

export default function LoadingScreen() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100vw"
      h="100vh"
      bgGradient="linear(to-br, blue.500, teal.400)"
      color="white"
      textAlign="center"
    >
      <VStack spacing={6}>
        {/* Optional Logo */}
        <Image
          src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
          alt="Text-to-Learn Logo"
          boxSize="90px"
          filter="drop-shadow(0 0 10px rgba(0,0,0,0.2))"
        />

        <Spinner
          thickness="5px"
          speed="0.7s"
          emptyColor="whiteAlpha.300"
          color="white"
          size="xl"
        />

        <Text fontSize="lg" fontWeight="medium" opacity="0.9">
          Loading your dashboard...
        </Text>
      </VStack>
    </Flex>
  );
}
