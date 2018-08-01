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
const listStyle = {
  overflowX: false,
  overflowY: false
};
class Body extends Component {
  handleScroll = ({ target }) => {
    const { scrollTop, scrollLeft } = target;

    const { Grid: grid } = this.List;

    grid.handleScrollEvent({ scrollTop, scrollLeft });
  };

  List = null;
  render() {
    const {
      data,
      width,
      bodyHeight,
      rowHeight,
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
        style={{ width: width || '1075px', height: bodyHeight || '' }}
        id="react-sheet-body"
      >
        <Scrollbars onScroll={this.handleScroll}>
          {width && (
            <List
              width={width}
              height={bodyHeight || 300}
              rowCount={data.length}
              rowHeight={rowHeight || 28}
              rowRenderer={renderRow(
                data,
                columns,
                selection,
                focusedCell,
                setSelection,
                focus,
                onEnter
              )}
              ref={instance => (this.List = instance)}
              style={listStyle}
            />
          )}
        </Scrollbars>
      </div>
    );
  }
}

export default Body;
