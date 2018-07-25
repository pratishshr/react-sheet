import React, { Component } from 'react';

import HeaderCell from './HeaderCell';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    this.addWidth();
  }

  /**
   * Used For scrollbars.
   */
  addWidth() {
    const header = document.querySelector('#rs-header');

    // console.lot(header.)
  }

  render() {
    const { width } = this.state;
    const { columns } = this.props;

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
