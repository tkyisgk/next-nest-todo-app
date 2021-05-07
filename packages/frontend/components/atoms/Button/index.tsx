import React from "react";

import { css } from "@emotion/core";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Button: React.FC<Props> = ({ children, type = "button", onClick }) => {
  return (
    <button type={type} css={button} onClick={onClick}>
      {children}
    </button>
  );
};

const button = css({
  display: "inline-block",
  padding: "14px 14px",
  width: "100%",
  color: "#fff",
  border: "none",
  backgroundColor: "#000",
});
