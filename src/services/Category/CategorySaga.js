import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { category as categoryActions } from './CategoryActions';

function* getCategorys({ payload }) {
  const response = yield Api.get(`/category/category-all`)

  if (response.ok) {
    yield put(categoryActions.getCategorysResponse(response.payload));
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_GET_CATEGORYS')
    yield put(categoryActions.getCategorysResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(categoryActions.getCategorys, getCategorys)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}