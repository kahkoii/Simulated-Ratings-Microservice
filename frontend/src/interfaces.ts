interface StudentFeedback {
  id: number;
  studentId: string;
  target: string;
  targetId: string;
  dateTime: string;
  anonymous: boolean;
}

export interface IStudentComment extends StudentFeedback {
  comment: string;
}

export interface IStudentRating extends StudentFeedback {
  rating: number;
}

interface Feedback {
  id: number;
  receiverId: string;
  receiverType: string;
  datetime: string;
  anonymous: boolean;
}

export interface IComment extends Feedback {
  comment: string;
  commentorId: string;
  commentorType: string;
}

export interface IRating extends Feedback {
  rating: number;
  raterId: string;
  raterType: string;
}
