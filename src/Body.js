import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Row from './Row';

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
        <Scrollbars>
          {data.map((row, rowIndex) => (
            <Row
              row={row}
              key={rowIndex}
              columns={columns}
              rowIndex={rowIndex}
              focusedRow={focusedRow}
              selectedRow={selectedRow}
              focusedColumn={focusedColumn}
              selectedColumn={selectedColumn}
            />
          ))}
        </Scrollbars>
      </div>
    );
  }
}

export default Body;
