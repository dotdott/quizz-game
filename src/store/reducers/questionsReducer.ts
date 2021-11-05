import { createActions, createReducer } from "reduxsauce";

export interface IQuestionsState {
  stateQuestions: IQuestions;
}
export interface IQuestions {
  data?: IQuestionData[];
  isLoading: boolean;

  error: string;
  category_id: number;
  amount_questions: number;
  difficulty: "easy" | "medium" | "hard" | null;
}

export interface IQuestionData {
  category: string;
  difficulty: string;

  question: string;

  correct_answer: string;

  incorrect_answers: string[];
}

const INITIAL_STATE: IQuestions = {
  data: [],

  category_id: -1,
  amount_questions: 10,
  difficulty: null,

  error: "",

  isLoading: false,
};

export const { Types, Creators } = createActions({
  questionsRequest: ["data", "category_id", "difficulty", "amount_questions"],
  questionsSuccess: ["data"],
  questionsFailure: ["data", "error"],

  CleanQuestions: [],
});

const questionsRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: true,
  data: action.data,
  category_id: action.category_id,
  difficulty: action.difficulty,
  amount_questions: action.amount_questions,
});

const questionsSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  data: action.data,
  error: "",
});

const questionsFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  data: [],
  error: action.data,
});

const CleanQuestions = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
};

export default createReducer(INITIAL_STATE, {
  [Types.QUESTIONS_REQUEST]: questionsRequest,
  [Types.QUESTIONS_SUCCESS]: questionsSuccess,
  [Types.QUESTIONS_FAILURE]: questionsFailure,

  [Types.CLEAN_QUESTIONS]: CleanQuestions,
});
