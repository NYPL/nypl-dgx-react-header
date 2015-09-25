import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import EmailSubscription from '../EmailSubscription/EmailSubscription.jsx';

import HeaderStore from '../../stores/HeaderStore';
import HeaderActions from '../../actions/HeaderActions';

class SubscribeButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state, replaces getInitialState() method
    this.state = {
      subscribeFormVisible: HeaderStore.getSubscribeFormVisible()
    };

    // Allows binding methods that reference this
    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount () {
    HeaderStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount () {
    HeaderStore.removeChangeListener(this._onChange.bind(this));
  }

  render () {
    // Assign a variable to hold the reference of state boolean
    //let showDialog = this.state.showDialog;
    let showDialog = this.state.subscribeFormVisible;
    // Dynamic class assignment based on boolean flag
    const classes = cx({
        'active': showDialog,
        '': !showDialog
      }),
      iconClass = cx({
        'nypl-icon-solo-x': showDialog,
        'nypl-icon-wedge-down': !showDialog
      });

    //console.log(this.state);
    return (
      <div className='SubscribeButton-Wrapper'
        ref='SubscribeButton'
        style={[
          styles.base,
          this.props.style //allows for parent-to-child css styling
        ]}>

        <a
          id={'SubscribeButton'}
          className={'SubscribeButton ' + classes}
          href={this.props.target}
          onClick={this._handleClick}
          style={[
            styles.SimpleButton,
            this.props.style
          ]}>
          <span className={iconClass + ' icon'} style={styles.SubscribeIcon}></span>
          {this.props.label}
        </a>

        <div className={'EmailSubscribeForm-Wrapper'}
          style={[
            styles.EmailSubscribeForm,
            showDialog ? styles.show : styles.hide
          ]}>
          <EmailSubscription
            list_id='1061'
            target='https://dev-mailinglistapi.nypl.org' />
        </div>
      </div>
    );
  }

  /* Utility Methods should be declared below the render method */

  // Toggles the visibility of the form. Sends an Action update
  // to the Header Store that will triggger a global update
  // to the reference in the Header Constants.
  _handleClick (event) {
    if(this.props.target === '') {
      event.preventDefault();

      HeaderActions.toggleSubscribeFormVisible();
    }
  }

  // Updates the state of the form based off the Header Store.
  // The central point of access to the value is in the Store.
  _onChange () {
    this.setState({subscribeFormVisible: HeaderStore.getSubscribeFormVisible()});
  }
}

// Set Component's Default Properties
// In ES6 properties cannot be defined in classes, only methods.
/* Default Component Properties */
SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: ''
};

const styles = {
  base: {
    margin: '0px 15px',
    position: 'relative',
    display: 'inline-block'
  },
  SimpleButton: {
    display: 'block',
    padding: '1em 30px 1em 25px'
  },
  SubscribeIcon: {
    position: 'absolute',
    top: '10px',
    right: '8px',
    fontSize: '13px'
  },
  EmailSubscribeForm: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '250px',
    height: '210px',
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
