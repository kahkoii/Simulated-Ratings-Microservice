interface Feedback {
  id: number;
  studentId: string;
  target: string;
  targetId: string;
  dateTime: string;
  anonymous: boolean;
}

export interface IComment extends Feedback {
  comment: string;
}

export interface IRating extends Feedback {
  rating: number;
}
