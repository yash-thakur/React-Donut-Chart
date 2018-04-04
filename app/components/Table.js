import React, { Component } from 'react';
import _ from 'lodash';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: _.get(this.props, 'data', []),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(_.get(this.props, 'data', []), _.get(nextProps, 'data', []))) {
      this.setState({
        data: _.get(nextProps, 'data', []),
      });
    }
  }
  render() {
    return (
      <div>
        <table width="100%">
          <tr>
            <th>Project Id</th>
            <th>Customer</th>
            <th>Task Promised</th>
          </tr>
          {
           _.map(this.state.data, (item, key) => {
             if (_.get(item, 'Task_Promised', false) !== 'null') {
               return (
                 <tr key={key}>
                   <td>{_.get(item, 'Project_Id', '')}</td>
                   <td>{_.get(item, 'Customer', '')}</td>
                   <td>{_.get(item, 'Task_Promised', '')}</td>
                 </tr>
               );
             } return null;
           })
          }
        </table>
      </div>
    );
  }
}
