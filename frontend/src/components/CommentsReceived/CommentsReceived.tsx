import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiGetComments } from "../../endpoints/comments";
import { IComment } from "../../interfaces";
import MinifyToDate from "../../util/MinifyDateTime";

interface Props {
  studentId: string;
}

const CommentsReceived: React.FC<Props> = (props) => {
  const { studentId } = props;
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    apiGetComments(studentId).then((res) => {
      setComments(res.data);
    });
  }, []);

  return (
    <Flex overflowY="scroll">
      <Table variant="striped" size="md" borderRadius="12px">
        <Thead>
          <Tr>
            <Th>Comment</Th>
            <Th>Commentor</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {comments.map((comment) => (
            <Tr key={comment.id} id={comment.id.toString()}>
              <Td>{comment.comment}</Td>
              <Td>
                {comment.studentId === "" ? "Anonymous" : comment.studentId}
              </Td>
              <Td>{MinifyToDate(comment.dateTime)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default CommentsReceived;
