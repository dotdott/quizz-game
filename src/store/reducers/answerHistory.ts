import { createActions, createReducer } from "reduxsauce";
import { IAnswers } from "./answersReducer";
import { IQuestionData } from "./questionsReducer";

export interface IAnswerHistoryState {
  stateAnswerHistory: IAnswerHistory;
}
export interface IAnswerHistory {
  id: number;
  answer_history: IAnswerHistoryData[];

  foundedAnswers: IAnswerHistoryData | null;
}

interface IAnswerHistoryData extends IAnswers {
  id: number | null;
}

const INITIAL_STATE: IAnswerHistory = {
  id: -1,
  answer_history: [],

  foundedAnswers: null,
};

export const { Types, Creators } = createActions({
  setAnswerHistory: ["answers", "total_correct", "id"],

  getAnswerHistory: ["id", "foundedAnswers"],
  cleanAnswerHistory: [],
});

const setAnswerHistory = (state = INITIAL_STATE, action) => ({
  ...state,
  answer_history: action.answer_history,
});

const getAnswerHistory = (state = INITIAL_STATE, action) => {
  const { id } = action;

  const filteredAnswer = state.answer_history.filter(
    (history) => history.id === id
  );

  return {
    ...state,
    foundedAnswers: filteredAnswer[0],
  };
};

const cleanAnswerHistory = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_ANSWER_HISTORY]: setAnswerHistory,
  [Types.GET_ANSWER_HISTORY]: getAnswerHistory,

  [Types.CLEAN_ANSWER_HISTORY]: cleanAnswerHistory,
});
