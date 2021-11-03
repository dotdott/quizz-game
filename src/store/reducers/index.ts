import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";

const rootReducer = combineReducers({
  stateQuestions: questionsReducer,
});

export default rootReducer;
