import React, { Component } from 'react';

import HeaderCell from './HeaderCell';

const DEFAULT_WIDTH = 100;
class Header extends Component {
  componentDidMount() {
    this.addWidth();
    this.addHeight();
  }

  /**
   * Used For scrollbars.
   */
  addWidth() {
    const { setWidth, columns } = this.props;
    const width = columns.reduce((acc, nextColumn) => {
      return acc + (nextColumn.width || DEFAULT_WIDTH);
    }, 0);

    setWidth(width);
  }

  addHeight() {
    const { setHeight } = this.props;
    const height = document.querySelector('#rs-header').offsetHeight;

    setHeight(height);
  }

  render() {
    const { width, columns } = this.props;

    return (
      <div id="rs-header" className="table-head-row" style={{ width }}>
        <div className="table-row table-header-group">
          {columns.map((column, index) => {
            return <HeaderCell key={index} column={column} />;
          })}
        </div>
      </div>
    );
  }
}

export default Header;
