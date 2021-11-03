/* eslint-disable no-constant-condition */

import { AxiosError } from "axios";
import { call, put } from "redux-saga/effects";
import { api } from "../../services/api";
import { Types } from "../reducers/questionsReducer";

export function* questionsSaga(action) {
  let data;

  const { amount_questions, category_id, difficulty } = action;

  try {
    let response = yield call(() => {
      return api.get(`/api.php`, {
        params: {
          amount: amount_questions,
          category: category_id,
          difficulty,
        },
      });
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
