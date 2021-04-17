import React, { memo, useState } from 'react';

import { UserBox } from '@/components/molecules/UserBox'

type Props = {
  userData: {
    id: string,
    firstName: string,
    lastName: string
  }[]
};

export const UserList = memo<Props>(({ userData }) => {
  console.log(userData)

  return(
    <ul>
      {userData.map((user, index) =>
        <li key={index}><UserBox userData={user} /></li>
      )}
    </ul>
  )
})