import React, { Component } from 'react';
class CustomCell extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.isFocused ||
      this.props.className !== nextProps.className ||
      this.props.isSelected !== nextProps.isSelected ||
      this.props.rowData.value !== nextProps.rowData.value ||
      (this.props.customCell &&
        nextProps.customCell &&
        this.props.customCell.props.className !==
          nextProps.customCell.props.className)
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
        id={index}
        style={style}
        className={className}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        {customCell || rowData.value}
      </div>
    );
  }
}

export default CustomCell;
