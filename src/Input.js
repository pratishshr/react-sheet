import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as keys from './constants/keys';

const ALLOWED_KEYS = [keys.ESCAPE, keys.ENTER];

class Input extends Component {
  constructor() {
    super();
    this.cell;
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.value !== nextProps.value ||
      this.props.className !== nextProps.className
    ) {
      return true;
    }

    return false;
  }

  onChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const { id, name, handleChange } = this.props;

    handleChange(id, name, value);
  };

  onBlur = e => {
    e.preventDefault();
    const { id, name, handleBlur } = this.props;

    if (handleBlur) {
      handleBlur(id, name);
    }
  };

  clear = () => {
    const { id, name, handleChange } = this.props;

    handleChange(id, name, '');
  };

  onKeyDown = e => {
    if (e.which === 38 || e.which == 40) {
      e.preventDefault();
    }
  };

  render() {
    const { name, value, inputProps, type, className } = this.props;

    return (
      <div className={className}>
        <input
          tabIndex={-1}
          style={{ cursor: 'default' }}
          ref={elem => (this.cell = elem)}
          type={type}
          name={name}
          value={value}
          onBlur={this.onBlur}
          onChange={this.onChange}
          ref={elem => (this.input = elem)}
          onKeyDown={this.onKeyDown}
          onMouseDown={e => e.preventDefault()}
          {...inputProps}
        />
      </div>
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
