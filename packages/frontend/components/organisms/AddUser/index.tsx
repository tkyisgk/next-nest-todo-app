import React, { useState } from 'react';
import { css } from '@emotion/core';

import { useAddUserMutation } from '@/graphql/generated';
import { Button } from '@/components/atoms/Button';

type InputContents = {
  lastName: string
  firstName: string
}

type Props = {
  onAddUser: () => void
}

export const AddUser: React.FC<Props> = (({ children, onAddUser }) => {
  const [values, setValues] = useState<InputContents>({
    lastName: '',
    firstName: '',
  });
  const [addUserMutation] = useAddUserMutation();

  const handleInputChange = (event: React.BaseSyntheticEvent) => {
    setValues({
      ...values,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    let key: keyof InputContents
    for (key in values) {
      if (!values[key]) {
        alert('入力内容を確認してください。')
        return
      }
    }

    await addUserMutation({
      variables: {
        user: {
          firstName: values.firstName,
          lastName: values.lastName,
        }
      },
    });

    onAddUser();
  }

  return(
    <>
      <h3 css={head}>ユーザー登録</h3>
      <form css={form} onSubmit={handleSubmit}>
        <div css={formContent}>
          <label htmlFor="lastName">氏</label>
          <input id="lastName" type="text" name="lastName" onChange={handleInputChange} />
        </div>
        <div css={formContent}>
          <label htmlFor="firstName">名</label>
          <input id="firstName" type="text" name="firstName" onChange={handleInputChange} />
        </div>
        <div css={btnWrap}>
          <Button type="submit">登録する</Button>
        </div>
      </form>
    </>
  )
})

const head = css({
  fontSize: '20px',
  fontWeight: 700,
  textAlign: 'center'
})

const form = css({
  marginTop: '30px'
})

const formContent = css({
  '&:not(:first-of-type)': {
    marginTop: '20px'
  },
  '& > label': {
    display: 'inline-block',
    width: '30px'
  },
  '& > input': {
    padding: '8px 14px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '0px',
    '&:focus-visible': {
      borderRadius: '0px',
      outline: 'none'
    }
  }
})

const btnWrap = css({
  margin: '20px auto 0',
  width: '100px',
})