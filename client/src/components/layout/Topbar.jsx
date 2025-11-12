// client/src/components/layout/Topbar.jsx
import { Flex, Text, Button, HStack, Avatar, Box, useBreakpointValue } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Topbar() {
  const { user, logout } = useAuth0();
  const showAvatar = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      align="center"
      justify="space-between"
      bgGradient="linear(to-r, gray.900, gray.800)"
      color="white"
      px={{ base: 4, md: 8 }}
      py={4}
      borderBottom="1px solid rgba(255,255,255,0.1)"
      shadow="md"
      position="sticky"
      top="0"
      zIndex="10"
    >
      {/* Left Spacer for Centering Balance */}
      <Box w={{ base: "40px", md: "100px" }} />

      {/* Centered Title */}
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        bgGradient="linear(to-r, cyan.400, blue.300)"
        bgClip="text"
        textAlign="center"
        flex="1"
      >
        Text-to-Learn
      </Text>

      {/* Right Section - Avatar + Logout */}
      <HStack spacing={4} justify="flex-end" w={{ base: "auto", md: "150px" }}>
        {showAvatar && (
          <HStack spacing={2}>
            <Avatar size="sm" name={user?.name} src={user?.picture} />
            <Text fontSize="sm" fontWeight="medium" color="teal.200">
              {user?.name?.split(" ")[0] || "User"}
            </Text>
          </HStack>
        )}
        <Button
          colorScheme="red"
          size="sm"
          variant="solid"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}
