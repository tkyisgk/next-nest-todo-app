import React, { Children } from 'react';

import { css } from '@emotion/core';

type Props = {
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const button = css({
  display: 'inline-block',
  width: '100%',
  border: 'none',
  backgroundColor: 'yellow'
})

export const Button: React.FC<Props> = (({ children, type = 'button', onClick = () => {} }) => {

  return(
    <button type={type} css={button} onClick={onClick}>{children}</button>
  )
})