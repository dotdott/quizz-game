import React from "react";
import "./styles.scss";
import * as MU from "@material-ui/core";

interface IButtonProps {
  btnFunction?: () => void;
  btnClasses: string;
  btnExtraStyles?: {};
  children?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}

const Button = ({
  btnFunction,
  btnClasses,
  btnExtraStyles,
  children,
  type = "button",
  disabled,
}: IButtonProps) => {
  return (
    <MU.Button
      style={btnExtraStyles}
      className={`button ${btnClasses}`}
      onClick={btnFunction}
      type={type}
      disabled={disabled}
    >
      {children}
    </MU.Button>
  );
};

export default Button;
