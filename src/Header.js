import classNames from 'classnames';
import React, { Component } from 'react';

const Header = ({ columns }) => (
  <div className="table-head-row"  style={{ width: '1075px' }}>
    <div className="table-row table-header-group">
      {columns.map(column => {
        const { width, headerClassname } = column;

        return (
          <div
            key={column.Header}
            style={{ width:  width, maxWidth:  width }}
            className={classNames('t-head', headerClassname)}
          >
            {column.Header}
          </div>
        );
      })}
    </div>
  </div>
);

export default Header;
