import {AppReducer} from '@redux/App/types';

export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface GlobalState {
  app: AppReducer;
}
