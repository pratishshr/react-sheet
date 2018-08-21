import React, { Component } from 'react';
import { List } from 'react-virtualized';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { Scrollbars } from 'react-custom-scrollbars';

import Row from './Row';
import { callbackify } from 'util';


function detectPlatform(){
  if(navigator.platform.indexOf('Mac') > -1){
    return 'mac';
  }
  else if(navigator.platform.indexOf('Win') > -1){
    return 'win';
  }else{
    return 'others';
  }
}
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
        style={{ width: width || '1075px', height: `calc(100% - ${headerHeight}px)`}}
        id="react-sheet-body"
      >
        <Scrollbars onScroll={this.handleScroll}>
          <AutoSizer>
            {({width, height}) => (
                <List
                  width={(detectPlatform() == 'mac') ? width : width - 15}
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
                  ref={instance => (this.List = instance)}
                  style={listStyle}
                />
              )}
          </AutoSizer>
        </Scrollbars>
      </div>
    );
  }
}

export default Body;
