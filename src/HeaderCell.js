import classNames from 'classnames';
import React, { Component } from 'react';

const DEFAULT_WIDTH = 100;
class HeaderCell extends Component {
  shouldComponentUpdate(nextProps) {
    const { column } = this.props;

    if (column.Header === nextProps.column.Header) {
      return false;
    }

    return true;
  }

  render() {
    const { Header, width, headerClassName } = this.props.column;

    return (
      <div
        key={Header}
        style={{
          width: width || DEFAULT_WIDTH,
          maxWidth: width || DEFAULT_WIDTH
        }}
        className={classNames('t-head', headerClassName)}
      >
        {Header}
      </div>
    );
  }
}

export default HeaderCell;
