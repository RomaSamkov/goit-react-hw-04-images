import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getImages } from 'services/api';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageInfo = ({
  onClick,
  searchQuery,
  page,
  showMoreButton,
  hideMoreButton,
}) => {
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [hits, setHits] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const openShowLoader = () => {
    setShowLoader(true);
  };

  const closeShowLoader = () => {
    setShowLoader(false);
  };

  useEffect(() => {
    if (searchQuery) {
      (async () => {
        try {
          openShowLoader();
          const { totalHits: newTotalHits, hits: newHits } = await getImages(
            searchQuery,
            page
          );
          closeShowLoader();
          if (newTotalHits === 0) {
            hideMoreButton();
            toast.error(
              `Failed to find any images with name ${searchQuery}. Try other words.`
            );
          }
          if (
            newTotalHits === hits.length + newHits.length ||
            (newTotalHits > 0 && newTotalHits <= 12)
          ) {
            hideMoreButton();
          }
          if (newTotalHits > hits.length + newHits.length) {
            showMoreButton();
          }
          if (page > 1) {
            setHits([...newHits, ...hits]);
            setStatus(Status.RESOLVED);
          }
          if (page === 1) {
            setHits(newHits);
            setStatus(Status.RESOLVED);
            setTotalHits(newTotalHits);
          }
        } catch (error) {
          setError(error);
          setStatus(Status.REJECTED);
          hideMoreButton();
          toast.error(`Sorry, something went wrong.`);
        }
      })();
    }
  }, [hideMoreButton, hits, page, searchQuery, showMoreButton]);

  return (
    <>
      {Status.IDLE && <div></div>}
      {Status.REJECTED && <div></div>}
      {Status.RESOLVED && <ImageGallery hits={hits} onClick={onClick} />}
      {showLoader ? <Loader /> : null}
    </>
  );
};

ImageInfo.propTypes = {
  onClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  showMoreButton: PropTypes.func.isRequired,
  hideMoreButton: PropTypes.func.isRequired,
};

export default ImageInfo;
