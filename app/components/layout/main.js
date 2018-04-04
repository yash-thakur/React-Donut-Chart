import React, { Component } from 'react';
import Chart from '../Chart';
import Table from '../Table';
import Chart1 from '../../assets/json/RPjson.json';
import Chart2 from '../../assets/json/Erlangerjson.json';
import Chart3 from '../../assets/json/Westmontjson.json';
import Chart4 from '../../assets/json/WSjson.json';
import Chart5 from '../../assets/json/Yorkjson.json';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  setCurrentData(data) {
    this.setState({ data });
  }
  render() {
    return (
      <div>
        <div>
          <div style={{ display: 'inline' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart1} title="Rigefield_Park" />
          </div>
          <div style={{ display: 'inline' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart2} title="Erlanger" />
          </div>
          <div style={{ display: 'inline' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart3} title="Westmont" />
          </div>
          <div style={{ display: 'inline' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart4} title="Winston_Salem" />
          </div>
          <div style={{ display: 'inline' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart5} title="York" />
          </div>
        </div>
        <div>
          <Table data={this.state.data} />
        </div>
      </div>
    );
  }
}
