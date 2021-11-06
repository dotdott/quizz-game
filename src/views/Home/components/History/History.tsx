import { Drawer } from "@material-ui/core";
import { Icons } from "components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { IAnswerHistoryState } from "store/reducers/answerHistory";
import "./styles.scss";

const History = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const history = useHistory();

  const { answer_history } = useSelector(
    (state: IAnswerHistoryState) => state.stateAnswerHistory
  );

  const handleViewHistory = (id: number | string) => {
    return history.push(`/history/${id}`);
  };

  return (
    <>
      <div className="history_wrapper" onClick={() => setShowDrawer(true)}>
        <Icons name="local_offer" />
        <p>History</p>
      </div>

      <Drawer
        open={showDrawer}
        anchor="right"
        onClose={() => setShowDrawer(false)}
      >
        <div className="drawer-items">
          <ol>
            {answer_history &&
              answer_history.length > 0 &&
              answer_history.map((answer) => (
                <li onClick={() => handleViewHistory(answer.id ?? 1)}>
                  {new Date(answer.date).toLocaleDateString("BRL")}
                </li>
              ))}
          </ol>
        </div>
      </Drawer>
    </>
  );
};

export default History;
