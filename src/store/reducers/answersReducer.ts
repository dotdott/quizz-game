import { createActions, createReducer } from "reduxsauce";
import { IQuestionData } from "./questionsReducer";

export interface IAnswersState {
  stateAnswers: IAnswers;
}
export interface IAnswers {
  total_correct: number;
  date: Date;

  answers: IAnswerData[];
}

export interface IAnswerData extends IQuestionData {
  id: number;
  selected_question: string;
}

const INITIAL_STATE: IAnswers = {
  total_correct: 0,
  date: new Date(),

  answers: [],
};

export const { Types, Creators } = createActions({
  setAnswers: ["answers", "total_correct"],

  CleanAnswers: [],
});

const setAnswers = (state = INITIAL_STATE, action) => {
  const { answer } = action;

  let total = state.total_correct;
  let newAnswers = [...state.answers, answer];

  const checkIfAnswersIsAlreadedInReducer = state.answers.filter(
    (item) => item.id === answer.id
  );

  if (checkIfAnswersIsAlreadedInReducer.length > 0) {
    const newValues = state.answers.map((item) => {
      if (item.id === answer.id) {
        if (answer.correct_answer === answer.selected_question) {
          total++;
        }

        if (total > 0 && answer.correct_answer !== answer.selected_question) {
          total--;
        }

        return answer;
      }

      return item;
    });

    newAnswers = newValues;
  }

  if (checkIfAnswersIsAlreadedInReducer.length === 0) {
    if (answer.correct_answer === answer.selected_question) {
      total++;
    }

    if (total > 0 && answer.correct_answer !== answer.selected_question) {
      total--;
    }
  }

  return {
    ...state,
    answers: newAnswers,
    total_correct: total,
  };
};

const CleanAnswers = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_ANSWERS]: setAnswers,

  [Types.CLEAN_ANSWERS]: CleanAnswers,
});
