import { Box, Avatar, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <Box display="flex" alignItems="center" p="2">
      <Avatar src={user.picture} name={user.name} size="sm" mr="2" />
      <Text>{user.name}</Text>
    </Box>
  );
}
