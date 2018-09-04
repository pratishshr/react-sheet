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

  constructor(props){
    super(props);
    this.state = {
      scrollWidth: this.props.ScrollbarWidth,
      headerHeight: 42
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
      responsive
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
                      this.getScrollBarWidth('.ReactVirtualized__Grid');
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
