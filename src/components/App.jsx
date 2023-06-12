import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';
import { fetchImages } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export class App extends Component {
  state = {
    inputValue: '',
    searchData: [],
    page: 1,
    loading: false,
    totalImages: 0,
    error: false,
  };

  async componentDidUpdate(_, prevState) {
    const { inputValue, page } = this.state;
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const fetchedImages = await fetchImages(inputValue, page);
        fetchedImages.totalHits === 0
          ? Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            )
          : this.setState(prevState => ({
              searchData: [...prevState.searchData, ...fetchedImages.hits],
              totalImages: fetchedImages.totalHits,
            }));
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
        Loading.remove();
      }
    }
  }

  formSubmit = value => {
    this.state.inputValue !== value
      ? this.setState({ searchData: [] })
      : Notify.failure(
          'You are already searching for images in this category.'
        );

    this.setState({ inputValue: value.trim() });
  };

  buttonLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchData, totalImages, page, loading, error } = this.state;
    const loadedImage = page * 12;

    return (
      <>
        <Searchbar formSubmit={this.formSubmit} />
        {loading && Loading.standard('Loading...')}
        <ImageGallery images={searchData} />
        {totalImages > 0 && loadedImage <= totalImages && (
          <Button buttonLoadMore={this.buttonLoadMore} />
        )}
        {error &&
          Notify.failure(
            'Oops! Something went wrong. Please try reloading the page'
          )}
      </>
    );
  }
}
