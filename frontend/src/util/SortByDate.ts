import {
  IComment,
  IRating,
  IStudentComment,
  IStudentRating,
} from "../interfaces";

const SortGlobalCommentByDate = (list: IComment[]): IComment[] => {
  list.sort((a, b) => {
    if (a.datetime > b.datetime) return -1;
    if (a.datetime < b.datetime) return 1;
    return 0;
  });
  return list;
};
const SortGlobalRatingByDate = (list: IRating[]): IRating[] => {
  list.sort((a, b) => {
    if (a.datetime > b.datetime) return -1;
    if (a.datetime < b.datetime) return 1;
    return 0;
  });
  return list;
};

const SortStudentCommentByDate = (
  list: IStudentComment[]
): IStudentComment[] => {
  list.sort((a, b) => {
    if (a.dateTime > b.dateTime) return -1;
    if (a.dateTime < b.dateTime) return 1;
    return 0;
  });
  return list;
};
const SortStudentRatingByDate = (list: IStudentRating[]): IStudentRating[] => {
  list.sort((a, b) => {
    if (a.dateTime > b.dateTime) return -1;
    if (a.dateTime < b.dateTime) return 1;
    return 0;
  });
  return list;
};

export {
  SortGlobalCommentByDate,
  SortGlobalRatingByDate,
  SortStudentCommentByDate,
  SortStudentRatingByDate,
};
