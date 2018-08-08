import classnames from 'classnames';
import React, { Component } from 'react';

class Checkbox extends Component {
  render() {
    const { isSelected, onClick } = this.props;

    return (
      <div
        className={classnames('fake-checkbox', {
          selected: isSelected
        })}
        onClick={onClick}
      >
        <input type="checkbox" checked={isSelected} />
      </div>
    );
  }
}

export default Checkbox;
