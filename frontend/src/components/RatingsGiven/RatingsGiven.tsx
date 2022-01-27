import {
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { apiGetRatingsSent, apiUpdateRating } from "../../endpoints/ratings";
import { IStudentRating } from "../../interfaces";
import MinifyToDate from "../../util/MinifyDateTime";

interface Props {
  studentId: string;
}

const RatingsGiven: React.FC<Props> = (props) => {
  const { studentId } = props;
  const [ratings, setRatings] = useState<IStudentRating[]>([]);

  useEffect(() => {
    apiGetRatingsSent(studentId).then((res) => {
      setRatings(res.data);
    });
  }, []);

  return (
    <Flex overflowY="scroll">
      <Table size="sm" borderRadius="12px">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Target</Th>
            <Th>Date</Th>
            <Th>Rating</Th>
            <Th>Anon</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ratings.map((rating) => (
            <Tr key={rating.id} id={rating.id.toString()}>
              <Td>{rating.target}</Td>
              <Td>{rating.targetId}</Td>
              <Td>{MinifyToDate(rating.dateTime)}</Td>
              <Td>
                <StarRatings
                  rating={rating.rating}
                  changeRating={(r) => {
                    apiUpdateRating(rating.id, r, studentId);
                    window.location.reload();
                  }}
                  starRatedColor="blue"
                  starHoverColor="orange"
                  starDimension="18px"
                  starSpacing="1px"
                  numberOfStars={5}
                />
              </Td>
              <Td paddingLeft="26px">
                <Checkbox
                  defaultChecked={rating.anonymous}
                  onChange={(e) => {
                    apiUpdateRating(
                      rating.id,
                      rating.rating,
                      studentId,
                      e.target.checked
                    );
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default RatingsGiven;
