import React from 'react';

import { css } from '@emotion/core';

const modalContainer = css({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 100
})

const modalInr = css({
  padding: '60px 80px',
  backgroundColor: '#fff'
})

export const Modal: React.FC = (({ children }) => {

  return(
    <div css={modalContainer}>
      <div css={modalInr}>{children}</div>
    </div>
  )
})