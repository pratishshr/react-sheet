import _get from 'lodash/get';
import classNames from 'classnames';
import React, { Component } from 'react';

import CustomCell from './CustomCell';

class Row extends Component {
  render() {
    const {
      row,
      style,
      columns,
      rowIndex,
      selection,
      focusedCell,
      focus,
      setSelection
    } = this.props;

    const { row: focusedRow, column: focusedColumn } = focusedCell;
    const { row: selectedRow, column: selectedColumn } = selection;

    return (
      <div className="table-row" style={style}>
        {columns.map((column, colIndex) => {
          const { Cell, width, className } = column;

          let rowData = {
            index: rowIndex,
            original: row,
            value: _get(row, column.accessor, '')
          };

          const isFocused = rowIndex == focusedRow && colIndex == focusedColumn;
          const isSelected =
            selectedRow == rowIndex && selectedColumn == colIndex;
          let customCell =
            Cell &&
            Cell(rowData, {
              isFocused
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
              customCell={customCell}
              className={classNames('t-columns', className, {
                selected: isSelected
              })}
              onMouseDown={() => setSelection(rowIndex, colIndex)}
              onDoubleClick={() => {
                focus(selectedRow, selectedColumn);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Row;
