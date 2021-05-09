import React from "react";
import { css } from "@emotion/core";

import { TaskModel } from "@/graphql/generated";
import { dateFormat } from "@/utils";

type Props = {
  taskData: TaskModel;
};

export const TaskBox: React.FC<Props> = ({ taskData }) => {
  return (
    <div css={wrap}>
      <h3 css={name}>{taskData.title}</h3>
      <span>{dateFormat(taskData.deadline)}</span>
    </div>
  );
};

const wrap = css({
  display: "flex",
  padding: "8px 14px",
});

const name = css({
  width: "50%",
  fontSize: "1.8rem",
  fontWeight: 700,
});
