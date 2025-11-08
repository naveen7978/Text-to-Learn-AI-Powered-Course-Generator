import { VStack, Box, Text, Icon, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, Layers } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/courses/1", label: "Courses", icon: BookOpen },
  { to: "/lesson/test", label: "Lessons", icon: Layers },
];

export default function Sidebar() {
  return (
    <Box
      w="240px"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      p={5}
      boxShadow="sm"
    >
      <Text
        fontWeight="bold"
        fontSize="xl"
        mb={6}
        textAlign="center"
        bgGradient="linear(to-r, blue.500, teal.400)"
        bgClip="text"
      >
        Text-to-Learn
      </Text>

      <VStack align="stretch" spacing={2}>
        {links.map(({ to, label, icon }) => (
          <NavLink key={to} to={to}>
            {({ isActive }) => (
              <Flex
                align="center"
                p={2.5}
                borderRadius="md"
                bg={isActive ? "blue.50" : "transparent"}
                color={isActive ? "blue.600" : "gray.600"}
                fontWeight={isActive ? "semibold" : "medium"}
                _hover={{ bg: "blue.50", color: "blue.600" }}
                transition="all 0.2s"
              >
                <Icon as={icon} mr={3} />
                {label}
              </Flex>
            )}
          </NavLink>
        ))}
      </VStack>
    </Box>
  );
}
