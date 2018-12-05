import '../css/style.scss';
import React, { Component } from 'react';
import classnames from 'classnames';

import Body from './Body';
import Header from './Header';
import { Scrollbars } from 'react-custom-scrollbars';

class Hagrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeight: null,
      headerWidth: null,
      scrollbarWidth: null,
      display: 'hidden',
      scrollOffsetLeft: 0
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

  setTableHeight = height => {
    this.setState({
      tableHeight: this.props.height || this.dataTable.offsetHeight
    });
  };

  onClick = () => {
    const { onClick } = this.props;

    onClick && onClick();
  };

  isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

  onOutsideClick = event => {
    if (!this.dataTable.contains(event.target)) {
      if (this.isVisible(this.dataTable)) {
        this.props.removeAllListeners && this.props.removeAllListeners();
      }
    }
  };

  updateScroll = e => {
    this.setState({
      scrollbarWidth: e
    });
  };

  updateVisibility = () => {
    this.setState({
      display: 'visible'
    });
  };

  fixable = scroller => {
    let dataTable = document.querySelector('.data-table'),
      scrollWidth = dataTable.scrollWidth,
      offsetWidth = dataTable.offsetWidth,
      fixCol = document.querySelectorAll('.fixed'),
      lastColFix = document.querySelectorAll('.l-fixed');

    fixCol.forEach((element, index) => {
      element.style.transform = `translateX(${scroller}px)`;
      if (scroller > 0) {
        element.classList.add('scrolled');
      } else {
        element.classList.remove('scrolled');
      }
    });

    // lastColFix.forEach((element, index) => {
    //   element.style.transform = `translateX(-${ (scrollWidth - offsetWidth) - scroller}px)`;
    //   if (scroller > 0) {
    //     element.classList.add('scrolled');
    //   }else{
    //     element.classList.remove('scrolled');
    //   }
    // })
  };

  scrollInteract = event => {
    let scrollLeft = event.target.scrollLeft;

    if (event.target.classList.contains('data-table')) {
      this.fixable(scrollLeft);

      this.setState({
        scrollOffsetLeft: scrollLeft
      });
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
      onEscape,
      isSelecting,
      addRow,
      focusedCell,
      addedData,
      onMouseUp,
      onMouseDown,
      onMouseOver,
      setDragCopyValue,
      responsive,
      scrollLeft
    } = this.props;
    const { headerWidth, headerHeight } = this.state;

    const { tableHeight } = this.state;

    return (
      <div
        onMouseDown={this.onClick}
        ref={elem => (this.dataTable = elem)}
        className={classnames('data-table', className)}
        style={{ height: tableHeight || '', visibility: this.state.display }}
      >
        <Header
          width={headerWidth + this.state.scrollbarWidth}
          columns={columns}
          setWidth={this.setWidth}
          setHeight={this.setHeight}
          ScrollbarWidth={this.state.scrollbarWidth}
          responsive={responsive}
        />
        <Body
          responsive={responsive}
          addRow={addRow}
          ref={elem => (this.body = elem)}
          data={data}
          addedData={addedData}
          width={headerWidth}
          focus={focus}
          isSelecting={isSelecting}
          onEnter={onEnter}
          columns={columns}
          scrollLeft={this.state.scrollOffsetLeft}
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
          ScrollbarWidth={this.state.scrollbarWidth}
          scroller={this.updateScroll}
          visibilityToggle={this.updateVisibility}
          fixable={this.fixable}
        />
      </div>
    );
  }
}

export default Hagrid;
