import { IAnswerHistoryData } from "store/reducers/answerHistory";

const QuizzList = ({ answer }: { answer: IAnswerHistoryData }) => {
  const handleCheckIfSelectedAnswerIsCorrect = (
    selectedQuestion: string,
    correctAnswer: string,
    currentQuestion: string
  ) => {
    if (
      selectedQuestion !== correctAnswer &&
      selectedQuestion === currentQuestion
    )
      return "wrong";

    if (
      currentQuestion === correctAnswer &&
      (selectedQuestion === correctAnswer || selectedQuestion !== correctAnswer)
    )
      return "correct";

    return "";
  };
  return (
    <>
      <div className="total" title="score">
        {answer.total_correct}/{answer.answers.length}
      </div>

      {answer.answers.map((item, index) => (
        <div className="history__list" key={item.id}>
          <h2>
            <span>{index + 1} - </span>
            {item.question}
          </h2>

          <div className="history__list__header">
            <h3>
              Category: <span>{item.category}</span>
            </h3>
            <h3>
              Difficulty: <span>{item.difficulty}</span>
            </h3>
          </div>

          <div className="history__list__questions">
            {item.shuffled_array.map((question, index) => (
              <p
                className={handleCheckIfSelectedAnswerIsCorrect(
                  item.selected_question,
                  item.correct_answer,
                  question
                )}
                key={index}
              >
                {item.selected_question === question && "X "}
                {question}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default QuizzList;
