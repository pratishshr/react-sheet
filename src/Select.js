import 'react-select/dist/react-select.css';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ReactSelect from 'react-select';

class PortalSelect extends ReactSelect {
  constructor() {
    super();

    this.portalTop = null;
    this.portalLeft = null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    super.componentDidUpdate(prevProps, prevState, snapshot);

    if (prevState.isOpen !== this.state.isOpen && !this.state.isOpen) {
      this.portalTop = null;
      this.portalLeft = null;
    }
  }

  renderOuter(options, valueArray, focusedOption) {
    const dimensions = this.wrapper
      ? this.wrapper.getBoundingClientRect()
      : null;
    const menu = super.renderMenu(options, valueArray, focusedOption);

    if (!menu || !dimensions) return null;

    const maxHeight =
      document.body.offsetHeight - (dimensions.top + dimensions.height);

    this.portalLeft = this.portalLeft || dimensions.left;
    this.portalTop = this.portalTop || dimensions.top + dimensions.height;

    let portal = ReactDOM.createPortal(
      <div
        ref={ref => {
          this.menuContainer = ref;
        }}
        className="Select-menu-outer"
        onClick={e => {
          e.stopPropagation();
        }}
        style={{
          ...this.props.menuContainerStyle,
          zIndex: 9999,
          position: 'absolute',
          width: dimensions.width,
          top: this.portalTop,
          left: this.portalLeft,
          maxHeight: Math.min(maxHeight, 200),
          overflow: 'hidden'
        }}
      >
        <div
          ref={ref => {
            this.menu = ref;
          }}
          role="listbox"
          tabIndex={-1}
          className="Select-menu"
          id={`${this._instancePrefix}-list`}
          style={{
            ...this.props.menuStyle,
            maxHeight: Math.min(maxHeight, 200)
          }}
          onScroll={this.handleMenuScroll}
          onMouseDown={this.handleMouseDownOnMenu}
        >
          {menu}
        </div>
      </div>,
      document.body
    );

    return portal;
  }
}
class Select extends Component {
  constructor() {
    super();

    this.select;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocused !== this.props.isFocused) {
      if (nextProps.isFocused) {
        this.focus();
      }
    }
  }

  focus = () => {
    this.select.focus();
  };

  onChange = selectedOption => {
    const { value } = selectedOption;
    const { id, name, handleChange } = this.props;

    handleChange(id, name, value);
  };

  render() {
    const {
      name,
      value,
      options,
      clearable = false,
      searchable = false
    } = this.props;

    return (
      <PortalSelect
        ref={elem => (this.select = elem)}
        name={name}
        value={value}
        options={options}
        clearable={clearable}
        searchable={searchable}
        onChange={this.onChange}
        autoBlur
      />
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  handleChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  )
};

export default Select;
