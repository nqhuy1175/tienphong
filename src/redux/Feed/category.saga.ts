import {request} from '@libs/request';
import {loadCategoriesAction} from '@redux/Feed/categories.actions';
import {get} from 'lodash';
import {call, put, takeLatest} from 'redux-saga/effects';

function* fetchData() {
  const url = 'https://one.bibabo.vn/api/shops/menu?appId=7';
  return yield call(request, url);
}

function* loadCategories() {
  try {
    const result = yield fetchData();
    if (result.status === 1) {
      yield put(loadCategoriesAction.success(get(result, 'data', [])));
    } else {
      yield put(loadCategoriesAction.failure(result));
    }
  } catch (e) {
    yield put(loadCategoriesAction.failure(e));
  }
}

export function* watchUserLoadCategory() {
  yield takeLatest(loadCategoriesAction.request, loadCategories);
}
