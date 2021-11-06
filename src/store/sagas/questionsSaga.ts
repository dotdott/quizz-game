/* eslint-disable no-constant-condition */

import axios from "axios";
import { call, put } from "redux-saga/effects";
import { api } from "../../services/api";
import { IQuestionData, Types } from "../reducers/questionsReducer";

interface IAxiosResponse {
  data: {
    results: IQuestionData[];
  };
}

export function* questionsSaga(action) {
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
    let response: IAxiosResponse = yield call(() => {
      return api.get(`/api.php`, { params: paramsData });
    });

    const formattedData = response.data.results.map((question) => {
      const fullArray = [
        question.correct_answer,
        ...question.incorrect_answers,
      ];

      const shuffledArray = fullArray.sort(() => Math.random() - 0.5);

      return {
        ...question,
        shuffled_array: shuffledArray,
      };
    });

    yield put({ type: Types.QUESTIONS_SUCCESS, data: formattedData });
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
