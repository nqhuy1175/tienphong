import {watchUserLoadCategory} from '@redux/Feed/category.saga';
import {all} from 'redux-saga/effects';
export default function* root() {
  yield all([watchUserLoadCategory()]);
}
