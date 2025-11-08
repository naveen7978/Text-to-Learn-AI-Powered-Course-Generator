import { Flex, Text, Avatar, Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Topbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) return null; // 👈 hide Topbar when not logged in

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="white"
      px={6}
      py={3}
      borderBottom="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Text fontSize="lg" fontWeight="bold" color="gray.700">
        Learning Dashboard
      </Text>

      <Flex align="center" gap={3}>
        <Avatar name={user?.name} src={user?.picture} size="sm" />
        <Text>{user?.given_name || user?.name}</Text>
        <Button
          size="sm"
          colorScheme="red"
          variant="solid"
          onClick={() =>
            logout({
              logoutParams: { returnTo: window.location.origin },
            })
          }
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
