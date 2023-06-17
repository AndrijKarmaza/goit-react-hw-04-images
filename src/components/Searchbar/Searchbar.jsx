import { BiSearch } from 'react-icons/bi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ formSubmit }) => {
  const [value, setValue] = useState('');

  const onFormSubmit = evt => {
    evt.preventDefault();
    const { value } = evt.currentTarget.value;
    !value.trim() &&
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    setValue(value);
    formSubmit(value);
    setValue('');
  };

  const inputChange = evt => setValue(evt.currentTarget.value);

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <BiSearch style={{ width: '25px', height: 'auto' }} />
        </button>

        <input
          onChange={inputChange}
          value={value}
          className={css.SearchForm_input}
          type="text"
          name="value"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  formSubmit: PropTypes.func.isRequired,
};
