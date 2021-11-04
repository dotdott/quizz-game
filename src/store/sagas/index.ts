import { all, takeLatest } from "redux-saga/effects";
import { Types as questionsTypes } from "../reducers/questionsReducer";
import { questionsSaga } from "./questionsSaga";

export default function* rootSaga() {
  yield all([takeLatest(questionsTypes.QUESTIONS_REQUEST, questionsSaga)]);
}
