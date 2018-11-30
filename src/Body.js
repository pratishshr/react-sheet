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
  onEscape,
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
        onEscape={onEscape}
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
  overflowY: 'auto'
};
class Body extends Component {

  constructor(props){
    super(props);
    this.state = {
      scrollWidth: this.props.ScrollbarWidth,
      headerHeight: null
    };
    
    setTimeout(() => { this.props.visibilityToggle(); },1);
  }
  
  getScrollBarWidth(e){
    let target = document.querySelector(e);
    this.setState({
      scrollWidth: target.offsetWidth - target.scrollWidth
    });
    this.props.scroller(target.offsetWidth - target.scrollWidth);
  }

  setHeaderHeight() {
    const height = document.querySelector('#rs-header').offsetHeight;
    this.setState({
      headerHeight: height
    });
  }

  resizeFunction(){
    window.onresize = (event) => {
      this.setHeaderHeight();
    };
  }

  

  componentDidMount(){
    this.resizeFunction();
    this.setHeaderHeight();
    setTimeout(() => {
      this.props.fixable(this.props.scrollLeft);
    },  1);

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
      onEscape,
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

    if(responsive){
      styles.minWidth = width + this.state.scrollWidth || '1000px';
    }else{
      styles.width = width + this.state.scrollWidth || '1000px';
    }

    return (
      <div
        className="table-body-row"
        style={ styles }
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
                    onEscape,
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
                      this.getScrollBarWidth('.ReactVirtualized__Grid');
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
