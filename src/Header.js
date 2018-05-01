import classNames from 'classnames';
import React, { Component } from 'react';

const Header = ({ columns }) => (
  <div className="table-head-row">
    <div className="table-row">
      {columns.map(column => {
        const { width, headerClassname } = column;

        return (
          <div
            key={column.Header}
            style={{ width }}
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
