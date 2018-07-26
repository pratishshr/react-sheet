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
    this.state = {
      width: null
    };
    this.body;
  }

  setWidth = width => {
    this.setState({ width });
  };

  render() {
    const {
      data,
      columns,
      selection,
      setSelection,
      focus,
      onEnter,
      focusedCell
    } = this.props;
    const { width } = this.state;

    return (
      <div ref={elem => (this.grid = elem)} className="container">
        <div className="data-table">
          <Scrollbars>
            <Header width={width} columns={columns} setWidth={this.setWidth} />
            <Body
              ref={elem => (this.body = elem)}
              data={data}
              width={width}
              focus={focus}
              onEnter={onEnter}
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
