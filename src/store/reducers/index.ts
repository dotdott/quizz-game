import { combineReducers } from "redux";
import answerHistory from "./answerHistory";
import answersReducer from "./answersReducer";
import questionsReducer from "./questionsReducer";

const rootReducer = combineReducers({
  stateQuestions: questionsReducer,
  stateAnswers: answersReducer,
  stateAnswerHistory: answerHistory,
});

export default rootReducer;
