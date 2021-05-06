import React from "react";
import { css } from "@emotion/core";

type Props = {
  userData: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export const UserBox: React.FC<Props> = ({ userData }) => {
  return (
    <div css={wrap}>
      <span>{userData.lastName}</span>
      <span>{userData.firstName}</span>
    </div>
  );
};

const wrap = css({
  padding: "8px 14px",
  textAlign: "center",
});
