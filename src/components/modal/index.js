import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Container } from './styles/Modal';

const modalRoot = document.getElementById('modal');

function Modal({ isOpen, children }) {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    isOpen &&
    createPortal(
      <Container>{children}</Container>,
      // target container
      el
    )
  );
}

export default Modal;
