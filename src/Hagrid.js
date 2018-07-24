import '../css/style.scss';
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
    const {
      data,
      columns,
      width,
      selection,
      setSelection,
      focusedCell
    } = this.props;

    return (
      <div ref={elem => (this.grid = elem)} className="container">
        <h1>React Sheet</h1>
        <div className="data-table">
          <Header columns={columns} />
          <Body
            ref={elem => (this.body = elem)}
            data={data}
            width={width}
            columns={columns}
            selection={selection}
            focusedCell={focusedCell}
            setSelection={setSelection}
          />
        </div>
      </div>
    );
  }
}

export default Hagrid;
