import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { apiGetRatings } from "../../endpoints/ratings";
import { IRating } from "../../interfaces";
import { SortGlobalRatingByDate } from "../../util/SortByDate";
import MinifyToDate from "../../util/MinifyDateTime";

interface Props {
  ID: string;
  type?: string;
}

const RatingsReceived: React.FC<Props> = (props) => {
  const { ID, type } = props;
  const [ratings, setRatings] = useState<IRating[]>([]);

  useEffect(() => {
    if (type === "module" || type === "class") {
      apiGetRatings(ID, type).then((res) => {
        const r = SortGlobalRatingByDate(res);
        setRatings(r);
      });
    } else {
      apiGetRatings(ID).then((res) => {
        const r = SortGlobalRatingByDate(res);
        setRatings(r);
      });
    }
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
              <Td>{rating.raterId === "" ? "Anonymous" : rating.raterId}</Td>
              <Td>{MinifyToDate(rating.datetime)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default RatingsReceived;
