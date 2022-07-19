import { useState } from 'react';
import { Container } from './App.styled';
import Button from './Button';
import ImageInfo from './ImageInfo';
import Modal from './Modal';
import Searchbar from './Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [moreVisible, setMoreVisible] = useState(false);

  const toggleModal = e => {
    if (!showModal) {
      setSrc(e.target.dataset.src);
      setAlt(e.target.alt);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const submitForm = value => {
    setPage(1);
    setSearchQuery(value);
  };

  const showMoreButton = () => {
    setMoreVisible(true);
  };
  const hideMoreButton = () => {
    setMoreVisible(false);
  };

  const clickMoreButton = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={submitForm} />
      <ImageInfo
        searchQuery={searchQuery}
        page={page}
        onClick={toggleModal}
        showMoreButton={showMoreButton}
        hideMoreButton={hideMoreButton}
      />
      {moreVisible && <Button onClick={clickMoreButton} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={src} alt={alt} />
        </Modal>
      )}
      <ToastContainer />
    </Container>
  );
};
