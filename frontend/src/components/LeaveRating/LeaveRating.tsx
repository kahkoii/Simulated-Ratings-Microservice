import { Flex, Text, Checkbox, Button } from "@chakra-ui/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { apiPostRating } from "../../endpoints/ratings";
import Alert from "./Alert";

interface Props {
  studentId: string;
  target: string;
  targetId: string;
}

const LeaveRating: React.FC<Props> = (props) => {
  const { studentId, target, targetId } = props;
  const [rating, setRating] = useState(0);
  const [anon, setAnon] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onClose = () => setIsAlertOpen(false);

  const submit = (): void => {
    if (rating === 0) {
      setIsAlertOpen(true);
    } else {
      apiPostRating(rating, studentId, target, targetId, anon).then(() =>
        window.location.reload()
      );
    }
  };

  return (
    <Flex
      height="100%"
      padding="6px"
      alignItems="center"
      justifyContent="space-around"
    >
      <Alert
        isOpen={isAlertOpen}
        onClose={onClose}
        title="Leave Rating Failed"
        body="Please select the number of stars to rate."
      />
      <StarRatings
        rating={rating}
        changeRating={(r) => {
          setRating(r);
        }}
        starRatedColor="orange"
        starHoverColor="orange"
        starDimension="36px"
        starSpacing="1px"
        numberOfStars={5}
      />
      <Flex gap="10px">
        <Text fontWeight="semibold">Anonymous: </Text>
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
    </Flex>
  );
};

export default LeaveRating;
