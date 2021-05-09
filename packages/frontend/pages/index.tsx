import React, { memo, useState } from "react";

import Head from "next/head";
import { InferGetServerSidePropsType } from "next";

import { client } from "@/graphql/client";
import {
  Query,
  UsersDocument,
  AllTasksDocument,
  useUsersQuery,
  useTaskByUserIdQuery,
  useAllTasksQuery,
} from "@/graphql/generated";
import { css } from "@emotion/core";

import { UserList } from "@/components/organisms/UserList";
import { Modal } from "@/components/templates/Modal";
import { AddUser } from "@/components/organisms/AddUser";
import { AddTask } from "@/components/organisms/AddTask";
import { TaskList } from "@/components/organisms/TaskList";
import { Button } from "@/components/atoms/Button";

export const getServerSideProps = async () => {
  const process = [
    client.query<Query>({
      query: UsersDocument,
    }),
    client.query<Query>({
      query: AllTasksDocument,
    }),
  ];
  return Promise.all(process).then(([userResult, taskResult]) => {
    return {
      props: {
        initUsersData: userResult.data,
        initTasksData: taskResult.data,
      },
    };
  });
};

export default memo<InferGetServerSidePropsType<typeof getServerSideProps>>(({ initUsersData, initTasksData }) => {
  const { data: userQuery, refetch: userRefetch } = useUsersQuery();
  const { data: tasksByUserIdQuery, refetch: tasksRefetch } = useTaskByUserIdQuery({});
  const { data: allTasksQuery, refetch: allTasksRefetch } = useAllTasksQuery();
  const userData = userQuery ? userQuery.users : initUsersData.users;
  const allTaskData = allTasksQuery ? allTasksQuery.tasks : initTasksData.tasks;
  const taskData = tasksByUserIdQuery ? tasksByUserIdQuery.taskByUserId : allTaskData;

  const [isAddUserModal, setAddUserModal] = useState(false);
  const [isAddTaskModal, setAddTaskModal] = useState(false);
  const [activeUserId, setActiveUserId] = useState(userData[0].id);
  const isModalOpen = isAddUserModal || isAddTaskModal;

  const getActiveUserName = () => {
    const userObj = userData.find((user) => activeUserId === user.id);

    if (userObj === undefined) throw new TypeError("データはありません。");

    return userObj.lastName + userObj.firstName;
  };

  const handleAddUserClick = () => setAddUserModal(!isAddUserModal);
  const handleModalClose = () => {
    if (isAddUserModal) setAddUserModal(false);
    if (isAddTaskModal) setAddTaskModal(false);
  };
  const handleAddUser = () => userRefetch().then(() => setAddUserModal(!isAddUserModal));
  const handleAddTask = () => tasksRefetch().then(() => setAddTaskModal(!isAddTaskModal));
  const handleAddTaskClick = () => setAddTaskModal(true);
  const handleUserSelect = async (userId: string) => {
    setActiveUserId(userId);
    await tasksRefetch({ userId });
  };

  return (
    <div>
      <Head>
        <title>Nest Next TODO Sample</title>
      </Head>
      <div css={container}>
        <aside css={aside}>
          <UserList activeUserId={activeUserId} userData={userData} onClick={handleUserSelect} />
          <Button onClick={handleAddUserClick}>ユーザー追加</Button>
        </aside>
        <main css={main}>
          <div>
            <div>{getActiveUserName()}</div>
            <TaskList taskList={taskData}></TaskList>
            <Button onClick={handleAddTaskClick}>タスク追加</Button>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          {isAddUserModal && <AddUser onAddUser={handleAddUser} />}
          {isAddTaskModal && <AddTask onAddTask={handleAddTask} />}
        </Modal>
      )}
    </div>
  );
});

const container = css({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  margin: "auto",
  maxWidth: "960px",
  width: "100%",
  minHeight: "100vh",
});

const main = css({
  paddingLeft: "30px",
  width: "70%",
});

const aside = css({
  width: "30%",
});
