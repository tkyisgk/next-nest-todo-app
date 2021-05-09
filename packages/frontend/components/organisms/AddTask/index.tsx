import React, { useState } from "react";
import { css } from "@emotion/core";

import { AddTaskInput, useAddTaskMutation } from "@/graphql/generated";
import { Button } from "@/components/atoms/Button";

type Props = {
  onAddTask: () => void;
};

export const AddTask: React.FC<Props> = ({ onAddTask }) => {
  const [values, setValues] = useState<AddTaskInput>({
    title: "",
    deadline: new Date(),
    userId: "",
  });
  const [addTaskMutation] = useAddTaskMutation();

  const handleInputChange = (event: React.BaseSyntheticEvent) => {
    setValues({
      ...values,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    let key: keyof AddTaskInput;
    for (key in values) {
      if (!values[key]) {
        alert("入力内容を確認してください。");
        return;
      }
    }

    await addTaskMutation({
      variables: {
        task: {
          title: values.title,
          deadline: values.deadline,
          userId: values.userId,
        },
      },
    });

    onAddTask();
  };

  return (
    <>
      <h3 css={head}>タスク登録</h3>
      <form css={form} onSubmit={handleSubmit}>
        <div css={formContent}>
          <label htmlFor="title">タイトル</label>
          <input id="title" type="text" name="title" onChange={handleInputChange} />
        </div>
        <div css={formContent}>
          <label htmlFor="deadline">期限</label>
          <input id="deadline" type="date" name="deadline" onChange={handleInputChange} />
        </div>
        <div css={formContent}>
          <label htmlFor="userId">担当者</label>
          <input id="userId" type="text" name="userId" onChange={handleInputChange} />
        </div>
        <div css={btnWrap}>
          <Button type="submit">登録する</Button>
        </div>
      </form>
    </>
  );
};

const head = css({
  fontSize: "20px",
  fontWeight: 700,
  textAlign: "center",
});

const form = css({
  marginTop: "30px",
});

const formContent = css({
  "&:not(:first-of-type)": {
    marginTop: "20px",
  },
  "& > label": {
    display: "inline-block",
    width: "84px",
  },
  "& > input": {
    padding: "8px 14px",
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "0px",
    "&:focus-visible": {
      borderRadius: "0px",
      outline: "none",
    },
  },
});

const btnWrap = css({
  margin: "20px auto 0",
  width: "100px",
});
