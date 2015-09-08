// Non-NYPL module imports
import React from 'react';
import Radium from 'radium';

// ALT FLUX
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// NYPL module imports
import Logo from '../Logo/Logo.jsx';
import SSOContainer from '../SSOContainer/SSOContainer.jsx';
import DonateButton from '../DonateButton/DonateButton.jsx';
import SubscribeButton from '../SubscribeButton/SubscribeButton.jsx';
import NavMenu from '../NavMenu/NavMenu.jsx';
import MobileHeader from './MobileHeader.jsx';

class Header extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    // replaces getInitialState()
    this.state = Store.getState();
  }

  componentDidMount() {
    Store.listen(this._onChange.bind(this));

    // If the Store is not populated with
    // the proper Data, then fetch.
    this._fetchDataIfNeeded();
  }

  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(Store.getState());
  }

  render () {
    return (
      <header id='Header' className='Header'>
        <MobileHeader className='Header-Mobile' />
        <div className='Header-TopWrapper' style={styles.wrapper}>
          <Logo className='Header-Logo' style={styles.logo} />
          <div id='Header-Buttons' style={styles.topButtons}>
            <SSOContainer style={styles.ssoContainer} />
            <SubscribeButton label='Subscribe' lang={this.props.lang} style={styles.subscribeButton} />
            <DonateButton lang={this.props.lang} style={styles.donateButton} />
          </div>
        </div>
        <NavMenu className='Header-NavMenu' items={this.state.headerData} lang={this.props.lang} />
      </header>
    );
  }

  _fetchDataIfNeeded() {
    if (Store.getState().headerData.length < 1) {
      console.log('_fetchDataIfNeeded() performed Actions.fetchHeaderData()');
      Actions.fetchHeaderData();
    }
  }
};

Header.defaultProps = {
  lang: 'en'
};

const styles = {
  wrapper: {
    position: 'relative',
    margin: '0 auto'
  },
  logo: {
    display: 'block',
    width: '230px',
    position: 'relative',
    left: '-8px'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    right: '2px',
    textTransform: 'uppercase',
    display: 'block'
  },
  ssoContainer: {
    display: 'inline-block'
  },
  subscribeButton: {
    display: 'inline-block'
  },
  donateButton: {
    display: 'inline-block'
  }
};

export default Radium(Header);
