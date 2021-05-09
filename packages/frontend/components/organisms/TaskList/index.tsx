import React from "react";
import { css } from "@emotion/core";

import { TaskModel } from "@/graphql/generated";

import { TaskBox } from "@/components/molecules/TaskBox";

type Props = {
  taskList: TaskModel[];
};

export const TaskList: React.FC<Props> = ({ taskList }) => {
  return (
    <ul css={list}>
      {taskList.map((task, index) => (
        <li key={index}>
          <TaskBox taskData={task} />
        </li>
      ))}
    </ul>
  );
};

const list = css({
  border: "1px solid #ccc",
});
