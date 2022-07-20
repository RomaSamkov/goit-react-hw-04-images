import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modalRoot');

const Modal = ({ onClose, selectedImg }) => {
  useEffect(() => {
    const handleKeyEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyEscape);
    return () => {
      window.removeEventListener('keydown', handleKeyEscape);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContent>
        <img src={selectedImg} alt="SelectedImage" />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedImg: PropTypes.string.isRequired,
};

export default Modal;
