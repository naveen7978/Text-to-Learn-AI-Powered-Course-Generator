import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";

export default function AppLayout() {
  // dynamic padding: smaller for mobile, more for desktop
  const pagePadding = useBreakpointValue({ base: 4, md: 6, lg: 10 });

  return (
    <Flex h="100vh" w="100vw" bg="gray.50" overflow="hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main section */}
      <Flex
        direction="column"
        flex="1"
        w="100%"
        overflow="hidden"
        bg="white"
        borderLeft="1px solid"
        borderColor="gray.100"
      >
        <Topbar />
        <Box
          as="main"
          flex="1"
          w="100%"
          px={pagePadding}
          py={pagePadding}
          overflowY="auto"
          bg="gray.50"
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
