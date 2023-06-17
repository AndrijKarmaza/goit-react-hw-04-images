import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { useState, useEffect } from 'react';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(false);

  const loadedImage = page * 12;

  useEffect(() => {
    async function getImages() {
      if (inputValue !== '' || page !== 1) {
        try {
          setLoading(true);
          const fetchedImages = await fetchImages(inputValue, page);
          fetchedImages.totalHits === 0
            ? Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
              )
            : setSearchData(searchData => [
                ...searchData,
                ...fetchedImages.hits,
              ]);
          setTotalImages(fetchedImages.totalHits);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
          Loading.remove();
        }
      }
    }
    getImages();
  }, [inputValue, page]);

  const formSubmit = value => {
    if (inputValue !== value) {
      setSearchData([]);
      setPage(1);
    } else {
      Notify.failure('You are already searching for images in this category.');
    }

    setInputValue(value.trim());
  };

  const buttonLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar formSubmit={formSubmit} />
      {loading && Loading.standard('Loading...')}
      <ImageGallery images={searchData} />
      {totalImages > 0 &&
        loadedImage <= totalImages &&
        inputValue !== '' &&
        !loading && <Button buttonLoadMore={buttonLoadMore} />}
      {error &&
        Notify.failure(
          'Oops! Something went wrong. Please try reloading the page'
        )}
    </>
  );
};
