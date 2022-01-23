import { Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MissingPage: React.FC = () => {
  const navigate = useNavigate();
  const prevPage = (): void => {
    navigate(-1);
  };

  return (
    <Flex
      height="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gap="8vh"
    >
      <Text fontWeight="semibold" fontSize="4xl" textAlign="center">
        The page you are looking for does not exist
      </Text>
      <Flex gap="5vw">
        <Button onClick={prevPage} size="lg" colorScheme="teal">
          Go Back
        </Button>
        <Button
          onClick={() => navigate("/feedback")}
          size="lg"
          colorScheme="teal"
        >
          Feedback Page
        </Button>
      </Flex>
    </Flex>
  );
};

export default MissingPage;
