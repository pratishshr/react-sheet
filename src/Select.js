import 'react-select/dist/react-select.css';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';
import React, { Component } from 'react';

import ReactSelect from 'react-select';

class PortalSelect extends ReactSelect {
  constructor() {
    super();

    this.portalTop = null;
    this.portalLeft = null;
    this.handleKeyDown = this.customHandleKeyDown.bind(this);
  }

  customHandleKeyDown(event) {
    if (this.props.disabled) return;

    if (typeof this.props.onInputKeyDown === 'function') {
      this.props.onInputKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    switch (event.keyCode) {
      case 8:
        // backspace
        if (!this.state.inputValue && this.props.backspaceRemoves) {
          event.preventDefault();
          this.popValue();
        }
        break;
      case 9:
        // tab
        if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
          break;
        }
        event.preventDefault();
        this.selectFocusedOption();
        break;
      case 13:
        // enter
        event.preventDefault();
        event.stopPropagation();
        if (this.state.isOpen) {
          this.selectFocusedOption();
        } else {
          // this.focusNextOption();
          this.setState({
            isOpen: true
          })
        }
        break;
      case 27:
        // escape
        event.preventDefault();
        if (this.state.isOpen) {
          this.closeMenu();
          this.props.onEscape();
          event.stopPropagation();
        } else if (this.props.clearable && this.props.escapeClearsValue) {
          this.clearValue(event);
          event.stopPropagation();
        }
        break;
      case 32:
        // space
        if (this.props.searchable) {
          break;
        }
        event.preventDefault();
        if (!this.state.isOpen) {
          this.focusNextOption();
          break;
        }
        event.stopPropagation();
        this.selectFocusedOption();
        break;
      case 38:
        // up
        event.preventDefault();
        this.focusPreviousOption();
        break;
      case 40:
        // down
        event.preventDefault();
        this.focusNextOption();
        break;
      case 33:
        // page up
        event.preventDefault();
        this.focusPageUpOption();
        break;
      case 34:
        // page down
        event.preventDefault();
        this.focusPageDownOption();
        break;
      case 35:
        // end key
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        this.focusEndOption();
        break;
      case 36:
        // home key
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        this.focusStartOption();
        break;
      case 46:
        // delete
        if (!this.state.inputValue && this.props.deleteRemoves) {
          event.preventDefault();
          this.popValue();
        }
        break;
    }
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

  shouldComponentUpdate(nextProps) {
    if (this.props.value !== nextProps.value) {
      return true;
    }

    return false;
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
    if (!selectedOption) {
      return;
    }

    const { value } = selectedOption;
    const { id, name, handleChange, onEnter } = this.props;

    onEnter && onEnter();
    handleChange(id, name, value);
  };

  onClose = _debounce(() => {
    const { onEnter } = this.props;

    if (onEnter) {
      onEnter();
    }
  });

  render() {
    const {
      name,
      value,
      options,
      clearable = false,
      searchable = false,
      onEscape,
      noResultsText = 'Not Found'
    } = this.props;

    return (
      <PortalSelect
        autoBlur
        name={name}
        tabIndex={-1}
        value={value}
        options={options}
        openOnFocus={true}
        clearable={clearable}
        onClose={this.onClose}
        onEscape={onEscape}
        onFocus={this.onFocus}
        searchable={searchable}
        onChange={this.onChange}
        noResultsText={noResultsText}
        ref={elem => (this.select = elem)}
      />
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string | PropTypes.bool,
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
