import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { ModalWindow } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  togleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const { isModalOpen } = this.state;
    const { largeImageURL, webformatURL, tags } = this.props;
    return (
      <>
        <li className={css.ImageGalleryItem} onClick={this.togleModal}>
          <img src={webformatURL} alt={tags} loading="lazy" />
        </li>
        {isModalOpen && (
          <ModalWindow
            isOpen={isModalOpen}
            togleModal={this.togleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
  }
}
