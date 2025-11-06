// src/components/LessonRenderer.jsx
import { Box } from "@chakra-ui/react";
import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import CodeBlock from "./blocks/CodeBlock";
import VideoBlock from "./blocks/VideoBlock";
import MCQBlock from "./blocks/MCQBlock";

export default function LessonRenderer({ content }) {
  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return <HeadingBlock key={index} text={block.text} />;
      case "paragraph":
        return <ParagraphBlock key={index} text={block.text} />;
      case "code":
        return <CodeBlock key={index} language={block.language} text={block.text} />;
      case "video":
        return <VideoBlock key={index} url={block.url} />;
      case "mcq":
        return (
          <MCQBlock
            key={index}
            question={block.question}
            options={block.options}
            answer={block.answer}
          />
        );
      default:
        return null;
    }
  };

  return <Box p={4}>{content.map((block, i) => renderBlock(block, i))}</Box>;
}
