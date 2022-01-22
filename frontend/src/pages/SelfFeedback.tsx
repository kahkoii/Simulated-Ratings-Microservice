import { Flex, Text } from "@chakra-ui/react";
import RatingsReceived from "../components/RatingsReceived/RatingsReceived";
import RatingsGiven from "../components/RatingsGiven/RatingsGiven";

const Subtitle: React.FC<{ text: string }> = (prop) => (
  <Text fontWeight="medium" fontSize="lg" margin="0 0 10px 8px">
    {prop.text}
  </Text>
);

const SelfFeedback: React.FC<{ studentId: string }> = (props) => {
  const { studentId } = props;
  return (
    <Flex height="100%" width="100%" gap="18px">
      <Flex flexDir="column" height="100%" width="40%" gap="10px">
        <Flex
          flexDir="column"
          height="49%"
          bgColor="white"
          borderRadius="20px"
          boxShadow="md"
          padding="16px"
        >
          <Subtitle text="Ratings Received" />
          <RatingsReceived studentId={studentId} />
        </Flex>
        <Flex
          flexDir="column"
          height="49%"
          bgColor="white"
          borderRadius="20px"
          boxShadow="md"
          padding="16px"
        >
          <Subtitle text="Ratings Given" />
          <RatingsGiven studentId={studentId} />
        </Flex>
      </Flex>
      <Flex flexDir="column" width="60%" gap="10px">
        <Flex
          flexDir="column"
          height="60%"
          bgColor="white"
          borderRadius="20px"
          boxShadow="md"
          padding="16px"
        >
          <Subtitle text="Comments Received" />
          <RatingsReceived studentId={studentId} />
        </Flex>
        <Flex
          flexDir="column"
          height="40%"
          bgColor="white"
          borderRadius="20px"
          boxShadow="md"
          padding="16px"
        >
          <Subtitle text="Comments Given" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SelfFeedback;
