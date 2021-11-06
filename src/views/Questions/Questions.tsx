import {
  Badge,
  Checkbox,
  FormControlLabel,
  Step,
  Stepper,
} from "@material-ui/core";

import { Button, LoadingScreen } from "components";
import QuizzList from "components/QuizzList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  IAnswerHistoryData,
  Types as TypesHistory,
} from "store/reducers/answerHistory";
import { IAnswersState, Types } from "store/reducers/answersReducer";
import { IQuestionsState } from "store/reducers/questionsReducer";
import { v4 as uuidv4 } from "uuid";

import "./styles.scss";

const Questions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<IAnswerHistoryData | null>(null);
  const [hasSavedResults, setHasSavedResults] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(
    (state: IQuestionsState) => state.stateQuestions
  );

  const { answers, date, total_correct } = useSelector(
    (state: IAnswersState) => state.stateAnswers
  );

  const question = data && data[currentQuestion];
  const lastQuestions =
    data && data.length > 0 ? data.length - 1 === currentQuestion : false;

  const handleSetNextQuestion = () => {
    if (selectedQuestion === "") return;
    const answersFormatted = Object.assign(
      {
        id: currentQuestion,
        selected_question: selectedQuestion,
      },
      question
    );

    // check if isnt last question, then proceed to storage answer in reducer
    // and paginate to next question.
    if (question && data && !lastQuestions) {
      dispatch({
        type: Types.SET_ANSWERS,
        answer: answersFormatted,
      });

      return setCurrentQuestion((prev) => prev + 1);
    }

    if (lastQuestions) {
      const formattedLastData: IAnswerHistoryData = {
        id: uuidv4(),
        date,
        total_correct:
          selectedQuestion === question?.correct_answer
            ? total_correct + 1
            : total_correct,
        answers: [...answers, answersFormatted],
      };

      return setResults(formattedLastData);
    }
  };

  const handleSetPreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSaveHistory = () => {
    if (hasSavedResults || results === null) return;

    dispatch({
      type: TypesHistory.SET_ANSWER_HISTORY,
      answer_history: results,
    });

    return setHasSavedResults(true);
  };

  useEffect(() => {
    if (answers.some((answer) => answer.id === currentQuestion)) {
      const questionsAlreadedAnswered = answers.filter(
        (answer) => answer.id === currentQuestion
      );

      return setSelectedQuestion(
        questionsAlreadedAnswered[0].selected_question
      );
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (data && !isLoading) {
      if (data.length === 0) return history.push("/");
    }
  }, [data]);

  return (
    <div className="questions bg-color">
      {isLoading ? (
        <LoadingScreen />
      ) : results === null ? (
        <>
          <Stepper activeStep={currentQuestion} nonLinear sx={{ width: 900 }}>
            {data &&
              data.length > 0 &&
              Array.from({ length: data.length }).map((arr, index) => (
                <Step key={index + 1}>
                  <Badge
                    color={`${
                      currentQuestion === index ? "secondary" : "success"
                    }`}
                    overlap="circular"
                    badgeContent={index + 1}
                    className={`my_badge ${
                      currentQuestion >= index ? "true" : "false"
                    }`}
                    sx={{ mx: 1 }}
                  />
                </Step>
              ))}
          </Stepper>

          <div className="wrapper">
            <div className="questions__section">
              <h2>{question?.question}</h2>
              <div className="questions__section__sub-header">
                <h3>
                  Category: <span>{question?.category}</span>
                </h3>
                <h3>
                  Difficulty: <span>{question?.difficulty}</span>
                </h3>
              </div>

              {question &&
                question.shuffled_array.length > 0 &&
                question.shuffled_array.map((question) => (
                  <div className="questions__options" key={question}>
                    <FormControlLabel
                      label={question}
                      control={
                        <Checkbox
                          checked={question === selectedQuestion}
                          onClick={() => setSelectedQuestion(question ?? "")}
                        />
                      }
                    />
                  </div>
                ))}
            </div>

            <div
              className={`questions__navigation ${
                currentQuestion === 0 && "flexEnd"
              }`}
            >
              {currentQuestion !== 0 && (
                <Button
                  btnClasses="_dark"
                  btnFunction={handleSetPreviousQuestion}
                >
                  Previous
                </Button>
              )}
              <Button
                btnClasses={`${!lastQuestions ? "_red" : "_blue"}`}
                btnFunction={handleSetNextQuestion}
              >
                {!lastQuestions ? "Next" : "Finish"}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="questions__results">
            <span>{new Date(results.date).toLocaleDateString("BRL")}</span>
            <Button
              btnClasses="_red"
              btnExtraStyles={{ minWidth: 200 }}
              btnFunction={handleSaveHistory}
              disabled={hasSavedResults}
            >
              Save History
            </Button>
          </div>

          <QuizzList answer={results} />
        </>
      )}
    </div>
  );
};

export default Questions;
