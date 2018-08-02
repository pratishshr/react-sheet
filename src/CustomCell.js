import React, { Component } from 'react';

class CustomCell extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.isFocused ||
      this.props.className !== nextProps.className ||
      this.props.isSelected !== nextProps.isSelected ||
      this.props.rowData.value !== nextProps.rowData.value ||
    ) {
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
      onDoubleClick,
      onMouseDown
    } = this.props;

    return (
      <div
        style={style}
        className={className}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        id={index}
      >
        {customCell || rowData.value}
      </div>
    );
  }
}

export default CustomCell;
