import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as keys from './constants/keys';

const ALLOWED_KEYS = [keys.ESCAPE, keys.ENTER];

class Input extends Component {
  constructor() {
    super();
    this.cell;
  }
  onChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const { id, name, handleChange } = this.props;

    handleChange(id, name, value);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocused !== this.props.isFocused) {
      if (nextProps.isFocused) {
        this.focus();
      } else {
        this.blur();
      }
    }
  }

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    const { id, name, handleChange } = this.props;

    handleChange(id, name, '');
  };

  onKeyDown = e => {
    const keyCode = e.keyCode;

    if (!ALLOWED_KEYS.includes(keyCode)) {
      return;
    }

    e.preventDefault();

    let press = {
      [keys.ENTER]: this.blur,
      [keys.ESCAPE]: this.blur
    };

    press[e.keyCode]();
  };

  render() {
    const { name, value, inputProps } = this.props;

    return (
      <input
        ref={elem => (this.cell = elem)}
        type="text"
        name={name}
        value={value}
        onChange={this.onChange}
        ref={elem => (this.input = elem)}
        onKeyDown={this.onKeyDown}
        {...inputProps}
      />
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  inputProps: PropTypes.object
};

export default Input;
