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

const validModule = (moduleId: string | undefined): boolean => {
  if (moduleId === undefined) {
    return false;
  }
  return true;
};

const ClassFeedback: React.FC<{ userId: string }> = (props) => {
  const { userId } = props;
  const { classId } = useParams();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validModule(classId));
  }, []);

  return isValid ? (
    <Flex flexDir="column" width="100%" height="100%">
      <Text fontWeight="semibold" fontSize="3xl" margin="16px" marginLeft="0">
        Class{" "}
        <Text color="blue" display="inline">
          {classId}
        </Text>{" "}
        Feedback
      </Text>
      <Flex height="66vh" width="100%" gap="18px">
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
            <RatingsReceived ID={classId || ""} type="class" />
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
              target="class"
              targetId={classId || ""}
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
            <CommentsReceived ID={classId || ""} type="class" />
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
              target="class"
              targetId={classId || ""}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Text fontSize="2xl">No such class exists</Text>
  );
};

export default ClassFeedback;
