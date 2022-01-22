import {
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { apiGetCommentsSent, apiUpdateComment } from "../../endpoints/comments";
import { IComment } from "../../interfaces";
import MinifyToDate from "../../util/MinifyDateTime";

interface Props {
  studentId: string;
}

const CommentsGiven: React.FC<Props> = (props) => {
  const { studentId } = props;
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    apiGetCommentsSent(studentId).then((res) => {
      setComments(res.data);
    });
  }, []);

  return (
    <Flex overflowY="scroll">
      <Table variant="striped" size="md" borderRadius="12px">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Target</Th>
            <Th>Date</Th>
            <Th>Comment</Th>
            <Th>Anon</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {comments.map((comment) => (
            <Tr key={comment.id} id={comment.id.toString()}>
              <Td>{comment.target}</Td>
              <Td>{comment.targetId}</Td>
              <Td>{MinifyToDate(comment.dateTime)}</Td>
              <Td>{comment.comment}</Td>
              <Td paddingLeft="34px">
                <Checkbox
                  defaultChecked={comment.anonymous}
                  onChange={(e) => {
                    apiUpdateComment(
                      comment.id,
                      comment.comment,
                      studentId,
                      e.target.checked
                    );
                  }}
                />
              </Td>
              <Td>
                <IconButton
                  icon={<BiPencil />}
                  variant="ghost"
                  aria-label="Edit Comment"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default CommentsGiven;
