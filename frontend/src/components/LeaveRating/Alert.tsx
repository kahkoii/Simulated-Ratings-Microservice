import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

interface AlertProps {
  isOpen: boolean;
  onClose: VoidFunction;
  title: string;
  body: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { isOpen, onClose, title, body } = props;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={undefined}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Return</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
