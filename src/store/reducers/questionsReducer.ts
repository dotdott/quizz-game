import { createActions, createReducer } from "reduxsauce";

export interface IQuestions {
  data: any;

  error: string;
  category_id: number;
  amount_questions: number;
  difficulty: "easy" | "medium" | "hard";
}

const INITIAL_STATE: IQuestions = {
  data: [],

  category_id: 9,
  amount_questions: 10,
  difficulty: "easy",
  error: "",
};

export const { Types, Creators } = createActions({
  questionsRequest: ["data", "category_id"],
  questionsSuccess: ["data"],
  questionsFailure: ["data", "error"],

  CleanQuestions: [],
});

const questionsRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: true,
  data: action.data,
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
