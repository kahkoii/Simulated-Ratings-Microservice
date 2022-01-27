import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiGetComments } from "../../endpoints/comments";
import { IComment } from "../../interfaces";
import { SortGlobalCommentByDate } from "../../util/SortByDate";
import MinifyToDate from "../../util/MinifyDateTime";

interface Props {
  studentId: string;
}

const CommentsReceived: React.FC<Props> = (props) => {
  const { studentId } = props;
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    apiGetComments(studentId).then((res) => {
      const c = SortGlobalCommentByDate(res);
      setComments(c);
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
                {comment.commentorId === "" ? "Anonymous" : comment.commentorId}
              </Td>
              <Td>{MinifyToDate(comment.datetime)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default CommentsReceived;
