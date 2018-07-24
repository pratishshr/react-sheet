import React, { Component } from 'react';
import { List } from 'react-virtualized';
import { Scrollbars } from 'react-custom-scrollbars';

import Row from './Row';

function renderRow(data, columns, selection, focusedCell, setSelection) {
  return ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <Row
        key={key}
        style={style}
        rowIndex={index}
        row={data[index]}
        columns={columns}
        selection={selection}
        focusedCell={focusedCell}
        setSelection={setSelection}
      />
    );
  };
}
class Body extends Component {
  render() {
    const {
      data,
      width,
      columns,
      selection = {},
      setSelection,
      focusedCell
    } = this.props;
    return (
      <div className="table-body-row" style={{ width: width || '1075px' }}>
        <List
          width={width || 1075}
          height={300}
          rowCount={data.length}
          rowHeight={20}
          rowRenderer={renderRow(
            data,
            columns,
            selection,
            focusedCell,
            setSelection
          )}
        />
      </div>
    );
  }
}

export default Body;
