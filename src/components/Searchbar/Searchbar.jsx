import { Component } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    formSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  formSubmit = evt => {
    evt.preventDefault();
    const { value } = evt.currentTarget.value;
    !value.trim() &&
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    this.setState({ inputValue: value });
    this.props.formSubmit(value);
    this.formReset();
  };

  formReset = () => {
    this.setState({ value: '' });
  };

  inputChange = evt => this.setState({ value: evt.currentTarget.value });

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.formSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <BiSearch style={{ width: '25px', height: 'auto' }} />
          </button>

          <input
            onChange={this.inputChange}
            value={this.state.value}
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
  }
}
