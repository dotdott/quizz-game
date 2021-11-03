/* eslint-disable no-constant-condition */

import { call, put } from "redux-saga/effects";
import { api } from "../../services/api";
import { Types } from "../reducers/questionsReducer";

export function* questionsSaga(action) {
  let data;

  const { amount_questions, category_id, difficulty } = action;

  const paramsData = new URLSearchParams();

  paramsData.append("amount", amount_questions.toString());
  paramsData.append("amount", difficulty);

  if (category_id && category_id !== "") {
    paramsData.append("amount", category_id.toString());
  }

  try {
    let response = yield call(() => {
      return api.get(`/api.php`, { params: paramsData });
    });

    data = response.data;
    yield put({ type: Types.QUESTIONS_SUCCESS, data });
  } catch (error: any) {
    yield put({
      type: Types.QUESTIONS_FAILURE,
      error: error.message,
    });
  }
}
