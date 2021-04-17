import React, { memo, useState } from 'react';

type Props = {
  userData: {
    id: string,
    firstName: string,
    lastName: string
  }
};

export const UserBox = memo<Props>(({ userData }) => {
  console.log(userData)

  return(
    <>
      <span>{userData.lastName}</span>
      <span>{userData.firstName}</span>
    </>
  )
})