import { Box } from "@chakra-ui/react";
import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import CodeBlock from "./blocks/CodeBlock";
import VideoBlock from "./blocks/VideoBlock";
import MCQBlock from "./blocks/MCQBlock";

export default function LessonRenderer({ content }) {
  console.log("LessonRenderer content:", content);

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return <HeadingBlock key={index} text={block.text} />;

      case "paragraph":
        return <ParagraphBlock key={index} text={block.text} />;

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
          <VideoBlock
            key={index}
            query={block.query || block.text || block.url}
          />
        );

      case "mcq":
        return (
          <MCQBlock
            key={index}
            question={block.question}
            options={block.options}
            answer={block.answer}
            explanation={block.explanation}
          />
        );

      default:
        return null;
    }
  };

  // ✅ Safe rendering + lesson layout
  return (
    <Box p={6} maxW="900px" mx="auto">
      {/* Lesson title */}
      {content?.title && (
        <HeadingBlock text={content.title} />
      )}

      {/* Objectives */}
      {content?.objectives?.length > 0 && (
        <Box my={4}>
          {content.objectives.map((obj, i) => (
            <ParagraphBlock key={i} text={`🎯 ${obj}`} />
          ))}
        </Box>
      )}

      {/* Content blocks */}
      {content?.content?.map((block, i) => renderBlock(block, i))}
    </Box>
  );
}
