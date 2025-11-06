import { useState } from "react";
import { Box, Button, Text, VStack, RadioGroup, Radio } from "@chakra-ui/react";

export default function MCQBlock({ question, options, answer }) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);

  const isCorrect = submitted && parseInt(selected) === answer;

  return (
    <Box p={4} borderWidth={1} borderRadius="md" mb={6}>
      <Text fontWeight="bold" mb={2}>{question}</Text>
      <RadioGroup onChange={setSelected} value={selected}>
        <VStack align="start">
          {options.map((opt, i) => (
            <Radio key={i} value={i.toString()}>
              {opt}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>

      <Button mt={3} size="sm" colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>

      {submitted && (
        <Text mt={2} color={isCorrect ? "green.500" : "red.500"}>
          {isCorrect ? "Correct!" : " Incorrect!"}
        </Text>
      )}
    </Box>
  );
}
