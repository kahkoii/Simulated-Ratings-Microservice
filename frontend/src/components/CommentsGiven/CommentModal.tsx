import {
  Textarea,
  Button,
  Text,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  modalTitle: string;
  ogComment: string;
  studentId: string;
  commentId: number;
  anon: boolean;
  callback: (
    id: number,
    comment: string,
    studentId: string,
    anonymous?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<AxiosResponse<any, any>>;
}

const CommentModal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    modalTitle,
    ogComment,
    studentId,
    commentId,
    anon,
    callback,
  } = props;
  const [isAnon, setIsAnon] = useState(anon);
  const [comment, setComment] = useState(ogComment);

  const submit = () => {
    callback(commentId, comment, studentId, isAnon);
    onClose();
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton fontSize="16px" margin="5px" />
        <ModalBody>
          <Text display="inline" marginLeft="6px">
            Anonymous:
          </Text>
          <Checkbox
            margin="4px 0 10px 6px"
            defaultChecked={anon}
            onChange={(e) => {
              setIsAnon(e.target.checked);
            }}
          />
          <Textarea
            defaultValue={ogComment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            type="text"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              submit();
            }}
            type="submit"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
