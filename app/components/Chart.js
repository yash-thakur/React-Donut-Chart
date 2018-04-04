import React, { Component } from 'react';
import _ from 'lodash';
import { Doughnut } from 'react-chartjs-2';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataSet: {
        datasets: [{
          data: [],
          backgroundColor: [
            '#E53935',
            '#9C27B0',
            '#3949AB',
            '#039BE5',
            '#00897B',
            '#7CB342',
            '#F57F17',
            '#F4511E',
          ],
          label: 'Company Designers Data',
        }],
        labels: [],
      },
    };
  }
  componentWillMount() {
    this.getData(this.props);
  }
  getData(props) {
    const jsonData = _.get(props, 'jsonData', {});
    const rawData = jsonData[_.get(this.props, 'title', '')];
    const data = {};
    _.map(rawData, (item) => {
      const assg = item.Assigned_To;
      if (Object.keys(data).indexOf(assg) >= 0) {
        data[assg].push(item);
      } else {
        data[assg] = [];
        data[assg].push(item);
      }
    });
    const keys = Object.keys(data);
    const dataSet = _.map(keys, (deg) => {
      return (data[deg].length / rawData.length);
    });
    const stateObject = this.state.dataSet;
    _.set(stateObject, 'datasets[0].data', dataSet);
    _.set(stateObject, 'datasets[0].label', keys);
    _.set(stateObject, 'labels', keys);
    this.setState({
      dataSet: stateObject,
      data,
    });
  }
  selectedData(elem) {
    if (_.isEmpty(elem)) return;
    const firstPoint = _.first(elem);
    // eslint-disable-next-line
    const label = this.state.dataSet.labels[firstPoint._index];
    // eslint-disable-next-line
    this.props.setData(this.state.data[label]);
  }
  render() {
    const options = {
      responsive: true,
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Open Projects for Company Design Center',
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    };
    return (
      <div style={{ width: '33%' }}><Doughnut data={this.state.dataSet} options={options} height={150} width={300} getElementAtEvent={dataset => this.selectedData(dataset)} />
      </div>
    );
  }
}
