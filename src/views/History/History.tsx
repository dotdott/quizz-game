import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IAnswerHistoryState, Types } from "store/reducers/answerHistory";
import "./styles.scss";

const History = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { foundedAnswers } = useSelector(
    (state: IAnswerHistoryState) => state.stateAnswerHistory
  );

  useEffect(() => {
    dispatch({
      type: Types.GET_ANSWER_HISTORY,
      id: id,
    });
  }, [id]);

  return (
    <div className="history">
      <div className="total" title="score">
        2/5
      </div>

      {Array.from({ length: 5 }).map((arr, index) => (
        <div className="history__list">
          <h2>
            <span>{index + 1} - </span>
            Question name
          </h2>

          <div className="history__list__header">
            <h3>
              Category: <span>cat 1111</span>
            </h3>
            <h3>
              Difficulty: <span>difff 1111</span>
            </h3>
          </div>

          <div className="history__list__questions">
            <p className="correct">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              dolore cumque eligendi facere ad placeat deleniti
            </p>
            <p className="wrong">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              dolore cumque eligendi facere ad placeat deleniti
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              dolore cumque eligendi facere ad placeat deleniti
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
