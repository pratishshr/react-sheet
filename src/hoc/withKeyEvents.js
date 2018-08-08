import React, { Component } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import * as keys from '../constants/keys';

const ALLOWED_KEYS = [
  keys.UP,
  keys.LEFT,
  keys.DOWN,
  keys.RIGHT,
  keys.ENTER,
  keys.TAB,
  keys.DELETE,
  keys.BACKSPACE
];

function withKeyEvents(WrappedComponent) {
  return class KeyWrapper extends Component {
    constructor() {
      super();
      this.state = {
        selection: {
          row: null,
          column: null
        },
        focusedCell: {
          row: null,
          column: null
        }
      };
      this.elem;
    }

    componentWillUnmount() {
      this.removeListeners();
    }

    addListeners = () => {
      window.addEventListener('keydown', this.onKeyDown, false);
      window.addEventListener('keypress', this.onKeyPress, false);
    };

    addEscapeListener = () => {
      window.addEventListener('keydown', this.onEscapeKeyDown, false);
    };

    removeEscapeListener = () => {
      window.removeEventListener('keydown', this.onEscapeKeyDown, false);
    };

    removeListeners = () => {
      window.removeEventListener('keydown', this.onKeyDown, false);
    };

    removeAllListeners = () => {
      this.setState({
        focusedCell: {
          row: null,
          column: null
        },
        selection: {
          row: null,
          column: null
        }
      });
      window.removeEventListener('keydown', this.onKeyDown, false);
      window.removeEventListener('keydown', this.onEscapeKeyDown, false);
      window.removeEventListener('keypress', this.onKeyPress, false);
    };

    /**
     * Focus while directly typing on selection.
     */
    onKeyPress = e => {
      if (!this.isFocused()) {
        this.focus();
      }
    };

    onEscapeKeyDown = e => {
      const keyCode = e.keyCode;

      if (keyCode === keys.ESCAPE) {
        e.preventDefault();

        this.blur();
        this.addListeners();
        this.removeEscapeListener();
      }
      if (keyCode === keys.ENTER) {
        e.preventDefault();

        this.onEnter();
      }
      if (keyCode === keys.TAB) {
        e.preventDefault();

        this.blur();
        this.addListeners();
        this.removeEscapeListener();
        this.moveRight();
      }
    };

    onEnter = () => {
      this.blur();
      this.moveDown();
      this.addListeners();
      this.removeEscapeListener();
    };

    scrollToCell = (row, column) => {
      const table = document.querySelector('#react-sheet-body');
      const cell = document.querySelector(`#cell-${row}-${column}`);

      scrollIntoView(cell, {
        block: 'nearest',
        inline: 'nearest'
      });
    };

    setSelection = (row, column) => {
      this.blur();
      this.scrollToCell(row, column);

      this.setState({
        focusedCell: {
          row: null,
          column: null
        },
        selection: {
          row,
          column
        }
      });
    };

    isFocused = () => {
      const { row, column } = this.state.focusedCell;

      if (row && column) {
        return true;
      }

      return false;
    };

    setFocus = (row, column) => {
      this.setState({
        focusedCell: {
          row,
          column
        }
      });
    };

    onKeyDown = e => {
      const keyCode = e.keyCode;

      if (!ALLOWED_KEYS.includes(keyCode)) {
        return;
      }

      e.preventDefault();

      let press = {
        [keys.UP]: this.moveUp,
        [keys.DOWN]: this.moveDown,
        [keys.LEFT]: this.moveLeft,
        [keys.RIGHT]: this.moveRight,
        [keys.TAB]: e.shiftKey ? this.moveLeft : this.moveRight,
        [keys.ENTER]: this.focus,
        [keys.BACKSPACE]: this.clearCell,
        [keys.DELETE]: this.clearCell
      };

      press[keyCode]();
    };

    moveUp = () => {
      let { selection } = this.state;

      let row = selection.row && selection.row - 1;
      let column = selection.column;

      this.setSelection(row, column);
    };

    moveDown = () => {
      let { selection } = this.state;
      let { data } = this.props;

      let row =
        selection.row < data.length - 1 ? selection.row + 1 : selection.row;
      let column = selection.column;

      this.setSelection(row, column);
    };

    moveLeft = () => {
      let { selection } = this.state;
      let row = selection.row;
      let column = selection.column && selection.column - 1;

      this.setSelection(row, column);
    };

    moveRight = () => {
      let { selection } = this.state;
      let { columns } = this.props;

      let row = selection.row;
      let column =
        selection.column < columns.length - 1
          ? selection.column + 1
          : selection.column;

      this.setSelection(row, column);
    };

    isCellEditable = (row, column) => {
      const cell = this.getCell(row, column);

      return cell.className.split(' ').includes('editable');
    };

    onBlur = () => {
      this.removeListeners();
    };

    focus = () => {
      const { row, column } = this.state.selection;

      const cell = this.getCell(row, column);
      const input = cell.querySelector('input');

      if (this.isCellEditable(row, column)) {
        input && input.focus();

        this.removeListeners();
        this.addEscapeListener();
        this.setFocus(row, column);
      }
    };

    blur = () => {
      const { row, column } = this.state.selection;

      const cell = this.getCell(row, column);

      if (cell) {
        const input = cell.querySelector('input');
        input && input.blur();
      }
    };

    clearCell = () => {
      const { row, column } = this.state.selection;
      const input = this.getInputFromCell(row, column);

      // Code to clear the input
    };

    getCell = (row, column) => {
      return document.querySelector(`#cell-${row}-${column}`);
    };

    getInputFromCell = (row, column) => {
      const cell = this.getCell(row, column);

      if (cell) {
        const input = cell.querySelector('input');

        return input;
      }

      return null;
    };

    render() {
      const { selection, focusedCell } = this.state;

      return (
        <WrappedComponent
          removeAllListeners={this.removeAllListeners}
          focus={this.focus}
          onClick={this.addListeners}
          selection={selection}
          onEnter={this.onEnter}
          focusedCell={focusedCell}
          setSelection={this.setSelection}
          {...this.props}
        />
      );
    }
  };
}

export default withKeyEvents;
