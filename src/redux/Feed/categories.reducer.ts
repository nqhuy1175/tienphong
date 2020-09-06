import {loadCategoriesAction} from '@redux/Feed/categories.actions';
import {createReducer} from 'typesafe-actions';

export interface CategoriesReducer {
  data: Category[];
  isLoading: boolean;
}

const initialState: CategoriesReducer = {
  data: [],
  isLoading: true
};

export const categories = createReducer(initialState)
  .handleAction(
    loadCategoriesAction.success,
    (state: CategoriesReducer, action: any) => ({
      ...state,
      data: action.payload,
      isLoading: false
    })
  )
  .handleAction(loadCategoriesAction.failure, (state: CategoriesReducer) => ({
    ...state,
    isLoading: false
  }));
