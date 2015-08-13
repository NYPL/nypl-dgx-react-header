import Radium from 'radium';
import React from 'react/addons';
import SSOform from '../SSOform/SSOform.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import cookie from 'react-cookie';
import cx from 'classnames';

import HeaderStore from '../../stores/HeaderStore';
import HeaderActions from '../../actions/HeaderActions';

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);

    // cookie.save('username', 'edwinguzman');

    this.state = {
      username: this._login(),
      logged_in: !!this._login(),
      remember: this._remember_me(),
      showDialog: false,
      ssoWindowVisible: HeaderStore.getSSOWindowVisible()
    };

    this._handleClick = this._handleClick.bind(this);
    this._login = this._login.bind(this);
  }

  componentDidMount () {
    HeaderStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount () {
    HeaderStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    let showDialog = this.state.ssoWindowVisible;
    const classes =  cx({ show: showDialog, hide: !showDialog });

    //console.log(this.state);

    // styles.SimpleButton.backgroundColor = this.state.showDialog ? '#E43534' : 'transparent';
    // styles.SimpleButton.color = this.state.showDialog ? 'white' : 'black';

    return (
      <div style={[styles.base, this.props.style]}>
        {this.state.logged_in}
        <SimpleButton
          id='SignInButton'
          className={'SignInButton'}
          label={this.state.username || 'Sign In'}
          style={styles.SimpleButton}
          onClick={this._handleClick}
          target='http://nypl.org' />

        <SSOform
          className={classes}
          show={showDialog}
          display={showDialog}
          loggedIn={this.state.logged_in}
          remember={this.state.remember} /> 
      </div>
    );
  }

  _handleClick(e) {
    e.preventDefault();
    HeaderActions.toggleSSOWindowVisible();
    //this.setState({showDialog: !this.state.showDialog});
  }

  // Updates the state of the form based off the Header Store.
  // The central point of access to the value is in the Store.
  _onChange () {
    this.setState({ssoWindowVisible: HeaderStore.getSSOWindowVisible()});
  }

  _login() {
    return cookie.load('username');
  }

  _remember_me() {
    return !!cookie.load('remember_me');
  }
}

const styles = {
  base: {
    margin: '0px 5px'
  },
  SimpleButton: {
    padding: '1em',
    display: 'block',
    color: '#000'
  },
  SSOform: {}
}

export default Radium(SignInContainer);
