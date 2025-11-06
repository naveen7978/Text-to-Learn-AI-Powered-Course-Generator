import { useAuth0 } from "@auth0/auth0-react";
import { apiClient, setAuthHeader } from "../utils/api";
import { Button } from "@chakra-ui/react";

export default function FetchCourses() {
  const { getAccessTokenSilently } = useAuth0();

  const handleFetch = async () => {
    const token = await getAccessTokenSilently();
    setAuthHeader(token);
    const res = await apiClient.get("/courses/me");
    console.log(res.data);
  };

  return <Button onClick={handleFetch}>My Courses</Button>;
}
