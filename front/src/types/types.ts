export type Step = "REPORT" | "POSTS" | "IMAGES";

export type Chat = {
  isUser: boolean;
  step?: Step;
  message?: string;
  imageList?: string[];
  dateTime?: string;
};

export type RetryType = {
  message: string;
  step: Step;
};

export type FetchType = Step | "all" | "none";
