import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Input extends Component {
  onChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const { id, name, handleChange } = this.props;

    handleChange(id, name, value);
  };

  render() {
    const { name, value, inputProps = {} } = this.props;

    return (
      <input
        type="text"
        name={name}
        value={value}
        onChange={this.onChange}
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
