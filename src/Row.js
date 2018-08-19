import _get from 'lodash/get';
import classNames from 'classnames';
import React, { Component, Fragment } from 'react';

import CustomCell from './CustomCell';

import { isBetween } from './utils/calculations';

class Row extends Component {
  constructor() {
    super();
    this.state = {
      displayAddRow: false
    };
  }

  displayAddRow = displayAddRow => {
    this.setState({
      displayAddRow: displayAddRow
    });
  };

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

    if (
      (row == null || row == undefined) &&
      (column == null || column == undefined)
    ) {
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
      setDragCopyValue,
      addRow,
      rowCount,
      addedData
    } = this.props;

    const { row: focusedRow = null, column: focusedColumn = null } =
      focusedCell || {};
    const { row: selectedRow = null, column: selectedColumn = null } =
      selection || {};

    return (
      <div
        className="table-row"
        style={style}
        onMouseOver={() => {
          this.displayAddRow(true);
        }}
        onMouseOut={() => {
          this.displayAddRow(false);
        }}
      >
        {columns.map((column, colIndex) => {
          const { Cell, width, className } = column;

          let rowData = {
            id: row.id,
            index: rowIndex,
            original: row,
            addedData: addedData,
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
              onMouseUp={onMouseUp && onMouseUp(rowIndex, colIndex)}
              onMouseDown={onMouseDown && onMouseDown(rowIndex, colIndex)}
              onMouseOver={onMouseOver && onMouseOver(rowIndex, colIndex)}
              onDoubleClick={this.onDoubleClick(selectedRow, selectedColumn)}
            />
          );
        })}
        {addRow &&
          rowCount !== rowIndex + 1 && (
            <div
              className={classNames('add-btn', {
                hovered: this.state.displayAddRow
              })}
            >
              <button
                className="row-btn"
                style={{
                  display: this.state.displayAddRow ? 'flex' : 'none'
                }}
                onMouseDown={() => addRow(row.sortIndex)}
              >
                +
              </button>
            </div>
          )}
      </div>
    );
  }
}

export default Row;
