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
  }

  componentDidMount() {
    this.setTableHeight();
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

  render() {
    const {
      data,
      rowHeight,
      columns,
      selection,
      className,
      setSelection,
      focus,
      onEnter,
      focusedCell
    } = this.props;
    const { headerWidth, headerHeight } = this.state;

    const { tableHeight } = this.state;

    return (
      <div
        onClick={this.onClick}
        ref={elem => (this.dataTable = elem)}
        className={classnames('data-table', className)}
        style={{ height: tableHeight || '' }}
      >
        <Scrollbars>
          <Header
            width={headerWidth}
            columns={columns}
            setWidth={this.setWidth}
            setHeight={this.setHeight}
          />
          <Body
            ref={elem => (this.body = elem)}
            data={data}
            width={headerWidth}
            focus={focus}
            onEnter={onEnter}
            columns={columns}
            rowHeight={rowHeight}
            selection={selection}
            bodyHeight={tableHeight - headerHeight}
            focusedCell={focusedCell}
            setSelection={setSelection}
          />
        </Scrollbars>
      </div>
    );
  }
}

export default Hagrid;
