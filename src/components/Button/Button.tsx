import React from "react";
import "./styles.scss";
import * as MU from "@material-ui/core";

interface IButtonProps {
  btnFunction?: () => void;
  btnClasses: string;
  btnExtraStyles?: {};
  children?: React.ReactNode;
  type?: "button" | "submit";
}

const Button = ({
  btnFunction,
  btnClasses,
  btnExtraStyles,
  children,
  type = "button",
}: IButtonProps) => {
  return (
    <MU.Button
      style={btnExtraStyles}
      className={`button ${btnClasses}`}
      onClick={btnFunction}
      type={type}
    >
      {children}
    </MU.Button>
  );
};

export default Button;
