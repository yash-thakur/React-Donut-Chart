import React, { Component } from 'react';
import _ from 'lodash';
import { Doughnut } from 'react-chartjs-2';
import { Parser as HtmlToReactParser } from 'html-to-react';


const htmlToReactParser = new HtmlToReactParser();
export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.chart = null;
    this.state = {
      url: _.get(this.props, 'url', ''),
      chartTitle: _.get(this.props, 'chartTitle', ''),
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
    fetch(this.state.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then((data) => {
      console.log(data);
    }).catch();
    this.getData(this.props);
  }
  componentDidMount() {
    this.forceUpdate();
  }
  onClickLegend(e) {
    const index = (e.currentTarget).index();
    this.legend.chart_instance.data.datasets[index].hidden =
    !this.legend.chart_instance.data.datasets[index].hidden;
    // (e.currentTarget).toggleClass('disable-legend');
    this.legend.chart_instance.update();
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
  // eslint-disable-next-line
  toggleHidden(e, meta, chart) {
    const newMeta = meta;
    newMeta.hidden = (meta.hidden === false) ? !meta.hidden : false;
    // console.log(newMeta.hidden);
    chart.update();
  }
  render() {
    let count = 0;
    _.map(this.state.data, (data) => { count += data.length; });
    const options = {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${this.state.chartTitle}: ${count} projects`,
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      legendCallback: (chart) => {
        const text = [];
        text.push('<ul style="list-style: none">');
        // eslint-disable-next-line
        for (let i = 0; i < _.first(chart.data.datasets).data.length; i++) {
          // console.log(chart);
          // const meta = chart.chart.legend.legendItems[i];
          text.push('<li style="marginBottom: 3px">');
          // console.log(meta);
          text.push(`<span style="height: 12px; width: 12px; vertical-align: middle; background-color: ${_.first(chart.data.datasets).backgroundColor[i]}; border-radius: 50%; display: inline-block;"></span>`);
          text.push(`<span class="legend-item"> ${_.first(chart.data.datasets).label[i]}</span>`);
          text.push('</li>');
        }
        text.push('</ul>');
        return text.join('');
      },
    };
    return (
      <div style={{ width: '100%' }}>
        <Doughnut
          data={this.state.dataSet}
          // eslint-disable-next-line
          ref="chart"
          options={options}
          height={100}
          width={100}
          getElementAtEvent={dataset => this.selectedData(dataset)}
        />
        {
          // eslint-disable-next-line
          this.refs.chart &&
            // eslint-disable-next-line
          htmlToReactParser.parse(this.refs.chart.chartInstance.generateLegend())
        }
      </div>
    );
  }
}
