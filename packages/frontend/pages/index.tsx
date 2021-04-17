import React, { memo } from "react";

import Head from 'next/head';
import { InferGetServerSidePropsType } from "next";

import { client } from '@/graphql/client';
import { Query, Document } from '@/graphql/generated'
import { css } from '@emotion/core';

import { UserList } from '@/components/organisms/UserList'

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
  backgroundColor: '#eee'
})

export const getServerSideProps = async () => {
  const { data } = await client.query<Query>({
    query: Document,
  });
  return { props: { initialData: data } };
};

export default memo<InferGetServerSidePropsType<typeof getServerSideProps>>(({ initialData }) => {
 
  return (
    <div>
      <Head>
        <title>Nest Next TODO Sample</title>
      </Head>
      <div css={container}>
        <aside css={aside}>
          <UserList userData={initialData.users} />
          <button type="button">ユーザー追加</button>
        </aside>
        <main>あ</main>
      </div>
    </div>
  )
})
