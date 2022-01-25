import axios from "axios";

const commentsURL =
  process.env.NODE_ENV === "production"
    ? "http://10.31.11.11:8131/api/v1/comments"
    : "http://localhost:8131/api/v1/comments";

const apiGetComments = async (studentId: string) => {
  const res = await axios.get(`${commentsURL}/student/${studentId}`);
  return res;
};

const apiGetCommentsSent = async (studentId: string) => {
  const res = await axios.get(`${commentsURL}/student/${studentId}/sent`);
  return res;
};

const apiPostComment = async (
  comment: string,
  studentId: string,
  target: string,
  targetId: string,
  anonymous = false
) => {
  const res = await axios({
    method: "post",
    url: commentsURL,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      comment,
      studentId,
      target,
      targetId,
      anonymous,
    }),
  });
  return res;
};

const apiUpdateComment = async (
  id: number,
  comment: string,
  studentId: string,
  anonymous = false
) => {
  const res = await axios({
    method: "put",
    url: commentsURL,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      id,
      comment,
      studentId,
      anonymous,
    }),
  });
  return res;
};

export { apiGetComments, apiGetCommentsSent, apiPostComment, apiUpdateComment };
