import { createActions, createReducer } from "reduxsauce";
import { IQuestionData } from "./questionsReducer";

export interface IAnswersState {
  stateQuestions: IAnswers;
}
export interface IAnswers {
  total_correct: number;
  date: string;

  answers: {
    is_correct: boolean;

    questions: IQuestionData;
  }[];
}

const INITIAL_STATE: IAnswers = {
  total_correct: 0,
  date: "",

  answers: [],
};

export const { Types, Creators } = createActions({
  setAnswers: ["answers", "total_correct", "date"],

  CleanQuestions: [],
});

const setAnswers = (state = INITIAL_STATE, action) => ({
  ...state,
  answers: action.answers,
  total_correct: action.total_correct,
  date: action.date,
});

const CleanAnswers = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_ANSWERS]: setAnswers,

  [Types.CLEAN_ANSWERS]: CleanAnswers,
});
