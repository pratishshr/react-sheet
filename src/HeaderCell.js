import classNames from 'classnames';
import React, { PureComponent } from 'react';

const DEFAULT_WIDTH = 100;
class HeaderCell extends PureComponent {
  render() {
    const { Header, width, headerClassName } = this.props.column;

    return (
      <div
        key={Header}
        style={{
          flex: `${width || DEFAULT_WIDTH}  0 auto`,
          width: width || DEFAULT_WIDTH
        }}
        className={classNames('t-head', headerClassName)}
      >
        {Header}
      </div>
    );
  }
}

export default HeaderCell;
