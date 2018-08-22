import React, { Component } from 'react';
import { List } from 'react-virtualized';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

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
  addRow,
  addedData
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
        rowCount={data.length}
        setDragCopyValue={setDragCopyValue}
        addedData={addedData}
      />
    );
  };
}
const listStyle = {
  overflowX: false,
  overflowY: 'auto'
};
class Body extends Component {

  constructor(){
    super();
    this.state = {
      scrollWidth: 14
    };
  }

  getScrollBarWidth(e){
    let target = document.querySelector(e);
    this.setState({
      scrollWidth: target.offsetWidth - target.scrollWidth
    });
  }

  List = null;

  render() {
    const {
      data,
      width,
      headerHeight,
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
      addRow,
      addedData
    } = this.props;
    return (
      <div
        className="table-body-row"
        style={{ width: width + this.state.scrollWidth || '1075px', height: `calc(100% - ${headerHeight}px)`}}
        id="react-sheet-body"
      >
          <AutoSizer>
            {({width, height}) => (
                <List
                  width={width}
                  height={height}
                  rowCount={data.length}
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
                    addRow,
                    addedData
                  )}
                  onRowsRendered={() => {
                    this.getScrollBarWidth('.ReactVirtualized__Grid')
                  }}
                  style={listStyle}
                />
              )}
          </AutoSizer>
      </div>
    );
  }
}

export default Body;
