import Radium from 'radium';
import React from 'react';

class SSOLoggedInMenu extends React.Component {
  constructor(props) {
    super(props);

    this.current_location = window !== undefined ? window.location.href : '';
    this.state = {
      current_location: 'http://nypl.org',
      logout_url: `https://nypl.bibliocommons.com/user/logout?destination=${this.current_location}`
    };

    this._logout = this._logout.bind(this);
  }

  render() {
    return (
      <ul className='logged-in-menu' style={styles.SSOLoggedInMenu}>
        <li><a style={styles.a} href='http://nypl.bibliocommons.com/user/account'>Personal Information</a></li>
        <li><a style={styles.a} href='http://nypl.bibliocommons.com/user/saved_searches'>Saved Searches</a></li>
        <li><a style={styles.a} href='http://nypl.bibliocommons.com/user/preferences'>Preferences</a></li>
        <li><a style={styles.a} href='http://nypl.bibliocommons.com/user/privacy'>Privacy</a></li>
        <li><a style={styles.a} href='http://nypl.bibliocommons.com/user/reminders'>Reminders</a></li>
        <li><a style={styles.a} href='http://nypl.bibliocommons.com/communitycredits'>Community Credits</a></li>
        <li><a style={styles.a} href='http://nypl.bibliocommons.com/carts/order_history'>Order History</a></li>
        <li><a style={styles.a} href='#' onClick={this._logout} id='sso-logout'>Log out</a></li>
      </ul>
    );
  }

  _logout (e) {
    e.preventDefault();
    window.location = this.state.logout_url;
  }
}

const styles = {
  SSOLoggedInMenu: {
    width: '180px',
    border: '2px solid #5e564b',
    backgroundColor: '#e5e1da',
    position: 'absolute',
    listStyleType: 'none',
    right: '105px',
    top: '-15px',
    zIndex: '4',
    padding: '12px 10px'
  },
  li: {
    margin: '5px 0px'
  },
  a: {
    margin: '0px',
    padding: '0px',
    color: '#000000',
    fontSize: '11px',
    float: 'none',
    width: '100px',
    textDecoration: 'none'
  }
};

export default Radium(SSOLoggedInMenu);
