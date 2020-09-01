import {AppReducer} from '@redux/App/types';

const initialState: AppReducer = {
  user: {} as User,
  isLogin: false,
  accessToken: ''
};

export const app = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
