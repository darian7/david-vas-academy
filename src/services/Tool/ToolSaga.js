import { put, takeLatest, all } from 'redux-saga/effects'
import Api from '../../common/Api/Api'
import { tool as toolActions } from "./ToolActions"
import { stringToJson } from '../../common/utilities/stringToJson'

function* getTools() {
  const response = yield Api.get(`/tool/all`, undefined, true)
  if (response.ok) {
    yield put(toolActions.setTools(response.payload))
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_GET_TEMARY')
    yield put(toolActions.setTools(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(toolActions.getTools, getTools)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}