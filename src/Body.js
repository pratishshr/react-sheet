import _get from 'lodash/get';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const Body = ({ data, columns }) => (
      <div className="table-body-row"  style={{ width: '1075px' }}>
        <Scrollbars
         >
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
                        style={{ width:  width, maxWidth:  width }}
                        className={classNames('t-columns', className)}
                      >
                        {Cell ? Cell(rowData) : rowData.value}
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </Scrollbars>
  </div>
);

export default Body;
