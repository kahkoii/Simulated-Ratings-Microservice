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
      apiPostRating(rating, studentId, target, targetId, anon);
      window.location.reload();
    }
  };

  return (
    <Flex height="100%" padding="6px" alignItems="center">
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
      <Text fontWeight="semibold" margin="0 10px 0 60px">
        Anonymous:{" "}
      </Text>
      <Checkbox
        size="md"
        defaultChecked={false}
        onChange={(e) => {
          setAnon(e.target.checked);
        }}
      />
      <Button onClick={submit} colorScheme="green" marginLeft="56px">
        Confirm
      </Button>
    </Flex>
  );
};

export default LeaveRating;
