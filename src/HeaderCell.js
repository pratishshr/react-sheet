import classNames from 'classnames';
import React, { Component } from 'react';

class HeaderCell extends Component {
  shouldComponentUpdate(nextProps) {
    const { column } = this.props;

    if (column.Header === nextProps.column.Header) {
      return false;
    }

    return true;
  }

  render() {
    const { Header, width, headerClassname } = this.props.column;

    return (
      <div
        key={Header}
        style={{ width: width, maxWidth: width }}
        className={classNames('t-head', headerClassname)}
      >
        {Header}
      </div>
    );
  }
}

export default HeaderCell;
