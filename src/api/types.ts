export type ErrorObject = Record<string, string[]>;

export type ApiError = {
  errors?: ErrorObject;
};

export type SignUpRequest = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type SignUpBody = ApiError & {
  user: {
    email: string;
    username: string;
    bio: null;
    image: string;
    token: string;
  };
};
