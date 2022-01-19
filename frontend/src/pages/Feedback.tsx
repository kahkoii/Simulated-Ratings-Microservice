import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Feedback: React.FC = () => {
  const { studentId } = useParams<{ studentId?: string }>();
  return <Flex>Student: {studentId}</Flex>;
};

export default Feedback;
