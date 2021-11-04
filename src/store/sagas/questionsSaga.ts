/* eslint-disable no-constant-condition */

import axios from "axios";
import { call, put } from "redux-saga/effects";
import { api } from "../../services/api";
import { Types } from "../reducers/questionsReducer";

export function* questionsSaga(action) {
  let data;

  const { amount_questions, category_id, difficulty } = action;

  const paramsData = new URLSearchParams();

  paramsData.append("amount", amount_questions.toString());
  if (difficulty !== null) {
    paramsData.append("difficulty", difficulty);
  }

  if (category_id !== -1) {
    paramsData.append("category", category_id.toString());
  }

  try {
    let response = yield call(() => {
      return api.get(`/api.php`, { params: paramsData });
    });

    data = response.data.results;

    console.log(data);
    yield put({ type: Types.QUESTIONS_SUCCESS, data });
  } catch (error) {
    let message = "An Unknown Error has occurred!";

    if (error instanceof Error) message = error.message;
    if (axios.isAxiosError(error)) message = error.message;

    yield put({
      type: Types.QUESTIONS_FAILURE,
      error: message,
    });
  }
}
