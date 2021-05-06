import React from "react";
import { css } from "@emotion/core";

import { UserBox } from "@/components/molecules/UserBox";

type Props = {
  userData: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
  onClick: (userId: string) => void;
};

export const UserList: React.FC<Props> = ({ userData, onClick }) => {
  return (
    <ul css={list}>
      {userData.map((user, index) => (
        <li css={item} key={index}>
          <button type="button" css={button} onClick={() => onClick(user.id)}>
            <UserBox userData={user} />
          </button>
        </li>
      ))}
    </ul>
  );
};

const list = css({
  border: "1px solid #ccc",
});
const item = css({
  position: "relative",

  // '&::after': {
  //   content: '',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: '80%',
  //   height: '1px',
  //   backgroundColor: '#ccc'
  // }
});

const button = css({
  display: "block",
  width: "100%",
});
