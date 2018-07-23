import React, { Component } from 'react';

class CustomCell extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.isSelected !== nextProps.isSelected || nextProps.isFocused) {
      return true;
    }

    return false;
  }
  render() {
    const {
      index,
      style,
      rowData,
      className,
      customCell,
      onMouseDown
    } = this.props;

    return (
      <div
        style={style}
        className={className}
        onMouseDown={onMouseDown}
        id={index}
      >
        {customCell || rowData.value}
      </div>
    );
  }
}

export default CustomCell;
