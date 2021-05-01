import React from 'react';

import { css } from '@emotion/core';

type Props = {
  children: React.ReactNode
  onClose: () => void
}

export const Modal: React.FC<Props> = (({ children, onClose }) => {

  const handleCloseClick = () => onClose()

  return(
    <div css={modalContainer}>
      <div css={modalInr}>
        <button type="button" css={modalClose} onClick={handleCloseClick}>
          <span />
          <span />
        </button>
        <div css={modalContent}>{children}</div>
      </div>
    </div>
  )
})

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
  position: 'relative'
})

const modalClose = css({
  position: 'absolute',
  top: '-40px',
  right: '-40px',
  width: '40px',
  height: '40px',
  backgroundColor: 'transparent',
  '& > span': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '30px',
    height: '3px',
    backgroundColor: '#FFF'
  },
  '& > span:nth-of-type(1)': {
    transform: 'translate(-50%, -50%) rotate(45deg)'
  },
  '& > span:nth-of-type(2)': {
    transform: 'translate(-50%, -50%) rotate(-45deg)'
  }
})

const modalContent = css({
  padding: '60px 80px',
  backgroundColor: '#fff'
})