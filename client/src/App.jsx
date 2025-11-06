import { Box, Heading, Flex, Spacer } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import FetchCourses from "./pages/FetchCourses";
import TokenTester from "./pages/TokenTester";
import TestDBPage from "./pages/TestDBPage";
import LessonTestPage from "./pages/LessonTestPage";
function App() {
  return (
    <Box p="4">
      <Flex mb="4" align="center">
        <Heading size="md">Text-to-Learn</Heading>
        <Spacer />
        <Profile />
        <LoginButton />
        <LogoutButton />
      </Flex>

      <Routes>
         {/* <Route path="/" element={<TokenTester />} />  */}
         <Route path="/" element={<TestDBPage />} />
         <Route path="/lesson/test" element={<LessonTestPage />} />
        {/* <Route path="/" element={<FetchCourses />} /> */}
      </Routes>
    </Box>
  );
}

export default App;
