import { Box, Code, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

export default function CodeBlock({ language, text }) {
  const toast = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Code copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box
      position="relative"
      bg="#1e1e2e" // dark background (Catppuccin mocha)
      color="#f5f5f5"
      p={5}
      borderRadius="lg"
      mb={6}
      overflowX="auto"
      border="1px solid rgba(255,255,255,0.1)"
      boxShadow="0 0 12px rgba(0,0,0,0.4)"
      fontFamily="'Fira Code', monospace"
      fontSize="sm"
    >
      {/* Copy Button */}
      <Tooltip label="Copy code" hasArrow>
        <IconButton
          icon={<CopyIcon />}
          size="sm"
          colorScheme="purple"
          position="absolute"
          top="8px"
          right="8px"
          variant="ghost"
          onClick={handleCopy}
          _hover={{ bg: "purple.700" }}
        />
      </Tooltip>

      {/* Language Label */}
      {language && (
        <Box
          position="absolute"
          top="8px"
          left="12px"
          fontSize="xs"
          color="purple.300"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {language}
        </Box>
      )}

      {/* Code Text */}
      <Code
        whiteSpace="pre"
        display="block"
        fontWeight="400"
        fontSize="md"
        color="#cdd6f4"
        bg="transparent" //  removes the white box background
        p={0}
      >
        {text}
      </Code>
    </Box>
  );
}
