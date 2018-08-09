import _get from 'lodash/get';
import classNames from 'classnames';
import React, { Component } from 'react';

import CustomCell from './CustomCell';

class Row extends Component {
  onDoubleClick = (selectedRow, selectedColumn) => {
    return () => {
      const { focus } = this.props;

      if (focus) {
        focus(selectedRow, selectedColumn);
      }
    };
  };

  isSelected = (rowIndex, colIndex) => {
    const { selection = {}, selectionEnd = {} } = this.props;
    const { row, column } = selection;
    const { row: rowEnd, column: columnEnd } = selectionEnd;

    const posX = rowIndex >= row && rowIndex <= rowEnd;
    const posY = colIndex >= column && colIndex <= columnEnd;
    const negX = rowIndex <= row && rowIndex >= rowEnd;
    const negY = colIndex <= column && colIndex >= columnEnd;

    if (!row && !column) {
      return false;
    }

    return (posX && posY) || (negX && negY) || (posX && negY) || (negX && posY);
  };

  isSelectedFirst = (rowIndex, colIndex) => {
    const { selection = {} } = this.props;
    const { row, column } = selection;

    return row === rowIndex && column === colIndex;
  };

  render() {
    const {
      row,
      style,
      columns,
      rowIndex,
      selection,
      focusedCell,
      onEnter,
      onMouseUp,
      onMouseDown,
      onMouseOver,
      setDragCopyValue
    } = this.props;

    const { row: focusedRow = null, column: focusedColumn = null } =
      focusedCell || {};
    const { row: selectedRow = null, column: selectedColumn = null } =
      selection || {};

    return (
      <div className="table-row" style={style}>
        {columns.map((column, colIndex) => {
          const { Cell, width, className } = column;

          let rowData = {
            id: row.id,
            index: rowIndex,
            original: row,
            value: _get(row, column.accessor, '')
          };

          const isSelected = this.isSelected(rowIndex, colIndex);
          const isSelectedFirst = this.isSelectedFirst(rowIndex, colIndex);
          const isFocused = rowIndex == focusedRow && colIndex == focusedColumn;
          let customCell =
            Cell &&
            Cell(rowData, {
              id: row.id,
              onEnter,
              isFocused,
              index: rowIndex
            });

          return (
            <CustomCell
              ref={elem => (this[`cell-${rowIndex}-${colIndex}`] = elem)}
              index={`cell-${rowIndex}-${colIndex}`}
              key={`${rowIndex}-${colIndex}`}
              style={{ width }}
              rowData={rowData}
              isFocused={isFocused}
              isSelected={isSelected}
              isSelectedFirst={isSelectedFirst}
              customCell={customCell}
              setDragCopyValue={setDragCopyValue}
              className={classNames('t-columns', className, {
                selected: isSelected
              })}
              onMouseDown={onMouseDown(rowIndex, colIndex)}
              onMouseUp={onMouseUp(rowIndex, colIndex)}
              onMouseOver={onMouseOver(rowIndex, colIndex)}
              onDoubleClick={this.onDoubleClick(selectedRow, selectedColumn)}
            />
          );
        })}
      </div>
    );
  }
}

export default Row;
