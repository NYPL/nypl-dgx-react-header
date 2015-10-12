import React from 'react';
import Radium from 'radium';
import cx from 'classnames';
import ReactTappable from 'react-tappable';
import moment from 'moment';
import _ from 'underscore';
import axios from 'axios';
import config from '../../../../appConfig.js';

import AlertsBox from '../AlertsBox/AlertsBox.jsx';

class GlobalAlerts extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      globalAlerts: []
    };
  }

  componentDidMount() {
    //Fetch the Global Alerts via Client
    this._fetchGlobalAlerts();
  }

  render () {
    let currentGlobalAlerts = this._filterCurrentClosingAlerts(this.state.globalAlerts);

    return currentGlobalAlerts && currentGlobalAlerts.length ? (
      <div className={this.props.className} id={this.props.id} style={styles.base}>
        <AlertsBox 
          alerts={currentGlobalAlerts} 
          id={`${this.props.className}-Box`}
          className={`${this.props.className}-Box`} />
      </div>
    ) : null;
  }

  _fetchGlobalAlerts() {
    let self = this;

    axios
      .get(config.alertsApiUrl)
      .then(result => {
        if (result.data && result.data.data) {
          self.setState({
            globalAlerts: result.data.data
          });
        }
      })
      .catch(error => {
        console.warn('Error on Global Alerts fetch.');
        console.log(error);
      });
  }


  _filterCurrentClosingAlerts(obj) {
    if (!obj) {
      return [];
    }

    let today = moment(),
      sDate,
      eDate;

    return _.filter(obj, (elem) => {
      if (elem.attributes) {
        if (elem.attributes['display-date-start'] && elem.attributes['display-date-end']) {
          sDate = moment(elem.attributes['display-date-start']);
          eDate = moment(elem.attributes['display-date-end']);

          if (sDate.valueOf() <= today.valueOf() &&
            eDate.valueOf() >= today.valueOf()) {
            return elem;
          }
        }
      }
    });
  }

}

GlobalAlerts.defaultProps = {
  lang: 'en',
  className: 'GlobalAlerts',
  id: 'GlobalAlerts'
};

const styles = {
  base: {
    backgroundColor: '#fee24a',
    textAlign: 'center',
    width: '100%',
    margin: 0,
    padding: '10px 0'
  }
}

export default Radium(GlobalAlerts);
