import '../css/style.scss';
import React, { Component } from 'react';
import classnames from 'classnames';

import Body from './Body';
import Header from './Header';
import { Scrollbars } from 'react-custom-scrollbars';

class Hagrid extends Component {
  constructor() {
    super();
    this.state = {
      tableHeight: null,
      headerWidth: null,
      headerHeight: null
    };
    this.body;
    this.dataTable;
  }

  componentDidMount() {
    this.setTableHeight();

    document.addEventListener('click', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick);
  }

  setWidth = width => {
    this.setState({ headerWidth: width });
  };

  setHeight = height => {
    this.setState({ headerHeight: height });
  };

  setTableHeight = height => {
    this.setState({
      tableHeight: this.props.height || this.dataTable.offsetHeight
    });
  };

  onClick = () => {
    const { onClick } = this.props;

    onClick && onClick();
  };

  isVisible = elem =>
    !!elem &&
    !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

  onOutsideClick = event => {
    if (!this.dataTable.contains(event.target)) {
      if (this.isVisible(this.dataTable)) {
        this.props.removeAllListeners && this.props.removeAllListeners();
      }
    }
  };

  render() {
    const {
      data,
      rowHeight,
      columns,
      selection,
      selectionEnd,
      className,
      setSelection,
      setSelectionEnd,
      focus,
      onEnter,
      isSelecting,
      addRow,
      focusedCell,
      addedData,
      onMouseUp,
      onMouseDown,
      onMouseOver,
      setDragCopyValue,
      responsive
    } = this.props;
    const { headerWidth, headerHeight } = this.state;

    const { tableHeight } = this.state;

    return (
      <div
        onMouseDown={this.onClick}
        ref={elem => (this.dataTable = elem)}
        className={classnames('data-table', className)}
        style={{ height: tableHeight || '' }}
      >
        <Scrollbars>
          <Header
            width={headerWidth + 2}
            columns={columns}
            setWidth={this.setWidth}
            setHeight={this.setHeight}
          />
          <Body
            addRow={addRow}
            ref={elem => (this.body = elem)}
            data={data}
            addedData={addedData}
            width={headerWidth + 2}
            focus={focus}
            isSelecting={isSelecting}
            onEnter={onEnter}
            columns={columns}
            rowHeight={rowHeight}
            selection={selection}
            selectionEnd={selectionEnd}
            headerHeight={headerHeight}
            focusedCell={focusedCell}
            setSelection={setSelection}
            setSelectionEnd={setSelectionEnd}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            setDragCopyValue={setDragCopyValue}
          />
        </Scrollbars>
      </div>
    );
  }
}

export default Hagrid;
