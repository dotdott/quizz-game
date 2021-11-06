import {
  Badge,
  Checkbox,
  FormControlLabel,
  Step,
  Stepper,
} from "@material-ui/core";

import { Button, LoadingScreen } from "components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { IAnswersState, Types } from "store/reducers/answersReducer";
import { IQuestionsState } from "store/reducers/questionsReducer";

import "./styles.scss";

const Questions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const history = useHistory();
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector(
    (state: IQuestionsState) => state.stateQuestions
  );

  const { answers } = useSelector((state: IAnswersState) => state.stateAnswers);

  const question = data && data[currentQuestion];

  const handleSetNextQuestion = () => {
    if (selectedQuestion === "") return;

    if (question && data && data.length !== currentQuestion) {
      const answersFormatted = Object.assign(
        {
          id: currentQuestion,
          selected_question: selectedQuestion,
        },
        question
      );

      dispatch({
        type: Types.SET_ANSWERS,
        answer: answersFormatted,
      });

      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleSetPreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
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

  return (
    <div className="questions">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Stepper activeStep={1} nonLinear sx={{ width: 900 }}>
            {data &&
              data.length > 0 &&
              Array.from({ length: data.length }).map((arr, index) => (
                <Step key={index}>
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
              <Button btnClasses="_red" btnFunction={handleSetNextQuestion}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Questions;
