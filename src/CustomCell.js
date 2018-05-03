import React, { Component } from 'react';

class CustomCell extends Component {
  render() {
    const { rowData, Cell, isFocused } = this.props;

    return React.cloneElement(, {
      isFocused
    });
  }
}

export default CustomCell;
