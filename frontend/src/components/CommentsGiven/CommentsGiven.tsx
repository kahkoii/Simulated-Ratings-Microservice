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
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { apiGetCommentsSent, apiUpdateComment } from "../../endpoints/comments";
import { IStudentComment } from "../../interfaces";
import CommentModal from "./CommentModal";
import { SortStudentCommentByDate } from "../../util/SortByDate";
import MinifyToDate from "../../util/MinifyDateTime";

interface Props {
  studentId: string;
}

const CommentsGiven: React.FC<Props> = (props) => {
  const { studentId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comments, setComments] = useState<IStudentComment[]>([]);
  const [modalId, setModalId] = useState<number>(0);
  const [modalComment, setModalComment] = useState<string>("");
  const [modalAnon, setModalAnon] = useState<boolean>(false);

  const classURL = "http://10.31.11.11:8040/viewClass";
  const moduleURL = "http://10.31.11.11:8170";

  useEffect(() => {
    apiGetCommentsSent(studentId).then((res) => {
      const c = SortStudentCommentByDate(res.data);
      setComments(c);
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
              <Td
                color="blue"
                cursor="pointer"
                onClick={() => {
                  if (comment.target === "class") {
                    window.open(`${classURL}/${comment.targetId}`);
                  } else if (comment.target === "module") {
                    window.open(`${moduleURL}?coursecode=${comment.targetId}`);
                  }
                }}
              >
                {comment.targetId}
              </Td>
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
                  onClick={() => {
                    setModalId(comment.id);
                    setModalComment(comment.comment);
                    setModalAnon(comment.anonymous);
                    onOpen();
                  }}
                  variant="ghost"
                  aria-label="Edit Comment"
                />
              </Td>
            </Tr>
          ))}
          <CommentModal
            isOpen={isOpen}
            onClose={onClose}
            modalTitle="Edit Comment"
            ogComment={modalComment}
            studentId={studentId}
            commentId={modalId}
            anon={modalAnon}
            callback={apiUpdateComment}
          />
        </Tbody>
      </Table>
    </Flex>
  );
};

export default CommentsGiven;
