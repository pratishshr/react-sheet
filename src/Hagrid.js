import '../css/style.scss';
import React, { Component } from 'react';
import classnames from 'classnames';

import Body from './Body';
import Header from './Header';

class Hagrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeight: null,
      headerWidth: null,
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

  // this is the main function to trigger fixable
  fixable = scroller => {
    if (this.props.fixable) {
      let dataTable = document.querySelector('.data-table'),
        scrollWidth = dataTable.scrollWidth,
        offsetWidth = dataTable.offsetWidth,
        row = document.querySelectorAll('.table-row');

      row.forEach((element, index) => {
        for (let i = 0; i < this.props.fixable.col; i++) {
          element.childNodes[i].style.transform = `translateX(${scroller}px)`;
          if (scroller > 0) {
            element.childNodes[i].style.zIndex = `999`;
            element.childNodes[i].style.background = `white`;
            element.childNodes[i].style.boxShadow = `1px 0px 3px 0px rgba(0, 0, 0, 0.14)`;
          } else {
            element.childNodes[i].style.boxShadow = null;
          }
        }
      });
    }
  };

  scrollInteract = event => {
    let scrollLeft = event.target.scrollLeft;

    if (event.target.classList.contains('data-table')) {
      // Calls fixable when scroll starts
      this.fixable(scrollLeft);

      this.setState({
        scrollOffsetLeft: scrollLeft
      });
    }
  };

  setScroller = () => {
    let scrollable = document.querySelector('.ReactVirtualized__Grid');
    let scrollBar = document.querySelector('.scrollThumb');

    let scrollHeight = scrollable.scrollHeight;
    let offsetHeight = scrollable.offsetHeight;

    let thumbHeight = (offsetHeight / scrollHeight) * 100;

    thumbHeight = thumbHeight < 15 ? 15 : thumbHeight;

    if (scrollHeight > offsetHeight) {
      scrollBar.style.display = 'block';
      scrollBar.style.height = thumbHeight + '%';
    }
  };

  DragObject = event => {
    event.preventDefault();
    let scrollable = document.querySelector('.ReactVirtualized__Grid'),
      oldMousePosition = 0,
      oldAnchorPosition = 0,
      target = event.target;

    //Mouse Cursor position when mouse down on scroll thumb.
    oldMousePosition = event.clientY;

    //ScrollThumb offset Top when mouse down
    oldAnchorPosition = event.target.offsetTop;

    const trackMouse = e => {
      //distance covered by mouse when drag starts
      let distance = e.clientY - oldMousePosition;

      //new offset top for scrollthumb
      let newPosition = oldAnchorPosition + distance;

      if (newPosition < 0) {
        // When new position is less than 0 then set newPosition to 0
        // so that the scroll thumb doesn't scroll out of the scroll area
        newPosition = 0;
      } else if (newPosition + target.offsetHeight > target.parentNode.offsetHeight) {
        // When scrollbar thumb start to scroll over the scroll area then set its position to bottom of the scroll area
        newPosition = target.parentNode.offsetHeight - target.offsetHeight;
      }
      //sets the new position
      target.style.top = newPosition + 'px';

      //calculate position value of the scroll thumb.
      let position = target.offsetTop / (target.parentNode.offsetHeight - target.offsetHeight),
        scrollPos = position * (scrollable.scrollHeight - scrollable.offsetHeight);

      scrollable.scrollTop = scrollPos;
    };

    const closeDragElement = event => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    document.onmouseup = closeDragElement;
    document.onmousemove = trackMouse;
  };

  wheeler = event => {
    let scrollable = document.querySelector('.ReactVirtualized__Grid');

    console.log(event.target.classList.contains('Select-option'));

    if (event.target.classList.contains('Select-option')) {
      return;
    }
    scrollable.scrollTop += event.deltaY;

    let thumb = document.querySelector('.scrollThumb');
    let position = scrollable.scrollTop / (scrollable.scrollHeight - scrollable.offsetHeight),
      scrollPos = position * (thumb.parentNode.offsetHeight - thumb.offsetHeight);

    thumb.style.top = scrollPos + 'px';
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
      setDragCopyValue
    } = this.props;
    const { headerWidth, headerHeight } = this.state;

    const { tableHeight } = this.state;

    let fixable = this.props.fixable ? this.props.fixable : { fixable: false };

    return (
      <div className="ReactSheet-table">
        <div className="scrollBar-container">
          <div className="scrollThumb" onMouseDown={this.DragObject} />
        </div>
        <div
          onMouseDown={this.onClick}
          ref={elem => (this.dataTable = elem)}
          className={classnames('data-table', className)}
          style={{ height: tableHeight || '' }}
          onScroll={fixable.fixable ? this.scrollInteract : undefined}
          onWheel={this.wheeler}
        >
          <Header width={headerWidth} columns={columns} setWidth={this.setWidth} setHeight={this.setHeight} />
          <Body
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
            scrollInit={this.setScroller}
            setDragCopyValue={setDragCopyValue}
            fixable={fixable.fixable ? this.fixable : undefined}
          />
        </div>
      </div>
    );
  }
}

export default Hagrid;
