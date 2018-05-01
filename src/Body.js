import _get from 'lodash/get';
import classNames from 'classnames';
import React, { Component } from 'react';

const Body = ({ data, columns }) => (
  <div className="table-body-row">
    {data.map((row, rowIndex) => {
      return (
        <div key={rowIndex} className="table-row">
          {columns.map((column, colIndex) => {
            const { Cell, width, className } = column;
            let rowData = {
              index: rowIndex,
              original: row,
              value: _get(row, column.accessor, '')
            };

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{ width }}
                className={classNames('t-columns', className)}
              >
                {Cell ? Cell(rowData) : rowData.value}
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
);

export default Body;
