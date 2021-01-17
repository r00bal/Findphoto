import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Container, Text } from './styles/Modal';

const modalRoot = document.getElementById('modal');

function Modal({ isOpen, children }) {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return (
    isOpen &&
    createPortal(
      <Container>
        <Text>{children}</Text>
      </Container>,
      // target container
      el
    )
  );
}

export default Modal;
