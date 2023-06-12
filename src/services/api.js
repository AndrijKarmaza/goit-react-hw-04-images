import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '28043876-d01bb93c634d22751608058fc';
const IMAGES_ON_PAGE = 12;

export const fetchImages = async (value, page) => {
  const responce = await axios.get(
    `${BASE_URL}/?key=${API_KEY}&q=${value}&page=${page}&per_page=${IMAGES_ON_PAGE}`
  );
  return responce.data;
};
