import React from 'react';

import HeaderCell from './HeaderCell';

const Header = ({ columns }) => (
  <div className="table-head-row" style={{ width: '1075px' }}>
    <div className="table-row table-header-group">
      {columns.map((column, index) => {
        return <HeaderCell key={index} column={column} />;
      })}
    </div>
  </div>
);

export default Header;
