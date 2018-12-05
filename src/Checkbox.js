import classnames from 'classnames';
import React, { Component } from 'react';

class Checkbox extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.isSelected !== nextProps.isSelected || this.props.id !== nextProps.id) {
      return true;
    }

    return false;
  }

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
