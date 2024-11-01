export interface UserState {
  user: string | null;
  token: string | null;
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
}

export interface RegisterData {
  username: string;
  password: string;
}

export interface RegisterResponse {
  error_code: number;
  error_message: string;
  data: {
    token: string;
    username: string;
  };
  profiling?: string;
  timings?: null;
}
