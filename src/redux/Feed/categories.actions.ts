import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORIES_SUCCESS
} from '@redux/Feed/types';
import {createAsyncAction} from 'typesafe-actions';

const loadCategoriesAction = createAsyncAction(
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR
)<undefined, Category[], any | undefined>();

export {loadCategoriesAction};
