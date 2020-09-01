export const LOGIN = 'APP/LOGIN';
export const LOGIN_SUCCESS = 'APP/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'APP/LOGIN_ERROR';

export interface AppReducer {
  user: User;
  isLogin: boolean;
  accessToken: string;
}
