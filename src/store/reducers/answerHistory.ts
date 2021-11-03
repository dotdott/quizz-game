import { createActions, createReducer } from "reduxsauce";
import { IAnswers } from "./answersReducer";
import { IQuestionData } from "./questionsReducer";

export interface IAnswerHistoryState {
  stateQuestions: IAnswers;
}
export interface IAnswerHistory {
  answer_history: IAnswers[];
}

const INITIAL_STATE: IAnswerHistory = {
  answer_history: [],
};

export const { Types, Creators } = createActions({
  setAnswerHistory: ["answers", "total_correct"],

  cleanAnswerHistory: [],
});

const setAnswerHistory = (state = INITIAL_STATE, action) => ({
  ...state,
  data: action.data,
});

const cleanAnswerHistory = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_ANSWER_HISTORY]: setAnswerHistory,

  [Types.CLEAN_ANSWER_HISTORY]: cleanAnswerHistory,
});
