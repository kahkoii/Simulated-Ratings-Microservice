import { Flex, Text } from "@chakra-ui/react";
import RatingsReceived from "../components/RatingsReceived/RatingsReceived";

const SelfFeedback: React.FC<{ studentId: string }> = (props) => {
  const { studentId } = props;
  return (
    <Flex>
      <Text>My Feedback</Text>
      <RatingsReceived studentId={studentId} />
    </Flex>
  );
};

export default SelfFeedback;
