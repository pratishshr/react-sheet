import React, { Component } from 'react';
import { List } from 'react-virtualized';
import { Scrollbars } from 'react-custom-scrollbars';

import Row from './Row';

function renderRow(
  data,
  columns,
  selection,
  focusedCell,
  setSelection,
  focus,
  onEnter
) {
  return ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <Row
        key={key}
        style={style}
        focus={focus}
        rowIndex={index}
        onEnter={onEnter}
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
      focus,
      onEnter
    } = this.props;
    return (
      <div
        className="table-body-row"
        style={{ width: width || '1075px' }}
        id="react-sheet-body"
      >
        {width && (
          <List
            width={width}
            height={300}
            rowCount={data.length}
            rowHeight={20}
            rowRenderer={renderRow(
              data,
              columns,
              selection,
              focusedCell,
              setSelection,
              focus,
              onEnter
            )}
          />
        )}
      </div>
    );
  }
}

export default Body;
