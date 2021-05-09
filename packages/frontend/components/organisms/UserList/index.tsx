import React from "react";
import { css } from "@emotion/core";

import { UserModel } from "@/graphql/generated";

import { UserBox } from "@/components/molecules/UserBox";

type User = Pick<UserModel, "id" | "firstName" | "lastName">;
type Props = {
  activeUserId: string;
  userData: User[];
  onClick: (userId: string) => void;
};

export const UserList: React.FC<Props> = ({ activeUserId, userData, onClick }) => {
  const handleBtnClick = (user: User) => {
    if (user.id === activeUserId) return;

    onClick(user.id);
  };

  return (
    <ul css={list}>
      {userData.map((user, index) => (
        <li css={item} key={index}>
          <button
            type="button"
            css={[button, activeUserId === user.id && isActive]}
            onClick={() => handleBtnClick(user)}
          >
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
});

const isActive = css({
  opacity: 0.6,
});

const button = css({
  display: "block",
  width: "100%",
});
