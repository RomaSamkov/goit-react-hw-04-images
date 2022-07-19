import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '27155173-9deaa55e537d9ae9b6e54e2b2';
const PARAM =
  'per_page=12&orientation=horizontal&image_type=photo&safesearch=true';

const getImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `/?key=${API_KEY}&q=${searchQuery}&page=${page}&${PARAM}`
  );
  return data;
};

export { getImages };
