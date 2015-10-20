import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import ClickOutHandler from 'react-onclickout';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import EmailSubscription from '../EmailSubscription/EmailSubscription.jsx';

import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

import gaUtils from '../../utils/gaUtils.js';

class SubscribeButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      subscribeFormVisible: Store._getSubscribeFormVisible()
    };
  }

  componentDidMount() {
    Store.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    Store.unListen(this._onChange.bind(this));
  }

  render() {
    // Assign a variable to hold the reference of state boolean
    let showDialog = this.state.subscribeFormVisible,
      buttonClasses = cx({'active': showDialog}),
      emailFormClasses = cx({
        'active animatedFast fadeIn': showDialog
      }),
      iconClass = cx({
        'nypl-icon-solo-x': showDialog,
        'nypl-icon-wedge-down': !showDialog
      });

    return (
      <ClickOutHandler onClickOut={this._handleOnClickOut.bind(this)}>
        <div className='SubscribeButton-Wrapper'
          ref='SubscribeButton'
          style={[
            styles.base,
            this.props.style
          ]}>

          <a
            id={'SubscribeButton'}
            className={`SubscribeButton ${buttonClasses}`}
            href={this.props.target}
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
      </ClickOutHandler>
    );
  }

  /**
   * _handleClick(e) 
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the Header Store.
   */
  _handleClick(e) {
    e.preventDefault();

    if (this.props.target === '#') {
      let visibleState = this.state.subscribeFormVisible ? 'Closed' : 'Open';

      Actions.toggleSubscribeFormVisible(!this.state.subscribeFormVisible);
      gaUtils._trackEvent('Click', `Subscribe - ${visibleState}`);
    }
  }

  /**
   * _handleOnClickOut(e) 
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  _handleOnClickOut(e) {
    if (Store._getSubscribeFormVisible()) {
      Actions.toggleSubscribeFormVisible(false);
      gaUtils._trackEvent('Click', 'Subscribe - Closed');
    }
  }

  /**
   * _onChange()
   * Updates the state of the form based off the Header Store.
   */
  _onChange() {
    this.setState({subscribeFormVisible: Store._getSubscribeFormVisible()});
  }
}

SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: '#'
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
