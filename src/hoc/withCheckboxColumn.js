import React, { Component } from 'react';

import Checkbox from '../Checkbox';

function withCheckboxColumn(WrappedComponent) {
  return class CheckboxWrapper extends Component {
    constructor() {
      super();
      this.state = {
        isSelectAllActive: false
      };
    }

    componentDidUpdate(prevProps) {
      if (this.props.data.length !== prevProps.data.length) {
        this.setSelectAllActive(false);
      }
    }

    selectAll = () => {
      const { data } = this.props;

      this.props.setSelections(data.map(row => row.id));
    };

    clearAll = () => {
      this.props.setSelections([]);
    };

    toggleSelectAll = () => {
      if (this.state.isSelectAllActive) {
        this.clearAll();
        this.setSelectAllActive(false);
        return;
      }

      this.setSelectAllActive(true);
      this.selectAll();
    };

    setSelectAllActive = isActive => {
      this.setState({
        isSelectAllActive: isActive
      });
    };

    removeSelection = index => {
      this.props.setSelections(
        this.props.selections.filter(selection => selection !== index)
      );
    };

    toggleSelection = index => {
      let { selections } = this.props;

      if (selections.includes(index)) {
        this.setSelectAllActive(false);
        this.removeSelection(index);
        return;
      }

      this.props.setSelections([...selections, index]);
    };

    getCheckboxColumn = () => {
      return {
        Header: (
          <div className="checkbox-wrap d-flex">
            <Checkbox
              isSelected={this.state.isSelectAllActive}
              onClick={this.toggleSelectAll}
            />
          </div>
        ),
        headerClassName:
          'd-flex align-items-center justify-content-center fixed',
        accessor: 'isSelected',
        resizable: false,
        width: 36,
        className: 'd-flex align-items-center justify-content-center fixed',
        Cell: (row, { id }) => (
          <div className="checkbox-wrap d-flex">
            <Checkbox
              isSelected={this.props.selections.includes(id)}
              onClick={() => this.toggleSelection(id)}
            />
          </div>
        )
      };
    };

    render() {
      const { columns, ...restProps } = this.props;
      const columnsWithCheckboxes = [this.getCheckboxColumn(), ...columns];

      return (
        <WrappedComponent
          columns={columnsWithCheckboxes} {...restProps} />
      );
    }
  };
}

export default withCheckboxColumn;
