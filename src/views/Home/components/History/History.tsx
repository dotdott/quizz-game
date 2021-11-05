import { Drawer } from "@material-ui/core";
import { Icons } from "components";
import React, { useState } from "react";
import "./styles.scss";

const History = () => {
  const [showDrawer, setShowDrawer] = useState(false);

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
            <li>Movies 05/11</li>
            <li>Movies 05/11</li>
            <li>Movies 05/11</li>
          </ol>
        </div>
      </Drawer>
    </>
  );
};

export default History;
