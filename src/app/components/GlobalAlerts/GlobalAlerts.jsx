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
      globalAlerts: [],
      hideAlertsBox: false,
      animateAlertsBox: false
    };
  }

  componentDidMount() {
    //Fetch the Global Alerts via Client
    //this._fetchGlobalAlerts();
  }

  render () {
    let currentGlobalAlerts = this._filterCurrentClosingAlerts(this.state.globalAlerts),
      classes = cx({
        'animatedFast fadeOutUp': this.state.animateAlertsBox,
        'hide': this.state.hideAlertsBox
      });

    return currentGlobalAlerts && currentGlobalAlerts.length ? (
      <div className={`${this.props.className} ${classes}`} id={this.props.id} style={styles.base}>
        <div className={`${this.props.className}-Wrapper`}>
          <ReactTappable 
            className={`${this.props.className}-CloseButton nypl-icon-circle-x`} 
            onTap={this._closeAlertsBox.bind(this)} />
          <AlertsBox 
            alerts={currentGlobalAlerts} 
            id={`${this.props.className}-Box`}
            className={`${this.props.className}-Box`} />
        </div>
      </div>
    ) : null;
  }

  /**
   * _closeAlertsBox() 
   * updates both state properties
   * (animateAlertsBox & hideAlertsBox)
   * with a setTimeout to allow css transition.
   */
  _closeAlertsBox() {
    this.setState({animateAlertsBox: true});

    setTimeout(() => {
      this.setState({hideAlertsBox: true});
    }, 400);
  }

  /**
   * _fetchGlobalAlerts()
   * using axios, fetch the alerts data
   * and assign to state globalAlerts property.
   */
  _fetchGlobalAlerts() {
    axios
      .get(config.alertsApiUrl)
      .then(result => {
        if (result.data && result.data.data) {
          this.setState({
            globalAlerts: result.data.data
          });
        }
      })
      .catch(response => {
        console.warn('Error on Axios GET request: ' + config.alertsApiUrl);
        if (response instanceof Error) {
          console.log(response.message);
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
          console.log(response.config);
        }
      });
  }

  /**
   * _filterCurrentClosingAlerts(data)
   * Returns a filtered array with current
   * closing alerts. If no data is passed,
   * an empty array will be returned.
   *
   * @param {Array} data
   * @return {Array} Alerts
   */
  _filterCurrentClosingAlerts(data) {
    if (!data) {
      return [];
    }

    let today = moment(),
      sDate,
      eDate;

    return _.filter(data, (elem) => {
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
    width: '100%',
    margin: 0,
    padding: '15px 0',
    color: '#333333'
  }
}

export default Radium(GlobalAlerts);
