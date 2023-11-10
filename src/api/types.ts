export type AuthHeader = {
  token: string;
};

export type ApiError = {
  errors: string[];
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

export type SignInRequest = {
  user: {
    email: string;
    password: string;
  };
};

export type SignInBody = SignUpBody;
export type UserProfileBody = SignUpBody;
