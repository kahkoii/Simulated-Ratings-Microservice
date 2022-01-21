import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiGetRatings } from "../../endpoints/ratings";
import { IRating } from "../../interfaces";

interface Props {
  studentId: string;
}

const RatingsReceived: React.FC<Props> = (props) => {
  const { studentId } = props;
  const [ratings, setRatings] = useState<IRating[]>([]);

  useEffect(() => {
    apiGetRatings(studentId).then((res) => {
      setRatings(res.data);
    });
  }, []);

  return (
    <Flex flexDir="column" bgColor="red">
      <Text>Ratings Received</Text>
      {ratings.map((rating, index) => (
        <Flex key={index}>
          <Text>ID: {rating.id}</Text>
          <Text>Rating: {rating.rating}</Text>
          <Text>
            From: {rating.studentId === "" ? "Anonymous" : rating.studentId}
          </Text>
          <Text>Date: {rating.dateTime}</Text>
          <Text>ID: {rating.id}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default RatingsReceived;
