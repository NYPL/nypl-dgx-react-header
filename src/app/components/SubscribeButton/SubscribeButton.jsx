import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import EmailSubscription from '../EmailSubscription/EmailSubscription.jsx';

import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

import axios from 'axios';

import gaUtils from '../../utils/gaUtils.js';

class SubscribeButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state, replaces getInitialState() method
    this.state = {
      subscribeFormVisible: Store._getSubscribeFormVisible(),
      target: this.props.target
    };
  }

  componentDidMount() {
    Store.listen(this._onChange.bind(this));

    // Make an axios call to the mailinglist API server to check it th server is working.
    // And determine the behavior of subscribe button based on the status of the server.
    this._callMailinglistApi();
  }

  componentWillUnmount() {
    Store.unListen(this._onChange.bind(this));
  }

  render () {
    // Assign a variable to hold the reference of state boolean
    let showDialog = this.state.subscribeFormVisible;

    // Dynamic class assignment based on boolean flag
    const buttonClasses = cx({'active': showDialog}),
      emailFormClasses = cx({
        'active animatedFast fadeIn': showDialog
      }),
      iconClass = cx({
        'nypl-icon-solo-x': showDialog,
        'nypl-icon-wedge-down': !showDialog
      });

    return (
      <div className='SubscribeButton-Wrapper'
        ref='SubscribeButton'
        style={[
          styles.base,
          this.props.style
        ]}>

        <a
          id={'SubscribeButton'}
          className={`SubscribeButton ${buttonClasses}`}
          href={this.state.target}
          onClick={this._handleClick.bind(this)}
          style={[
            styles.SimpleButton,
            this.props.style
          ]}>
          {this.props.label}
          <span className={`${iconClass} icon`} style={styles.SubscribeIcon}></span>
        </a>

        <div className={`EmailSubscription-Wrapper ${emailFormClasses}`}
          style={[
            styles.EmailSubscribeForm
          ]}>
          <EmailSubscription
            list_id='1061'
            target='https://mailinglistapi.nypl.org' />
        </div>
      </div>
    );
  }

  /* Utility Methods should be declared below the render method */

  // Toggles the visibility of the form. Sends an Action update
  // to the Header Store that will triggger a global update
  // to the reference in the Header Constants.
  _handleClick(e) {

    if (this.state.target === '#') {
      e.preventDefault();
      let visibleState = this.state.subscribeFormVisible ? 'Closed' : 'Open';
      Actions.toggleSubscribeFormVisible(!this.state.subscribeFormVisible);
      
      gaUtils._trackEvent('Click', `Subscribe - ${visibleState}`);
    }

  }

  // Updates the state of the form based off the Header Store.
  // The central point of access to the value is in the Store.
  _onChange() {
    this.setState({subscribeFormVisible: Store._getSubscribeFormVisible()});
  }

  /**
  * _callMailinglistApi()
  * An axios call to the mailinglist API server. If the server works,
  * change the link of the button to '#' so it will open the subscribe box.
  * If the server doesn't work, the button will link to subscribe landing page
  * as a fallback.
  */
  _callMailinglistApi() {
    axios.
      get('https://mailinglistapi.nypl.org')
      .then(response => {
        if(response.status === 200 && response.status < 300) {
          this.setState({target: '#'});
        }
      })
      .catch(response => {
        console.warn('Error on Axios GET request: https://mailinglistapi.nypl.org');
        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          console.warn('The Axios GET request has a status of: ' + response.status);
        }
      });
  }
}

// Set Component's Default Properties
// In ES6 properties cannot be defined in classes, only methods.
/* Default Component Properties */
SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: 'http://pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

const styles = {
  base: {
    margin: '0px 15px',
    position: 'relative',
    display: 'inline-block'
  },
  SimpleButton: {
    display: 'block',
    padding: '9px 15px 11px 20px'
  },
  SubscribeIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '5px',
    display: 'inline'
  },
  EmailSubscribeForm: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '250px',
    minHeight: '210px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

export default Radium(SubscribeButton);
