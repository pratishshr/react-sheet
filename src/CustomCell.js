import React, { Component } from 'react';

class CustomCell extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.isSelected !== nextProps.isSelected || nextProps.isFocused) {
      return true;
    }

    return false;
  }
  render() {
    const { style, rowData, className, customCell, onMouseDown } = this.props;

    return (
      <div style={style} className={className} onMouseDown={onMouseDown}>
        {customCell || rowData.value}
      </div>
    );
  }
}

export default CustomCell;
