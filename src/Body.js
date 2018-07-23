import _get from 'lodash/get';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import CustomCell from './CustomCell';
class Body extends Component {
  render() {
    const {
      data,
      columns,
      selection = {},
      setSelection,
      focusedCell
    } = this.props;
    const { row: focusedRow, column: focusedColumn } = focusedCell;
    const { row: selectedRow, column: selectedColumn } = selection;

    return (
      <div className="table-body-row" style={{ width: '1075px' }}>
        {data.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="table-row">
              {columns.map((column, colIndex) => {
                const { Cell, width, className } = column;

                let rowData = {
                  index: rowIndex,
                  original: row,
                  value: _get(row, column.accessor, '')
                };

                const isFocused =
                  rowIndex == focusedRow && colIndex == focusedColumn;
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
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Body;
