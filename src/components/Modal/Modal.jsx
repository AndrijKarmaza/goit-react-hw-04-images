import Modal from 'react-modal';
import css from './Modal.module.css';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '0',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: 'none',
    inset: 'none',
  },
};

Modal.setAppElement('#root');

export const ModalWindow = ({ isOpen, togleModal, largeImageURL, tags }) => {
  return (
    <div className={css.Box}>
      <Modal
        isOpen={isOpen}
        onAfterOpen={() => disableBodyScroll(document)}
        onAfterClose={() => enableBodyScroll(document)}
        onRequestClose={togleModal}
        style={customStyles}
        overlayClassName={css.Overlay}
      >
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </Modal>
    </div>
  );
};

ModalWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  togleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
