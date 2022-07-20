import { useState, useEffect } from 'react';
import Button from './Button';
import Searchbar from './Searchbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import { Container } from './App.styled';

const API_KEY = '27155173-9deaa55e537d9ae9b6e54e2b2';
const URL = 'https://pixabay.com/api/';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');
    const fetchImg = () => {
      return fetch(
        `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Failed to find any images'));
        })
        .then(pictures => {
          if (!pictures.total) {
            toast.error(
              `Failed to find any images with name ${query}. Try other words.`
            );
          }
          return pictures;
        })
        .catch(error => setError(error) && setStatus('rejected'));
    };
    fetchImg().then(pictures => {
      const selectedProps = pictures.hits.map(
        ({ id, largeImageURL, webformatURL }) => {
          return { id, largeImageURL, webformatURL };
        }
      );
      setPictures(prevState => [...prevState, ...selectedProps]);
      setStatus('resolved');
      setTotalHits(pictures.total);
    });
  }, [page, query]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchSubmit} />
      {pictures.length > 0 && <ImageGallery images={pictures} />}
      {totalHits > pictures.length && <Button onClick={handleLoadMore} />}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && { error }}
      <ToastContainer autoClose={3000} />
    </Container>
  );
};
