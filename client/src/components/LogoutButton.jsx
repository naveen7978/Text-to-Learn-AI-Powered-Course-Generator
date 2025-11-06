import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
  );
}
