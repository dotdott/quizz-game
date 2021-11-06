import QuizzList from "components/QuizzList";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IAnswerHistoryState, Types } from "store/reducers/answerHistory";
import { IAnswers } from "store/reducers/answersReducer";
import "./styles.scss";

const History = ({ answer }) => {
  const { foundedAnswers } = useSelector(
    (state: IAnswerHistoryState) => state.stateAnswerHistory
  );

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: Types.GET_ANSWER_HISTORY,
      id: id,
    });
  }, [id]);

  return (
    <div className="history">
      {foundedAnswers ? <QuizzList answer={foundedAnswers} /> : "Not found"}
    </div>
  );
};

export default History;
