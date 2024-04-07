export type Lover = {
  name: string;
  password: string;
  age: number;
  sex: string;
  description: string;
  hobbies: string[];
  photo: string;
  comments: Comment[];
};

export type Comment = {
  user: string;
  message: string;
};
