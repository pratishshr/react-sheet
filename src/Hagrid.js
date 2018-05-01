import './assets/style.scss';

import React, { Component } from 'react';

import Body from './Body';
import Input from './Input';
import Header from './Header';
import Select from './Select';

class Hagrid extends Component {
  render() {
    const { data, columns } = this.props;

    return (
      <div className="container">
        <div className="data-table">
          <Header columns={columns} />
          <Body data={data} columns={columns} />
        </div>
      </div>
    );
  }
}

export default class extends Component {
  constructor() {
    super();
    this.columns = [
      {
        Header: 'ID',
        Cell: row => row.index + 1,
        className: 'font-weight-normal',
        width: 40
      },
      {
        Header: <span>Soil Depth</span>,
        accessor: 'input.depth',
        headerClassName: 'editable',
        className: 'editable',
        width: 90,
        Cell: row => (
          <Input
            id={row.original.id}
            name="input.depth"
            value={row.value}
            handleChange={this.handleChange}
          />
        )
      },
      {
        Header: 'Soil Type',
        accessor: 'input.soilType',
        headerClassName: 'editable',
        className: 'editable selectable',
        width: 100,
        Cell: row => (
          <Select
            id={row.original.id}
            name="input.soilType"
            value={row.value}
            handleChange={this.handleChange}
            options={[
              {
                label: '1',
                value: '1'
              },
              {
                label: '2',
                value: '2'
              }
            ]}
          />
        )
      },
      {
        Header: 'NF',
        accessor: 'input.blowCount',
        headerClassName: 'editable',
        className: 'editable',
        width: 40,
        Cell: row => (
          <Input
            id={row.original.id}
            name="input.blowCount"
            value={row.value}
            handleChange={this.handleChange}
          />
        )
      },
      {
        Header: 'Const',
        accessor: 'input.const',
        headerClassName: 'editable',
        className: 'editable',
        width: 50,
        Cell: row => (
          <Input
            id={row.original.id}
            name="input.const"
            value={row.value}
            handleChange={this.handleChange}
          />
        )
      },
      {
        Header: '%fines',
        accessor: 'input.percentFines',
        headerClassName: 'editable',
        className: 'editable',
        width: 50,
        Cell: row => (
          <Input
            id={row.original.id}
            name="input.percentFines"
            value={row.value}
            handleChange={this.handleChange}
          />
        )
      },
      {
        Header: 'MC',
        accessor: 'input.MC',
        headerClassName: 'editable',
        className: 'editable',
        width: 40,
        Cell: row => (
          <Input
            id={row.original.id}
            name="input.MC"
            value={row.value}
            handleChange={this.handleChange}
          />
        )
      },
      {
        Header: 'LL',
        accessor: 'input.LL',
        headerClassName: 'editable',
        className: 'editable',
        width: 40,
        Cell: row => (
          <Input
            id={row.original.id}
            name="input.LL"
            value={row.value}
            handleChange={this.handleChange}
          />
        )
      },
      {
        Header: "E's (kPa)",
        accessor: 'calculated.ESinKPA',
        width: 100
      },
      {
        Header: "E's (psf)",
        accessor: 'calculated.ESinPSF',
        width: 100
      },
      {
        Header: 'Elevation (ft)',
        accessor: 'calculated.elevation',
        width: 75
      },
      {
        Header: 'CN',
        accessor: 'calculated.overburdenCorrectionFactor_CN',
        width: 50
      },
      {
        Header: 'N1-60',
        accessor: 'calculated.N160',
        width: 100
      },
      {
        Header: 'N1-60(CS)',
        accessor: 'calculated.N160_CS',
        width: 100
      },
      {
        Header: 'Constrained Modulus',
        accessor: 'calculated.constrainedModulus',
        width: 100
      }
    ];
  }

  render() {
    return (
      <Hagrid
        data={[
          {
            input: {
              depth: '1',
              soilType: '1',
              percentFines: '4',
              blowCount: '2',
              MC: '1',
              LL: '2',
              const: '3'
            },
            calculated: {
              depth_input: 1,
              soilType_input: 'SM',
              percentFines_input: 4,
              blowCount_NF_input: 2,
              elevation: 0,
              currentUnitWeight: 139.23,
              totalStress_SVo: 278.46,
              effectiveStress_ESVO: 278.46,
              energyCorrectionFactor_CE: 3.33,
              boreholeCorrectionFactor_CB: 1,
              rodLengthCorrectionFactor_CR: 0.75,
              linerCorrectionFactor_CS: 1.1,
              overburdenCorrectionFactor_CN: 1.7,
              deltaN: 0,
              N160: 4.67,
              N160_CS: 4.67,
              ESinKPA: 14.01,
              ESinPSF: 292.63,
              constrainedModulus: 146
            },
            override: {
              elevation: null,
              currentUnitWeight: null,
              totalStress_SVo: null,
              effectiveStress_ESVO: null,
              energyCorrectionFactor_CE: null,
              boreholeCorrectionFactor_CB: null,
              rodLengthCorrectionFactor_CR: null,
              linerCorrectionFactor_CS: null,
              overburdenCorrectionFactor_CN: null,
              deltaN: null,
              N160: null,
              N160_CS: null,
              ESinKPA: null,
              ESinPSF: null,
              constrainedModulus: null
            },
            id: '1'
          },
          {
            input: {
              depth: '2',
              soilType: '1',
              percentFines: '5',
              blowCount: '3',
              MC: '5',
              LL: '6',
              const: '45'
            },
            calculated: {
              depth_input: 2,
              soilType_input: 'SM',
              percentFines_input: 5,
              blowCount_NF_input: 3,
              elevation: -1,
              currentUnitWeight: 139.23,
              totalStress_SVo: 278.46,
              effectiveStress_ESVO: 278.46,
              energyCorrectionFactor_CE: 3.33,
              boreholeCorrectionFactor_CB: 1,
              rodLengthCorrectionFactor_CR: 0.75,
              linerCorrectionFactor_CS: 1.1,
              overburdenCorrectionFactor_CN: 1.7,
              deltaN: 0,
              N160: 4.67,
              N160_CS: 4.67,
              ESinKPA: 210.16,
              ESinPSF: 4389.38,
              constrainedModulus: 2195
            },
            override: {
              elevation: null,
              currentUnitWeight: null,
              totalStress_SVo: null,
              effectiveStress_ESVO: null,
              energyCorrectionFactor_CE: null,
              boreholeCorrectionFactor_CB: null,
              rodLengthCorrectionFactor_CR: null,
              linerCorrectionFactor_CS: null,
              overburdenCorrectionFactor_CN: null,
              deltaN: null,
              N160: null,
              N160_CS: null,
              ESinKPA: null,
              ESinPSF: null,
              constrainedModulus: null
            },
            id: '2'
          }
        ]}
        sortable={true}
        resizable={true}
        pageSize={[]}
        columns={this.columns}
        showPagination={true}
        noDataText={'No data to display'}
      />
    );
  }
}
