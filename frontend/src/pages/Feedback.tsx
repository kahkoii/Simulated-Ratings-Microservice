import { Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingsReceived from "../components/RatingsReceived/RatingsReceived";
import CommentsReceived from "../components/CommentsReceived/CommentsReceived";
import LeaveRating from "../components/LeaveRating/LeaveRating";
import LeaveComment from "../components/LeaveComment/LeaveComment";

const Subtitle: React.FC<{ text: string }> = (prop) => (
  <Text fontWeight="medium" fontSize="lg" margin="0 0 10px 8px">
    {prop.text}
  </Text>
);

const validStudent = (studentId: string | undefined): boolean => {
  if (studentId === undefined) {
    return false;
  }
  return true;
};

const Feedback: React.FC<{ userId: string }> = (props) => {
  const { userId } = props;
  const { studentId } = useParams();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validStudent(studentId));
  }, []);

  return isValid ? (
    <Flex height="100%" width="100%" gap="18px">
      <Flex flexDir="column" height="100%" width="42%" gap="18px">
        <Flex
          flexDir="column"
          height="69%"
          bgColor="white"
          borderRadius="20px"
          boxShadow="md"
          padding="16px"
        >
          <Subtitle text="Ratings Received" />
          <RatingsReceived studentId={studentId || ""} />
        </Flex>
        <Flex
          flexDir="column"
          height="30%"
          bgColor="white"
          borderRadius="20px"
          boxShadow="md"
          padding="16px"
        >
          <Subtitle text="Leave Rating" />
          <LeaveRating
            studentId={userId}
            target="student"
            targetId={studentId || ""}
          />
        </Flex>
      </Flex>
      <Flex flexDir="column" width="58%" gap="18px">
        <Flex
          flexDir="column"
          height="69%"
          bgColor="white"
          borderRadius="20px"
          boxShadow="md"
          padding="16px"
        >
          <Subtitle text="Comments Received" />
          <CommentsReceived studentId={studentId || ""} />
        </Flex>
        <Flex
          flexDir="column"
          height="30%"
          bgColor="white"
          borderRadius="20px"
          boxShadow="md"
          padding="16px"
        >
          <Subtitle text="Leave Comment" />
          <LeaveComment
            studentId={userId}
            target="student"
            targetId={studentId || ""}
          />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Text fontSize="2xl">No such student exists</Text>
  );
};

export default Feedback;
