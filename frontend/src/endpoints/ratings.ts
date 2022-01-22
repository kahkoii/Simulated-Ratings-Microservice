import axios from "axios";
import { IRating } from "../interfaces";

const ratingsURL = "http://localhost:8131/api/v1/ratings";

const apiGetRatings = async (studentId: string) => {
  const res = await axios.get<IRating[]>(`${ratingsURL}/student/${studentId}`);
  return res;
};

const apiGetRatingsSent = async (studentId: string) => {
  const res = await axios.get(`${ratingsURL}/student/${studentId}/sent`);
  return res;
};

const apiPostRating = async (
  rating: number,
  studentId: string,
  target: string,
  targetId: string,
  anonymous = false
) => {
  const res = await axios({
    method: "post",
    url: ratingsURL,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      rating,
      studentId,
      target,
      targetId,
      anonymous,
    }),
  });
  return res;
};

const apiUpdateRating = async (
  id: number,
  rating: number,
  studentId: string,
  anonymous = false
) => {
  const res = await axios({
    method: "put",
    url: ratingsURL,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      id,
      rating,
      studentId,
      anonymous,
    }),
  });
  return res;
};

export { apiGetRatings, apiGetRatingsSent, apiPostRating, apiUpdateRating };
