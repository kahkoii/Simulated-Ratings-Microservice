import {
  IComment,
  IRating,
  IStudentComment,
  IStudentRating,
} from "../interfaces";

const TutorCommentProcessing = (t: IComment[]): IComment[] => {
  const res: IComment[] = [];
  for (let i = 0; i < t.length; i += 1) {
    res.push(t[i]);
    res[i].id *= -1;
    res[i].commentorId = t[i].anonymous ? "" : t[i].commentorId;
    res[i].commentorType = "tutor";
  }
  return res;
};

const TutorRatingProcessing = (t: IRating[]): IRating[] => {
  const res: IRating[] = [];
  for (let i = 0; i < t.length; i += 1) {
    res.push(t[i]);
    res[i].id *= -1;
    res[i].raterId = t[i].anonymous ? "" : t[i].raterId;
    res[i].raterType = "tutor";
  }
  return res;
};

// Combine comments received from students and tutors
const CombineComments = (
  s: IStudentComment[] | undefined,
  t: IComment[] | undefined
): IComment[] => {
  let res: IComment[] = [];
  if (t !== undefined) {
    res = TutorCommentProcessing(t);
  }
  if (s !== undefined) {
    s.forEach((sc) => {
      const comment: IComment = {
        id: sc.id,
        comment: sc.comment,
        commentorId: sc.studentId,
        commentorType: "student",
        receiverId: sc.targetId,
        receiverType: sc.target,
        datetime: sc.dateTime,
        anonymous: sc.anonymous,
      };
      res.push(comment);
    });
  }
  return res;
};

// Combine ratings received from students and tutors
const CombineRatings = (
  s: IStudentRating[] | undefined,
  t: IRating[] | undefined
): IRating[] => {
  let res: IRating[] = [];
  if (t !== undefined) {
    res = TutorRatingProcessing(t);
  }
  if (s !== undefined) {
    s.forEach((sr) => {
      const rating: IRating = {
        id: sr.id,
        rating: sr.rating,
        raterId: sr.studentId,
        raterType: "student",
        receiverId: sr.targetId,
        receiverType: sr.target,
        datetime: sr.dateTime,
        anonymous: sr.anonymous,
      };
      res.push(rating);
    });
  }
  return res;
};

export { CombineComments, CombineRatings };
