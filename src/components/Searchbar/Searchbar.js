import PropTypes from 'prop-types';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
class Searchbar extends Component {
  state = {
    imgName: '',
  };
  handleNameChange = e => {
    this.setState({ imgName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.imgName.trim() === '') {
      return toast.info('Add name img');
    }

    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <button type="submit" className={s.button} aria-label="search button">
            <BsSearch size={20} />
          </button>

          <input
            type="text"
            autoComplete="off"
            value={this.state.imgName}
            onChange={this.handleNameChange}
            autoFocus
            name="imgName"
            placeholder="Search images and photos"
            className={s.input}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
