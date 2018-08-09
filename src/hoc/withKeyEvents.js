import _get from 'lodash/get';
import React, { Component } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import * as clipboard from '../utils/clipboard';

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

const ALLOWED_KEYS_WHILE_FOCUSED = [
  keys.TAB,
  keys.ENTER,
  keys.ESCAPE,
  keys.RIGHT,
  keys.LEFT
];

const SPECIAL_KEYS_WHILE_FOCUSED = [keys.RIGHT, keys.LEFT];

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
        },
        isFocusedDirectly: false
      };
      this.elem;
    }

    componentWillUnmount() {
      this.removeAllListeners();
    }

    addListeners = () => {
      window.addEventListener('keydown', this.onKeyDown, false);
      window.addEventListener('keypress', this.onKeyPress, false);
      window.addEventListener('copy', this.copySelection, false);
      window.addEventListener('paste', this.pasteSelection, false);
    };

    removeListeners = () => {
      window.removeEventListener('keydown', this.onKeyDown, false);
      window.removeEventListener('copy', this.copySelection, false);
      window.removeEventListener('paste', this.pasteSelection, false);
    };

    addListenersWhenFocused = () => {
      window.addEventListener('keydown', this.onKeyDownWhenFocused, false);
    };

    removeEscapeListener = () => {
      window.removeEventListener('keydown', this.onKeyDownWhenFocused, false);
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
      window.removeEventListener('keydown', this.onKeyDownWhenFocused, false);
      window.removeEventListener('keypress', this.onKeyPress, false);
      window.removeEventListener('copy', this.copySelection, false);
      window.removeEventListener('paste', this.pasteSelection, false);
    };

    /**
     * Focus while directly typing on selection.
     */
    onKeyPress = e => {
      if (!this.isFocused()) {
        this.focus();
        this.clearCell();
        this.setFocusedDirectly(true);
      }
    };

    setFocusedDirectly = isFocusedDirectly => {
      this.setState({ isFocusedDirectly });
    };

    /**
     * Key events when not focused in the table.
     */
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

      press[keyCode] && press[keyCode](e);
    };

    /**
     * Key events when focused in a particular cell.
     */
    onKeyDownWhenFocused = e => {
      const keyCode = e.keyCode;

      if (!ALLOWED_KEYS_WHILE_FOCUSED.includes(keyCode)) {
        return;
      }

      const { isFocusedDirectly } = this.state;

      let press = {
        [keys.TAB]: this.moveRight,
        [keys.ENTER]: this.moveDown,
        [keys.RIGHT]: isFocusedDirectly && this.moveRight,
        [keys.LEFT]: isFocusedDirectly && this.moveLeft
      };

      if (!SPECIAL_KEYS_WHILE_FOCUSED.includes(keyCode) || isFocusedDirectly) {
        e.preventDefault();

        this.defocus();
      }

      press[keyCode] && press[keyCode]();
    };

    defocus = () => {
      this.blur();
      this.addListeners();
      this.removeEscapeListener();
      this.setFocusedDirectly(false);
    };

    copySelection = e => {
      e.preventDefault();
      let { row, column } = this.state.selection;
      let data = this.getCellData(row, column) || '';

      e.clipboardData.setData('text/plain', data);
    };

    pasteSelection = e => {
      e.preventDefault();
      let data = clipboard.parse(e.clipboardData.getData('text/plain'));

      data.forEach((lines, rowIndex) => {
        lines.forEach((cellData, colIndex) => {
          let { row, column } = this.state.selection;

          this.writeToCell(
            {
              row: row + rowIndex,
              column: column + colIndex
            },
            cellData
          );
        });
      });
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

      if (row !== null && column !== null) {
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

      if (!cell) {
        return false;
      }

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
        this.addListenersWhenFocused();
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

    getCellData = (row, column) => {
      const { data, columns } = this.props;
      const rowData = data[row];
      const columnData = columns[column];

      return _get(rowData, columnData.accessor);
    };

    clearCell = () => {
      this.writeToCell(this.state.selection, '');
    };

    writeToCell = (selection, value) => {
      const { row, column } = selection;

      if (!this.isCellEditable(row, column)) {
        return;
      }

      const { data, columns, handleChange } = this.props;
      const rowData = data[row];
      const columnData = columns[column];

      handleChange(rowData.id, columnData.accessor, value);
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

    /**
     * Enter event for select component.
     */
    onSelectEnter = () => {
      this.defocus();
      this.moveDown();
    };

    render() {
      const { selection, focusedCell } = this.state;

      return (
        <WrappedComponent
          removeAllListeners={this.removeAllListeners}
          focus={this.focus}
          onClick={this.addListeners}
          selection={selection}
          onEnter={this.onSelectEnter}
          focusedCell={focusedCell}
          setSelection={this.setSelection}
          {...this.props}
        />
      );
    }
  };
}

export default withKeyEvents;
