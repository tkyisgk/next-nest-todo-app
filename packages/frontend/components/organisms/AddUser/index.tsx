import React, { useState } from 'react';
import { css } from '@emotion/core';

import { useAddUserMutation } from '@/graphql/generated';
import { Button } from '@/components/atoms/Button';

type InputContents = {
  lastName: string,
  firstName: string
}

export const AddUser: React.FC = (({ children }) => {
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

    alert('登録しました。')
  }

  return(
    <>
      <div>ユーザー登録</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>氏</label>
          <input type="text" name="lastName" onChange={handleInputChange} />
        </div>
        <div>
          <label>名</label>
          <input type="text" name="firstName" onChange={handleInputChange} />
        </div>
        <div>
          <Button type="submit">登録する</Button>
        </div>
      </form>
    </>
  )
})