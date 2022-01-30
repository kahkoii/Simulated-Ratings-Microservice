import { Flex, Text } from "@chakra-ui/react";
import RatingsReceived from "../components/RatingsReceived/RatingsReceived";
import RatingsGiven from "../components/RatingsGiven/RatingsGiven";
import CommentsReceived from "../components/CommentsReceived/CommentsReceived";
import CommentsGiven from "../components/CommentsGiven/CommentsGiven";

const Subtitle: React.FC<{ text: string }> = (prop) => (
  <Text fontWeight="medium" fontSize="lg" margin="0 0 10px 8px">
    {prop.text}
  </Text>
);

const SelfFeedback: React.FC<{ studentId: string }> = (props) => {
  const { studentId } = props;
  return (
    <Flex flexDir="column" width="100%" height="100%">
      <Text fontWeight="semibold" fontSize="3xl" margin="16px" marginLeft="0">
        My Feedback
      </Text>
      <Flex height="66vh" width="100%" gap="18px">
        <Flex flexDir="column" width="42%" gap="18px">
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
        <Flex flexDir="column" width="58%" gap="18px">
          <Flex
            flexDir="column"
            height="59%"
            bgColor="white"
            borderRadius="20px"
            boxShadow="md"
            padding="16px"
          >
            <Subtitle text="Comments Received" />
            <CommentsReceived studentId={studentId} />
          </Flex>
          <Flex
            flexDir="column"
            height="39%"
            bgColor="white"
            borderRadius="20px"
            boxShadow="md"
            padding="16px"
          >
            <Subtitle text="Comments Given" />
            <CommentsGiven studentId={studentId} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SelfFeedback;
