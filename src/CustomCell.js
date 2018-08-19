import _get from 'lodash/get';
import React, { Component } from 'react';
class CustomCell extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.isFocused ||
      this.props.className !== nextProps.className ||
      this.props.isSelected !== nextProps.isSelected ||
      this.props.isSelectedFirst !== nextProps.isSelectedFirst ||
      this.props.rowData.value !== nextProps.rowData.value ||
      _get(this.props, 'customCell.props.className') !==
        _get(nextProps, 'nextProps.customCell.props.className') ||
      _get(this.props, 'customCell.props.value') !==
        _get(nextProps, 'nextProps.customCell.props.value')
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
      onMouseDown,
      onMouseUp,
      onMouseOver,
      isSelectedFirst,
      setDragCopyValue
    } = this.props;

    return (
      <div
        id={index}
        style={style}
        className={className}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
      >
        {customCell || rowData.value}
        {isSelectedFirst && (
          <button
            onMouseDown={() => {
              setDragCopyValue(rowData.value);
            }}
          />
        )}
      </div>
    );
  }
}

export default CustomCell;
