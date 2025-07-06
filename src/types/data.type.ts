export type TParticipant = {
  id: string;
  name: string;
  gender: "Male" | "Female";
  dateOfBirth?: string;
  email: string;
};

export type TParticipantList = TParticipant[];

export type TCommonResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data?: T;
};
