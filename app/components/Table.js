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
    const styles = {
      table: {
        borderCollapse: 'collapse',
        width: '100%',
      },
      td: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
      },
      th: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
      },
    };
    return (
      <div>
        <table style={styles.table}>
          <tr>
            <th style={styles.th}>Project Id</th>
            <th style={styles.th}>Customer</th>
            <th style={styles.th}>Task Promised</th>
          </tr>
          {
           _.map(this.state.data, (item, key) => {
             if (_.get(item, 'Task_Promised', false) !== 'null') {
               return (
                 <tr key={key}>
                   <td style={styles.td}>{_.get(item, 'Project_Id', '')}</td>
                   <td style={styles.td}>{_.get(item, 'Customer', '')}</td>
                   <td style={styles.td}>{_.get(item, 'Task_Promised', '')}</td>
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
