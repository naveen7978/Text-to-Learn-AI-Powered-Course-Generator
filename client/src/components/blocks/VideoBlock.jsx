import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Spinner, Text, SimpleGrid, VStack } from "@chakra-ui/react";

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
        <Spinner size="lg" color="blue.400" />
        <Text mt={2} color="gray.400">
          Loading videos...
        </Text>
      </Box>
    );

  if (!videos.length)
    return (
      <Text my={6} textAlign="center" color="gray.500">
        No videos found for “{query}”
      </Text>
    );

  return (
    <VStack spacing={10} align="center" py={10}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        justifyItems="center"
        maxW="1200px"
        w="full"
      >
        {videos.map((v, i) => (
          <Box
            key={v.videoId || i}
            w="100%"
            maxW="550px"
            bg="gray.800"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0px 0px 20px rgba(0,0,0,0.5)"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.03)",
              boxShadow: "0px 0px 25px rgba(0,255,255,0.3)",
            }}
          >
            <Box
              as="iframe"
              width="100%"
              height="315px"
              src={`https://www.youtube.com/embed/${v.videoId}`}
              title={v.title}
              allowFullScreen
              border="0"
            />
            <Text
              p={4}
              fontSize="md"
              fontWeight="medium"
              color="teal.200"
              bg="gray.900"
              textAlign="center"
              borderTop="1px solid rgba(255,255,255,0.1)"
            >
               {v.title}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
