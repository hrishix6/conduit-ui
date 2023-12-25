export interface UserInfo {
  id: number;
  verified: boolean | null;
  username: string;
  image: string | null;
  email: string;
  bio: string;
}

export interface AppState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
  userId: number;
  userName: string;
  avatar_url?: string;
}

export enum AppErrorCode {
  //SUCCESS
  NO_ERROR = 0,
  //SERVER

  //AUTH
  TOKEN_EXPIRED = 4002,
  BAD_USERID = 4003,
  BAD_CREDENTIALS = 4004,
  PENDING_VERIFICATION = 4005,
  BAD_SIGNUP = 4006,

  SERVER_NOT_REACHABLE = 5000,
  SERVER_FAILURE = 5001,
  SERVER_UNSUPPORTED_OPERATION = 5002,
}


export interface ApiResult<T> {
  data: T;
  success: boolean;
  errorCode: AppErrorCode;
}
