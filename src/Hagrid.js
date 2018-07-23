import './assets/style.scss';
import React, { Component } from 'react';

import Body from './Body';
import Input from './Input';
import Header from './Header';
import Select from './Select';
import { Scrollbars } from 'react-custom-scrollbars';

class Hagrid extends Component {
  constructor() {
    super();
    this.body;
  }
  render() {
    const { data, columns, selection, setSelection, focusedCell } = this.props;

    return (
      <div ref={elem => (this.grid = elem)} className="container">
        <div className="data-table">
          <Scrollbars>
            <Header columns={columns} />
            <Body
              ref={elem => (this.body = elem)}
              data={data}
              columns={columns}
              selection={selection}
              focusedCell={focusedCell}
              setSelection={setSelection}
            />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default Hagrid;
