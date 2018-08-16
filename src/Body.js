import React, { Component } from 'react';
import { List } from 'react-virtualized';
import { Scrollbars } from 'react-custom-scrollbars';

import Row from './Row';

// TODO: REFACTOR THIS!
function renderRow(
  data,
  columns,
  selection,
  focusedCell,
  setSelection,
  focus,
  onEnter,
  setSelectionEnd,
  selectionEnd,
  onMouseUp,
  onMouseDown,
  onMouseOver,
  setDragCopyValue,
  isSelecting,
  addRow
) {
  return ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <Row
        addRow={addRow}
        key={key}
        style={style}
        focus={focus}
        rowIndex={index}
        onEnter={onEnter}
        row={data[index]}
        columns={columns}
        selection={selection}
        selectionEnd={selectionEnd}
        focusedCell={focusedCell}
        setSelection={setSelection}
        setSelectionEnd={setSelectionEnd}
        onMouseUp={onMouseUp}
        isSelecting={isSelecting}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        setDragCopyValue={setDragCopyValue}
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
      setSelectionEnd,
      focusedCell,
      focus,
      isSelecting,
      onEnter,
      selectionEnd = {},
      onMouseUp,
      onMouseDown,
      onMouseOver,
      setDragCopyValue,
      addRow
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
              height={bodyHeight + 100 || 300}
              rowCount={data.length + 1}
              rowHeight={rowHeight || 28}
              rowRenderer={renderRow(
                data,
                columns,
                selection,
                focusedCell,
                setSelection,
                focus,
                onEnter,
                setSelectionEnd,
                selectionEnd,
                onMouseUp,
                onMouseDown,
                onMouseOver,
                setDragCopyValue,
                isSelecting,
                addRow
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
