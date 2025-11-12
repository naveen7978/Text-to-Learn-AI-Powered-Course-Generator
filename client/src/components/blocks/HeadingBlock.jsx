// client/src/components/blocks/HeadingBlock.jsx
import { Heading } from "@chakra-ui/react";

export default function HeadingBlock({ text }) {
  return (
    <Heading
      as="h1"
      fontSize={["xl","2xl", "3xl"]} // responsive scaling
      textAlign="center"
      color="teal.300"
      mt={2}
      mb={6}
      fontWeight="extrabold"
      letterSpacing="tight"
      lineHeight="short"
      wordBreak="break-word"
      whiteSpace="normal"
      maxW="90%"
      mx="auto" // centers even long text blocks
    >
      {text}
    </Heading>
  );
}
