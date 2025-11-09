import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Spinner, Text } from "@chakra-ui/react";

export default function VideoBlock({ query }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/youtube?query=${encodeURIComponent(query)}`
        );
        setVideos(res.data || []);
      } catch (err) {
        console.error("Error fetching videos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query]);

  if (loading)
    return (
      <Box textAlign="center" my={6}>
        <Spinner size="lg" color="blue.500" />
        <Text mt={2} color="gray.500">
          Loading videos...
        </Text>
      </Box>
    );

  if (!videos.length)
    return (
      <Text my={6} textAlign="center" color="gray.400">
        No videos found for “{query}”
      </Text>
    );

  return (
    <Box my={8}>
      {videos.map((v, i) => (
        <Box
          key={v.videoId || i}
          mb={8}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          _hover={{ boxShadow: "xl", transform: "scale(1.01)" }}
          transition="all 0.2s ease-in-out"
        >
          <Box
            as="iframe"
            width="100%"
            height={{ base: "220px", sm: "320px", md: "420px" }}
            src={`https://www.youtube.com/embed/${v.videoId}`}
            title={v.title}
            allowFullScreen
            border="0"
          />
          <Text p={3} fontSize="sm" color="gray.600" bg="gray.50">
            🎥 {v.title}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
