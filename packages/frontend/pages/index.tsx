import React, { memo, useState } from "react";

import Head from "next/head";
import { InferGetServerSidePropsType } from "next";

import { client } from "@/graphql/client";
import { Query, UserModel, UsersDocument, useUsersQuery } from "@/graphql/generated";
import { css } from "@emotion/core";

import { UserList } from "@/components/organisms/UserList";
import { Modal } from "@/components/templates/Modal";
import { AddUser } from "@/components/organisms/AddUser";
import { Button } from "@/components/atoms/Button";

export const getServerSideProps = async () => {
  const { data } = await client.query<Query>({
    query: UsersDocument,
  });
  return { props: { initialData: data } };
};

export default memo<InferGetServerSidePropsType<typeof getServerSideProps>>(({ initialData }) => {
  const { data, refetch } = useUsersQuery();
  const userData = data ? data.users : initialData.users;

  const [isAddUserModal, setAddUserModal] = useState(false);
  const [isAddTaskModal, setAAddTaskModal] = useState(false);
  const [isActiveUserId, setActiveUserId] = useState(userData[0].id);

  const getActiveUserName = () => {
    const userObj = userData.find((user) => isActiveUserId === user.id);

    if (userObj === undefined) {
      throw new TypeError("データはありません。");
    }

    return userObj.lastName + userObj.firstName;
  };

  const handleAddUserClick = () => setAddUserModal(!isAddUserModal);
  const handleModalClose = () => setAddUserModal(false);
  const handleAddUser = () => refetch().then(() => setAddUserModal(!isAddUserModal));
  const handleUserSelect = (userId: string) => setActiveUserId(userId);

  return (
    <div>
      <Head>
        <title>Nest Next TODO Sample</title>
      </Head>
      <div css={container}>
        <aside css={aside}>
          <UserList userData={userData} onClick={handleUserSelect} />
          <Button onClick={handleAddUserClick}>ユーザー追加</Button>
        </aside>
        <main css={main}>
          <div>
            <div>{getActiveUserName()}</div>
            <Button>タスク追加</Button>
          </div>
        </main>
      </div>
      {isAddUserModal && (
        <Modal onClose={handleModalClose}>
          <AddUser onAddUser={handleAddUser} />
        </Modal>
      )}
      {isAddTaskModal && (
        <Modal onClose={handleModalClose}>
          <AddUser onAddUser={handleAddUser} />
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
