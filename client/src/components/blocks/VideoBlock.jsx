import { Box } from "@chakra-ui/react";

export default function VideoBlock({ url }) {
  return (
    <Box as="iframe"
      src={url}
      width="100%"
      height="360"
      border="none"
      borderRadius="lg"
      mb={6}
      allowFullScreen
    />
  );
}
