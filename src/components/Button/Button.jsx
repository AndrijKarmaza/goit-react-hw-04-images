import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ buttonLoadMore }) => {
  return (
    <button type="button" className={css.Button} onClick={buttonLoadMore}>
      Load More
    </button>
  );
};

Button.propTypes = {
  buttonLoadMore: PropTypes.func.isRequired,
};
