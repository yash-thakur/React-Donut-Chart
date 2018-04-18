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
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', width: '100%' }}>
          <div style={{ flex: '0 0 18%', margin: '10px' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart1} title="Rigefield_Park" url="http://localhost:3000/api/WfRidgefieldparks/showRigefieldPark" chartTitle="Ridgefield Park Design Center" />
          </div>
          <div style={{ flex: '0 0 18%', margin: '10px' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart2} title="Erlanger" url="http://localhost:3000/api/WfErlangers/showErlanger" chartTitle="Erlanger Design Center" />
          </div>
          <div style={{ flex: '0 0 18%', margin: '10px' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart3} title="Westmont" url="http://localhost:3000/api/WfWestmonts/showWestmont" chartTitle="Westmont Design Center" />
          </div>
          <div style={{ flex: '0 0 18%', margin: '10px' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart4} title="Winston_Salem" url="http://localhost:3000/api/WfWinstons/showWinston" chartTitle="Winston Design Center" />
          </div>
          <div style={{ flex: '0 0 18%', margin: '10px' }}>
            <Chart setData={data => this.setCurrentData(data)} jsonData={Chart5} title="York" url="http://localhost:3000/api/WfYorks/showYork" chartTitle="York Design Center" />
          </div>
        </div>
        <div style={{ flex: '0 0 30%', margin: '10px' }}>
          <Table data={this.state.data} />
        </div>
      </div>
    );
  }
}
