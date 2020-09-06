import {AppReducer} from '@redux/App/types';
import {CategoriesReducer} from '@redux/Feed/categories.reducer';

export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface GlobalState {
  app: AppReducer;
  categories: CategoriesReducer;
}
