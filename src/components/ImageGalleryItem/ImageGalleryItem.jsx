import css from './ImageGalleryItem.module.css';
import { ModalWindow } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togleModal = () => {
    setIsModalOpen(isModalOpen => (isModalOpen = !isModalOpen));
  };

  return (
    <>
      <li className={css.ImageGalleryItem} onClick={togleModal}>
        <img src={webformatURL} alt={tags} loading="lazy" />
      </li>
      {isModalOpen && (
        <ModalWindow
          isOpen={isModalOpen}
          togleModal={togleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
