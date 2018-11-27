import React, { Component } from 'react';
import { render } from 'react-dom';
import _set from 'lodash/fp/set';
import _cloneDeep from 'lodash/cloneDeep';
import _mapValues from 'lodash/mapValues';

import Hagrid, {
  Input,
  Select,
  withKeyEvents,
  withCheckboxColumn
} from '../../src';

const KeyHagrid = withCheckboxColumn(withKeyEvents(Hagrid));

const INITIAL_VALUE = {
  input: {
    depth: '',
    soilType: '',
    percentFines: '',
    blowCount: '',
    PL: '',
    MC: '',
    LL: '',
    const: '',
    currentUnitWeight: '',
    preConsolidationPressure: '',
    cohesion: '',
    compressionIndex: '',
    recompressionIndex: '',
    comments: ''
  },
  calculated: {
    elevation: null,
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
  }
};

function nextIndex(item) {
  let keys = Object.keys(item).sort((a, b) => a - b);
  let lastIndex = parseInt(keys[keys.length - 1], 10);

  if (!lastIndex) {
    return 1;
  }

  return ++lastIndex;
}

function nextSortIndex(item) {
  let keys = Object.keys(item).sort(
    (prev, next) => item[prev].sortIndex - item[next].sortIndex
  );
  let lastIndex = parseInt(keys[keys.length - 1], 10);

  if (!lastIndex) {
    return 1;
  }

  return ++lastIndex;
}

