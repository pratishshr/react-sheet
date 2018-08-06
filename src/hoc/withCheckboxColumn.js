import React, { Component } from 'react';

function withCheckboxColumn(WrappedComponent) {
  return class CheckboxWrapper extends Component {
    constructor() {
      super();
      this.state = {
        selections: []
      };
    }

    getCheckboxColumn = () => {
      return {
        Header: (
          <div className="checkbox-wrap d-flex">
            <div
              className={
                this.checkAllSelected()
                  ? selectedCheckboxClass
                  : unselectedCheckboxClass
              }
              onClick={this.toggleAll}
            >
              <input type="checkbox" />
            </div>
          </div>
        ),
        headerClassName:
          'd-flex align-items-center justify-content-center fixed',
        accessor: 'isSelected',
        resizable: false,
        width: 36,
        className: 'd-flex align-items-center justify-content-center fixed',
        Cell: row => (
          <div className="checkbox-wrap d-flex">
            <div
              className={
                this.checkSelected(row.original.id)
                  ? selectedCheckboxClass
                  : unselectedCheckboxClass
              }
              id={row.original.id}
              onClick={this.toggleSelection}
            >
              <input type="checkbox" />
            </div>
          </div>
        )
      };
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withCheckboxColumn;
