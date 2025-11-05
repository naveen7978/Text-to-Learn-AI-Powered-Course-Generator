import { Box, Heading } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Box>
      {/* We'll add a sidebar and topbar here later, as per Milestone 7 & 149 */}
      <Heading p="4">Text-to-Learn Frontend</Heading>

      {/* This is where your pages will be rendered */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* We'll add more routes like /course/:id later */}
      </Routes>
    </Box>
  );
}

// A simple placeholder component for now
const HomePage = () => {
  return <Box p="4">Welcome to the Home Page!</Box>;
};

export default App;