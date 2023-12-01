export type AuthHeader = {
  token: string;
};

export type ErrorResponse = {
  errors: string[] | { body: string[] };
};

export type SignUpRequest = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type SignUpResponseBody = ErrorResponse & {
  user: {
    email: string;
    username: string;
    bio: null;
    image: string;
    token: string;
  };
};

export type SignInRequest = {
  user: {
    email: string;
    password: string;
  };
};

export type SignInResponseBody = SignUpResponseBody;
export type UserProfileResponseBody = SignUpResponseBody;
