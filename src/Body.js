import React, { Component } from 'react';
import { List } from 'react-virtualized';
import { Scrollbars } from 'react-custom-scrollbars';

import Row from './Row';

function renderRow(data, columns, selection, focusedCell, setSelection, focus) {
  return ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <Row
        key={key}
        style={style}
        focus={focus}
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
      focusedCell,
      focus
    } = this.props;
    return (
      <div
        className="table-body-row"
        style={{ width: width || '1075px' }}
        id="react-sheet-body"
      >
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
            setSelection,
            focus
          )}
        />
      </div>
    );
  }
}

export default Body;
