import React, { Component } from 'react';
import { List } from 'react-virtualized';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

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
  addedData,
  scrollLeft
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
        scrollLeft={scrollLeft}
      />
    );
  };
}
const listStyle = {
  overflowX: false,
  overflowY: 'hidden'
};
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerHeight: null
    };

    setTimeout(() => {
      this.props.visibilityToggle();
    }, 1);
  }

  setHeaderHeight() {
    const height = document.querySelector('#rs-header').offsetHeight;
    this.setState({
      headerHeight: height
    });
  }

  resizeFunction() {
    window.onresize = event => {
      this.setHeaderHeight();
    };
  }

  componentDidMount() {
    this.resizeFunction();
    this.setHeaderHeight();
    setTimeout(() => {
      this.props.fixable(this.props.scrollLeft);
    }, 1);
  }

  List = null;

  render() {
    const {
      data,
      width,
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
      addedData,
      responsive,
      scrollLeft,
      fixable
    } = this.props;

    const styles = {
      height: `calc(100% - ${this.state.headerHeight}px)`
    };
    styles.width = width || '1000px';

    return (
      <div className="table-body-row" style={styles} id="react-sheet-body">
        <AutoSizer>
          {({ width, height }) => (
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
                addedData,
                scrollLeft
              )}
              onRowsRendered={() => {
                // this.getScrollBarWidth('.ReactVirtualized__Grid');
                fixable(scrollLeft);
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
