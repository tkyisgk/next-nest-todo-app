import React, { memo, useState } from "react";

import Head from 'next/head';
import { InferGetServerSidePropsType } from "next";

import { client } from '@/graphql/client';
import { Query, UsersDocument, useUsersQuery } from '@/graphql/generated'
import { css } from '@emotion/core';

import { UserList } from '@/components/organisms/UserList'
import { Modal } from '@/components/templates/Modal'
import { AddUser } from '@/components/organisms/AddUser'
import { Button } from '@/components/atoms/Button'

const container = css({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: 'auto',
  maxWidth: '960px',
  width: '100%',
  minHeight: '100vh'
})

const aside = css({
  width: '30%',
})

export const getServerSideProps = async () => {
  const { data } = await client.query<Query>({
    query: UsersDocument,
  });
  return { props: { initialData: data } };
};

export default memo<InferGetServerSidePropsType<typeof getServerSideProps>>(({ initialData }) => {
  const [isAddUserModal, setAddUserModal] = useState(false);
  const { data, refetch } = useUsersQuery();
  const userData = data ? data.users : initialData.users;

  const handleAddUserClick = () => setAddUserModal(!isAddUserModal)
  const handleModalClose = () => setAddUserModal(false)
  const handleAddUser = () => refetch().then(() => setAddUserModal(!isAddUserModal))
 
  return (
    <div>
      <Head>
        <title>Nest Next TODO Sample</title>
      </Head>
      <div css={container}>
        <aside css={aside}>
          <UserList userData={userData} />
          <Button onClick={handleAddUserClick}>ユーザー追加</Button>
        </aside>
        <main>あ</main>
      </div>
      {isAddUserModal &&
        <Modal onClose={handleModalClose}>
          <AddUser onAddUser={handleAddUser} />
        </Modal>
      }
    </div>
  )
})
