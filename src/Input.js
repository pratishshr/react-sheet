import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as keys from './constants/keys';

const ALLOWED_KEYS = [keys.ESCAPE, keys.ENTER];

class Input extends Component {
  constructor(props) {
    super(props);
    this.cell;
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  onChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const { id, name, handleChange } = this.props;

    handleChange(id, name, value);
  };

  handleChange = e => {
    e.preventDefault();
    const value = e.target.value;

    this.setState({ value });
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

  onBlur = e => {
    e.preventDefault();
    const { value } = this.state;
    const { id, name, handleChange } = this.props;

    handleChange(id, name, value);
  };

  render() {
    const { value } = this.state;
    const { name, inputProps, type, className } = this.props;

    return (
      <div className={className}>
        <input
          tabIndex={-1}
          style={{ cursor: 'default' }}
          ref={elem => (this.cell = elem)}
          type={type}
          name={name}
          value={value}
          onChange={this.handleChange}
          onBlur={this.onBlur}
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
