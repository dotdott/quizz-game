import {
  Badge,
  Checkbox,
  FormControlLabel,
  Step,
  Stepper,
} from "@material-ui/core";
import { Button } from "components";
import { useState } from "react";
import "./styles.scss";

const Questions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const mockQuestions = ["1782", "1798", "1788", "1792"];

  const handleSetNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleSetPreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  return (
    <div className="questions">
      <Stepper activeStep={1} nonLinear sx={{ width: 900 }}>
        {Array.from({ length: 10 }).map((arr, index) => (
          <Step key={index}>
            <Badge
              // color="success"
              color={`${currentQuestion === index ? "secondary" : "success"}`}
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
          <h2>
            In what year did Kentucky become the 15th state to join the union?
          </h2>
          <div className="questions__section__sub-header">
            <h3>
              Category: <span>History</span>
            </h3>
            <h3>
              Difficulty: <span>medium</span>
            </h3>
          </div>

          {mockQuestions.map((question) => (
            <div className="questions__options">
              <FormControlLabel
                label={question}
                control={
                  <Checkbox
                    checked={question === selectedQuestion}
                    onClick={() => setSelectedQuestion(question)}
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
            <Button btnClasses="_dark" btnFunction={handleSetPreviousQuestion}>
              Previous
            </Button>
          )}
          <Button btnClasses="_red" btnFunction={handleSetNextQuestion}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