class Demo extends Component {
  constructor() {
    super();
    this.columns = [
      {
        Header: 'ID',
        Cell: row => <span>{row.index + 1}</span>,
        className: 'font-weight-normal fixed',
        headerClassName: 'fixed',
        width: 40,
      },
      {
        Header: <span>Soil Depth</span>,
        accessor: 'input.depth',
        headerClassName: 'editable',
        className: 'editable',
        width: 90,
        Cell: (row, { isFocused }) => (
          <Input
            type="number"
            isFocused={isFocused}
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
        Cell: (row, { isFocused, onEnter }) => (
          <Select
            searchable
            id={row.original.id}
            isFocused={isFocused}
            name="input.soilType"
            value={row.value}
            noResultsText="No data found"
            handleChange={this.handleChange}
            onEnter={onEnter}
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
        Cell: (row, { isFocused }) => (
          <Input
            isFocused={isFocused}
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
        Cell: (row, { isFocused }) => (
          <Input
            isFocused={isFocused}
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
        Cell: (row, { isFocused }) => (
          <Input
            isFocused={isFocused}
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
        Cell: (row, { isFocused }) => (
          <Input
            isFocused={isFocused}
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
        Cell: (row, { isFocused }) => (
          <Input
            name="input.LL"
            isFocused={isFocused}
            id={row.original.id}
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
        width: 100,
        className: "l-fixed",
        headerClassName: 'l-fixed'

      }
    ];
    this.state = {
      selections: [],
      pastedColumnAccessors: [],
      data: {
        '1': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '5',
            cohesion: '',
            comments: '',
            soilType: 'OM',
            blowCount: 10,
            percentFines: 0,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 90.19,
            depth: 5,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 95,
            totalStress_SVo: null,
            currentUnitWeight: 90.19,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 0
        },
        '2': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '10',
            cohesion: '',
            comments: '',
            soilType: 'OM',
            blowCount: 10,
            percentFines: 0,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 90.19,
            depth: 10,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 90,
            totalStress_SVo: null,
            currentUnitWeight: 90.19,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 1
        },
        '3': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '15',
            cohesion: '',
            comments: '',
            soilType: 'OM',
            blowCount: 10,
            percentFines: 0,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 90.19,
            depth: 15,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 85,
            totalStress_SVo: null,
            currentUnitWeight: 90.19,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 2
        },
        '4': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '20',
            cohesion: '',
            comments: '',
            soilType: 'GW',
            blowCount: 25,
            percentFines: 3,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 90.19,
            depth: 20,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 80,
            totalStress_SVo: null,
            currentUnitWeight: 90.19,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 3
        },
        '5': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '25',
            cohesion: '',
            comments: '',
            soilType: 'GW',
            blowCount: 25,
            percentFines: 3,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 90.19,
            depth: 25,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 75,
            totalStress_SVo: null,
            currentUnitWeight: 90.19,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 4
        },
        '6': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '30',
            cohesion: '',
            comments: '',
            soilType: 'GW',
            blowCount: 25,
            percentFines: 3,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 90.19,
            depth: 30,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 70,
            totalStress_SVo: null,
            currentUnitWeight: 90.19,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 5
        },
        '7': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '35',
            cohesion: '',
            comments: '',
            soilType: 'GM',
            blowCount: 25,
            percentFines: 15,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 125.89,
            depth: 35,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 65,
            totalStress_SVo: null,
            currentUnitWeight: 125.89,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 6
        },
        '8': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '40',
            cohesion: '',
            comments: '',
            soilType: 'GM',
            blowCount: 30,
            percentFines: 15,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 128.44,
            depth: 40,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 60,
            totalStress_SVo: null,
            currentUnitWeight: 128.44,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 7
        },
        '9': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '45',
            cohesion: '',
            comments: '',
            soilType: 'GM',
            blowCount: 30,
            percentFines: 15,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 128.44,
            depth: 45,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 55,
            totalStress_SVo: null,
            currentUnitWeight: 128.44,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 8
        },
        '10': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '50',
            cohesion: '',
            comments: '',
            soilType: 'SP',
            blowCount: 40,
            percentFines: 3,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 134.95,
            depth: 50,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 50,
            totalStress_SVo: null,
            currentUnitWeight: 134.95,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 9
        },
        '11': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '55',
            cohesion: '',
            comments: '',
            soilType: 'SP',
            blowCount: 40,
            percentFines: 3,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 134.95,
            depth: 55,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 45,
            totalStress_SVo: null,
            currentUnitWeight: 134.95,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 10
        },
        '12': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '60',
            cohesion: '',
            comments: '',
            soilType: 'SP',
            blowCount: 40,
            percentFines: 3,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 134.95,
            depth: 60,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 40,
            totalStress_SVo: null,
            currentUnitWeight: 134.95,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 11
        },
        '13': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '65',
            cohesion: '',
            comments: '',
            soilType: 'SP',
            blowCount: 40,
            percentFines: 3,
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: 134.95,
            depth: 65,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: 35,
            totalStress_SVo: null,
            currentUnitWeight: 134.95,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 12
        },
        '14': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 13
        },
        '15': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 14
        },
        '16': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 15
        },
        '17': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 16
        },
        '18': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 17
        },
        '19': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 18
        },
        '20': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 19
        },
        '21': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 20
        },
        '22': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 21
        },
        '23': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 22
        },
        '24': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 23
        },
        '25': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 24
        },
        '26': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 25
        },
        '27': {
          input: {
            LL: '',
            MC: '',
            PL: '',
            const: '',
            depth: '',
            cohesion: '',
            comments: '',
            soilType: '',
            blowCount: '',
            percentFines: '',
            compressionIndex: '',
            currentUnitWeight: '',
            recompressionIndex: '',
            preConsolidationPressure: ''
          },
          override: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          calculated: {
            N160: null,
            deltaN: null,
            ESinKPA: null,
            ESinPSF: null,
            N160_CS: null,
            elevation: null,
            totalStress_SVo: null,
            currentUnitWeight: null,
            constrainedModulus: null,
            effectiveStress_ESVO: null,
            linerCorrectionFactor_CS: null,
            energyCorrectionFactor_CE: null,
            boreholeCorrectionFactor_CB: null,
            rodLengthCorrectionFactor_CR: null,
            overburdenCorrectionFactor_CN: null
          },
          sortIndex: 26
        }
      }
    };
  }

  setSelections = selections => {
    this.setState({
      selections
    });
  };

  handleChange = (id, name, value) => {
    let { data } = this.state;

    this.setState({
      data: {
        ...data,
        [id]: _set(name)(value)(data[id])
      }
    });
  };

  changeStateInBulk = state => {
    this.setState({
      data: state
    });
  };

  getPastedColumnAccessors = pastedColumnAccessors => {
    this.setState({
      pastedColumnAccessors
    });
  };

  addRow = (index, id) => {
    let data = _mapValues(this.state.data, row => {
      if (row.sortIndex >= index + 1) {
        return {
          ...row,
          sortIndex: row.sortIndex + 1
        };
      }

      return row;
    });

    let newRow = _cloneDeep(INITIAL_VALUE);

    newRow.id = nextIndex(this.state.data);
    newRow.sortIndex = index + 1;

    this.changeStateInBulk({
      ...data,
      [newRow.id]: newRow
    });
  };

 
  render() {
    const { data } = this.state;
    let rows = Object.keys(data)
      .sort((a, b) => {
        return data[a].sortIndex - data[b].sortIndex;
      })
      .reduce(
        (acc, next) =>
          acc.concat({
            ...data[next],
            id: next
          }),
        []
      );

    return (
      <div>
        <h1>React Sheet</h1>
        <KeyHagrid
          state={data}
          data={rows}
          height={500}
          addRow={this.addRow}
          columns={this.columns}
          handleChange={this.handleChange}
          setSelections={this.setSelections}
          getPastedColumnAccessors={this.getPastedColumnAccessors}
          selections={this.state.selections}
          changeStateInBulk={this.changeStateInBulk}
          responsive={false}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
