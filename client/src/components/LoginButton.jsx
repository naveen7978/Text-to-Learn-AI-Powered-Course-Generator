import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (isAuthenticated) return null;
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
}
