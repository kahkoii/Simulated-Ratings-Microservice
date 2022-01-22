import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { apiGetRatings } from "../../endpoints/ratings";
import { IRating } from "../../interfaces";
import MinifyToDate from "../../util/MinifyDateTime";

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
    <Flex overflowY="scroll">
      <Table size="sm" borderRadius="12px">
        <Thead>
          <Tr>
            <Th>Rating</Th>
            <Th>Rater</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ratings.map((rating) => (
            <Tr key={rating.id} id={rating.id.toString()}>
              <Td>
                <StarRatings
                  rating={rating.rating}
                  starRatedColor="blue"
                  starDimension="18px"
                  starSpacing="1px"
                  numberOfStars={5}
                />
              </Td>
              <Td>
                {rating.studentId === "" ? "Anonymous" : rating.studentId}
              </Td>
              <Td>{MinifyToDate(rating.dateTime)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default RatingsReceived;
