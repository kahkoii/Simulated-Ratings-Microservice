import { Flex, Text, Textarea, Checkbox, Button } from "@chakra-ui/react";
import { useState } from "react";
import { apiPostComment } from "../../endpoints/comments";
import Alert from "../LeaveRating/Alert";

interface Props {
  studentId: string;
  target: string;
  targetId: string;
}

const LeaveComment: React.FC<Props> = (props) => {
  const { studentId, target, targetId } = props;
  const [comment, setComment] = useState("");
  const [anon, setAnon] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onClose = () => setIsAlertOpen(false);

  const commentValid = (): boolean => {
    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`#^&_\[\]{};"|<>~]/;
    if (comment.match(specialChars)) {
      setErrMsg("Comment should not contain special characters.");
      return false;
    }
    if (comment === "") {
      setErrMsg("Comment should not be empty.");
      return false;
    }
    return true;
  };

  const submit = (): void => {
    if (commentValid()) {
      apiPostComment(comment, studentId, target, targetId, anon);
      window.location.reload();
    } else {
      setIsAlertOpen(true);
    }
  };

  return (
    <Flex height="100%" alignItems="center" justifyContent="space-between">
      <Flex width="500px">
        <Textarea
          resize="none"
          onChange={(t) => {
            setComment(t.target.value);
          }}
        />
      </Flex>
      <Flex>
        <Text fontWeight="semibold" marginRight="10px">
          Anonymous:{" "}
        </Text>
        <Checkbox
          size="md"
          defaultChecked={false}
          onChange={(e) => {
            setAnon(e.target.checked);
          }}
        />
      </Flex>

      <Button onClick={submit} colorScheme="green">
        Confirm
      </Button>
      <Alert
        isOpen={isAlertOpen}
        onClose={onClose}
        title="Leave Comment Failed"
        body={errMsg}
      />
    </Flex>
  );
};

export default LeaveComment;
