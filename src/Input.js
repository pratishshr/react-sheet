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

  clear = () => {
    const { id, name, handleChange } = this.props;

    handleChange(id, name, '');
  };

  render() {
    const { name, value, inputProps, type } = this.props;

    return (
      <input
        style={{ cursor: 'default' }}
        ref={elem => (this.cell = elem)}
        type={type}
        name={name}
        value={value}
        onChange={this.onChange}
        ref={elem => (this.input = elem)}
        onKeyDown={this.onKeyDown}
        onMouseDown={e => e.preventDefault()}
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
