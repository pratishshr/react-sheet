import './assets/style.scss';
import React, { Component } from 'react';

import Body from './Body';
import Input from './Input';
import Header from './Header';
import Select from './Select';
import { Scrollbars } from 'react-custom-scrollbars';

class Hagrid extends Component {
  render () {
    const { data, columns } = this.props;

    return (
        <div className="data-table">
          <Scrollbars
           >
            <Header columns={columns} />
            <Body data={data} columns={columns} />
          </Scrollbars>
        </div>
    );
  }
}

export default Hagrid;
