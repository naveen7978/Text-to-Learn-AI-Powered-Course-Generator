import { Box, Text } from "@chakra-ui/react";
import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import CodeBlock from "./blocks/CodeBlock";
import VideoBlock from "./blocks/VideoBlock";
import MCQBlock from "./blocks/MCQBlock";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function LessonRenderer({ content }) {
  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <MotionBox
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <HeadingBlock text={block.text} />
          </MotionBox>
        );

      case "paragraph":
        return (
          <MotionBox
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Text
              fontSize="lg"
              color="gray.300"
              lineHeight="taller"
              mb={4}
              textAlign="justify"
            >
              {block.text}
            </Text>
          </MotionBox>
        );

      case "code":
        return (
          <CodeBlock
            key={index}
            language={block.language}
            text={block.text || block.query}
          />
        );

      case "video":
        return (
          <MotionBox
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            textAlign="center"
          >
            <VideoBlock query={block.query || block.text || block.url} />
          </MotionBox>
        );

      case "mcq":
        return (
          <MotionBox
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <MCQBlock
              question={block.question}
              options={block.options}
              answer={block.answer}
              explanation={block.explanation}
            />
          </MotionBox>
        );

      default:
        return null;
    }
  };

  return (
    <Box p={6} maxW="900px" mx="auto">
      {content?.title && (
        <Text
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="linear(to-r, blue.400, teal.300)"
          bgClip="text"
          mb={6}
          textAlign="center"
        >
          {content.title}
        </Text>
      )}

      {content?.objectives?.length > 0 && (
        <Box my={4}>
          {content.objectives.map((obj, i) => (
            <Text key={i} color="teal.300" fontSize="lg" mb={2}>
              🎯 {obj}
            </Text>
          ))}
        </Box>
      )}

      {content?.content?.map((block, i) => renderBlock(block, i))}
    </Box>
  );
}
