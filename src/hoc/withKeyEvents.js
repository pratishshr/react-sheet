import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import React, { Component } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { getRange } from '../utils/calculations';
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
        selectionEnd: {
          row: null,
          column: null
        },
        focusedCell: {
          row: null,
          column: null
        },
        isSelecting: false,
        isFocusedDirectly: false,
        dragCopyValue: null
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
      window.addEventListener('cut', this.cutSelection, false);
      window.addEventListener('paste', this.pasteSelection, false);
      window.addEventListener('selectstart', this.preventDefault, false);
      window.addEventListener('mouseup', this.onMouseUpOutside, false);
    };

    onMouseUpOutside = () => {
      this.setIsSelecting(false);
    };

    removeListeners = () => {
      window.removeEventListener('keydown', this.onKeyDown, false);
      window.removeEventListener('copy', this.copySelection, false);
      window.removeEventListener('paste', this.pasteSelection, false);
      window.removeEventListener('cut', this.cutSelection, false);
    };

    addListenersWhenFocused = () => {
      window.addEventListener('keydown', this.onKeyDownWhenFocused, false);
    };

    removeEscapeListener = () => {
      window.removeEventListener('keydown', this.onKeyDownWhenFocused, false);
    };

    preventDefault = e => {
      e.preventDefault();
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
        },
        selectionEnd: {
          row: null,
          column: null
        }
      });

      window.removeEventListener('keydown', this.onKeyDown, false);
      window.removeEventListener('keydown', this.onKeyDownWhenFocused, false);
      window.removeEventListener('keypress', this.onKeyPress, false);
      window.addEventListener('cut', this.cutSelection, false);
      window.removeEventListener('copy', this.copySelection, false);
      window.removeEventListener('paste', this.pasteSelection, false);
      window.removeEventListener('selectstart', this.preventDefault, false);
      window.removeEventListener('mouseup', this.onMouseUpOutside, false);
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
      let values = this.getSelectedCellValues();
      let data = clipboard.stringify(values);

      e.clipboardData.setData('text/plain', data);
    };

    cutSelection = e => {
      this.copySelection(e);
      this.clearCell();
    };

    pasteSelection = e => {
      e.preventDefault();
      let data = clipboard.parse(e.clipboardData.getData('text/plain'));
      let state = this.props.state;

      data.forEach((lines, rowIndex) => {
        lines.forEach((cellData, colIndex) => {
          let { row, column } = this.state.selection;
          state = this.prepareState(
            state,
            {
              row: row + rowIndex,
              column: column + colIndex
            },
            cellData.trim()
          );
        });
      });

      this.changeState(state);
    };

    scrollToCell = (row, column) => {
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
        },
        selectionEnd: {
          row,
          column
        }
      });
    };

    setSelectionEnd = (row, column) => {
      this.setState({
        selectionEnd: {
          row: row,
          column: column
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
      let { columns } = this.props;
      let columnData = columns[column];
      let className = columnData.className;

      if (!className) {
        return false;
      }

      return className.split(' ').includes('editable');
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
        this.setSelectionEnd(row, column);
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

    getSelectedCellValues = () => {
      let cells = this.getSelectedCells();

      return cells.map(row => {
        return row.map(({ row, column }) => {
          let data = this.getCellData(row, column);

          if (data === undefined || data === null) {
            return '';
          }

          return data;
        });
      });
    };

    getSelectedCells = () => {
      const { selection, selectionEnd } = this.state;
      const { row, column } = selection;
      const { row: rowEnd, column: columnEnd } = selectionEnd;
      let selectedCells = [];

      getRange(row, rowEnd).forEach(i => {
        let rows = [];

        getRange(column, columnEnd).forEach(j => {
          rows.push({
            row: i,
            column: j
          });
        });

        selectedCells.push(rows);
      });

      return selectedCells;
    };

    getCellData = (row, column) => {
      const { data, columns } = this.props;

      const rowData = data[row];
      const columnData = columns[column];

      return _get(rowData, columnData.accessor);
    };

    clearCell = () => {
      let cells = this.getSelectedCells();
      let state = this.props.state;

      cells.forEach(row => {
        row.forEach(selection => {
          state = this.prepareState(state, selection, '');
        });
      });

      this.changeState(state);
    };

    changeState = state => {
      this.props.changeStateInBulk(state);
    };

    writeToCell = (selection, value) => {
      const { row, column } = selection;

      if (!this.isCellEditable(row, column)) {
        return;
      }
      const { state, data, columns, changeStateInBulk } = this.props;
      const rowData = data[row];
      const columnData = columns[column];

      let newState = {
        ...state,
        [rowData.id]: _set(columnData.accessor)(value)(state[rowData.id])
      };

      changeStateInBulk(newState);
    };

    prepareState = (state, selection, value) => {
      const { row, column } = selection;
      const { data, columns, changeStateInBulk } = this.props;

      if (!this.isCellEditable(row, column) || !data[row]) {
        return state;
      }

      const rowData = data[row];
      const columnData = columns[column];

      let newState = {
        ...state,
        [rowData.id]: _set(columnData.accessor)(value)(state[rowData.id])
      };

      return newState;
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
    };

    setIsSelecting = isSelecting => {
      this.setState({ isSelecting });
    };

    onMouseDown = (rowIndex, colIndex) => {
      return () => {
        this.setIsSelecting(true);
        this.setSelection(rowIndex, colIndex);
      };
    };

    onMouseUp = (rowIndex, colIndex) => {
      return () => {
        this.setIsSelecting(false);
        this.setSelectionEnd(rowIndex, colIndex);

        let { dragCopyValue } = this.state;

        if (dragCopyValue || dragCopyValue === 0) {
          let state = this.props.state;
          let cells = this.getSelectedCells();

          cells.forEach(row => {
            row.forEach(selection => {
              state = this.prepareState(state, selection, dragCopyValue);
            });
          });

          this.setDragCopyValue(null);
          this.changeState(state);
        }
      };
    };

    onMouseOver = (rowIndex, colIndex) => {
      return () => {
        const { isSelecting } = this.state;

        if (isSelecting) {
          this.setSelectionEnd(rowIndex, colIndex);
        }
      };
    };

    setDragCopyValue = value => {
      this.setState({
        dragCopyValue: value
      });
    };

    render() {
      const { selection, isSelecting, selectionEnd, focusedCell } = this.state;

      return (
        <WrappedComponent
          removeAllListeners={this.removeAllListeners}
          isSelecting={isSelecting}
          focus={this.focus}
          onClick={this.addListeners}
          selection={selection}
          selectionEnd={selectionEnd}
          onEnter={this.onSelectEnter}
          focusedCell={focusedCell}
          onMouseUp={this.onMouseUp}
          onMouseDown={this.onMouseDown}
          onMouseOver={this.onMouseOver}
          setSelection={this.setSelection}
          setSelectionEnd={this.setSelectionEnd}
          setDragCopyValue={this.setDragCopyValue}
          {...this.props}
        />
      );
    }
  };
}

export default withKeyEvents;
