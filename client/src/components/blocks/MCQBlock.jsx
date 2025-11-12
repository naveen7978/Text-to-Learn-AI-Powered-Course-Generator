import { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";

export default function MCQBlock({ question, options, answer }) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected("");
    setSubmitted(false);
  };

  const isCorrect = submitted && parseInt(selected) === answer;

  return (
    <Box
      p={6}
      mb={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="rgba(255,255,255,0.05)"
      borderColor="rgba(255,255,255,0.1)"
      boxShadow="lg"
      _hover={{ boxShadow: "xl" }}
      transition="all 0.2s ease-in-out"
    >
      <Text
 fontWeight="bold"
  mb={3}
  bgGradient="linear(to-r, cyan.300, blue.400)"
  bgClip="text"
  fontSize="xl"
  letterSpacing="wide"
      >
        {question}
      </Text>

      <RadioGroup onChange={setSelected} value={selected}>
        <VStack align="start" spacing={3}>
          {options.map((opt, i) => {
            const isOptionCorrect = submitted && i === answer;
            const isOptionWrong = submitted && selected == i && i !== answer;

            return (
              <Box
                key={i}
                w="100%"
                p={3}
                borderRadius="md"
                bg={
                  isOptionCorrect
                    ? "green.600"
                    : isOptionWrong
                    ? "red.600"
                    : "gray.700"
                }
                color="white"
                transition="background 0.3s ease"
              >
                <Radio value={i.toString()} colorScheme="teal">
                  {opt}
                </Radio>
              </Box>
            );
          })}
        </VStack>
      </RadioGroup>

      <HStack mt={4} spacing={3}>
        {!submitted && (
          <Button
            size="sm"
            colorScheme="teal"
            onClick={handleSubmit}
            isDisabled={!selected}
          >
            Submit
          </Button>
        )}

        {submitted && (
          <Button
            size="sm"
            bg="whiteAlpha.300"
            color="white"
            _hover={{ bg: "whiteAlpha.400" }}
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </HStack>

      {submitted && (
        <Text mt={3} fontWeight="medium" color={isCorrect ? "green.400" : "red.400"}>
          {isCorrect ? " Correct!" : " Incorrect!"}
        </Text>
      )}
    </Box>
  );
}
