import axios from "axios";
import { CombineRatings } from "../util/CombineTutorFeedback";

const ratingsURL =
  process.env.NODE_ENV === "production"
    ? "http://10.31.11.11:8131/api/v1/ratings"
    : "http://localhost:8131/api/v1/ratings";

const tutorRatingsURL =
  process.env.NODE_ENV === "production"
    ? "http://10.31.11.11:8181/ratings"
    : "http://localhost:8181/ratings";

const apiGetRatings = async (studentId: string, type = "student") => {
  let resStudent;
  let resTutor;
  try {
    console.log(type);
    resStudent = await axios.get(`${ratingsURL}/${type}/${studentId}`);
  } catch (err) {
    console.error(err);
  }
  try {
    resTutor = await axios.get(`${tutorRatingsURL}/${studentId}`);
  } catch (err) {
    console.error(err);
  }
  const res = CombineRatings(resStudent?.data, resTutor?.data);
  return res;
};

const apiGetTutorRatings = async (studentId: string) => {
  const res = await axios.get(`${tutorRatingsURL}/${studentId}`);
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

export {
  apiGetRatings,
  apiGetTutorRatings,
  apiGetRatingsSent,
  apiPostRating,
  apiUpdateRating,
};
