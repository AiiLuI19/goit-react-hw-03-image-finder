import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
