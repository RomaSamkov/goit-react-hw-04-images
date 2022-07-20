import { useState, useEffect } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import Modal from 'components/Modal';

const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    document.addEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        return;
      }
      let picture = images.filter(image => {
        return image.id === parseInt(e.target.alt);
      });
      if (!picture.length) {
        return;
      }
      setSelectedImg(picture[0].largeImageURL);
    });
  }, [selectedImg, images]);

  const toggleModal = () => {
    setShowModal(prevShow => !prevShow);
  };

  return (
    <>
      <Gallery onClick={toggleModal}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              smallImgURL={image.webformatURL}
            />
          );
        })}
      </Gallery>
      {showModal && selectedImg && (
        <Modal onClose={toggleModal} selectedImg={selectedImg} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
