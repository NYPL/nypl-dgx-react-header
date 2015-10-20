// NPM Modules
import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

// ALT Flux
import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// NYPL Components
import Logo from '../Logo/Logo.jsx';
import DonateButton from '../DonateButton/DonateButton.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';
import SubscribeButton from '../SubscribeButton/SubscribeButton.jsx';
import NavMenu from '../NavMenu/NavMenu.jsx';
import MobileHeader from './MobileHeader.jsx';
import GlobalAlerts from '../GlobalAlerts/GlobalAlerts.jsx';

import gaUtils from '../../utils/gaUtils.js';

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

    // Once the component mounts,
    // enable the sticky header depending on position.
    this._handleStickyHeader();

    // Listen to the scroll event for the sticky header.
    window.addEventListener('scroll', this._handleStickyHeader.bind(this));
  }

  componentWillUnmount() {
    Store.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(Store.getState());
  }

  render () {
    let isHeaderSticky = this.state.isSticky,
      headerClass = this.props.className || 'Header',
      headerClasses = cx(headerClass, {'sticky': isHeaderSticky});

    return (
      <header id={this.props.id} className={headerClasses}>
        <GlobalAlerts className={`${headerClass}-GlobalAlerts`} />
        <div className={`${headerClass}-Wrapper`}>
          <MobileHeader className={`${headerClass}-Mobile`} locatorUrl={'//www.nypl.org/locations/map?nearme=true'} />
          <div className={`${headerClass}-TopWrapper`} style={styles.wrapper}>
            <Logo className={`${headerClass}-Logo`} />
            <div className={`${headerClass}-Buttons`} style={styles.topButtons}>
              <SimpleButton 
                label='Get a Library Card' 
                target='//catalog.nypl.org/screens/selfregpick.html' 
                className='LibraryCardButton'
                id='LibraryCardButton'
                gaAction='Get a Library Card'
                gaLabel=''
                style={styles.libraryCardButton} />
              <SubscribeButton 
                label='Get Email Updates'
                lang={this.props.lang}
                style={styles.subscribeButton} />
              <DonateButton
                lang={this.props.lang}
                style={styles.donateButton}
                gaLabel={'Header Button'} />
            </div>
          </div>
          <NavMenu 
            className={`${headerClass}-NavMenu`}
            lang={this.props.lang}
            items={this.state.headerData}  />
        </div>
      </header>
    );
  }

  /**
   * _fetchDataIfNeeded() 
   * checks the existence of headerData items,
   * triggers the Actions.fetchHeaderData()
   * method to dispatch a client-side event
   * to obtain data.
   */
  _fetchDataIfNeeded() {
    if (Store.getState().headerData.length < 1) {
      Actions.fetchHeaderData(Store._getClientAppEnv());
    }
  }

  /**
   * _handleStickyHeader() 
   * returns the Actions.updateIsHeaderSticky()
   * with the proper boolean value to update the 
   * Store.isSticky value based on the window 
   * vertical scroll position surpassing the height
   * of the Header DOM element.
   */
  _handleStickyHeader() {
    let headerHeight = this._getHeaderHeight(),
      windowVerticalDistance = this._getWindowVerticalScroll();

    if (windowVerticalDistance > headerHeight) {
      gaUtils._trackEvent.bind(this, 'scroll', 'Sticky Header');
    }

    return (windowVerticalDistance > headerHeight)
      ? Actions.updateIsHeaderSticky(true) : Actions.updateIsHeaderSticky(false);
  }

  /**
   * _getHeaderHeight() 
   * returns the Height of the Header DOM
   * element in pixels.
   */
  _getHeaderHeight() {
    let headerContainer = document.getElementById(this.props.id);
    return headerContainer.clientHeight;
  }

  /**
   * _getWindowVerticallScroll() 
   * returns the current window vertical
   * scroll position in pixels.
   */
  _getWindowVerticalScroll() {
    return window.scrollY;
  }
};

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader'
};

const styles = {
  wrapper: {
    position: 'relative',
    margin: '0 auto'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    right: '2px',
    textTransform: 'uppercase',
    display: 'block'
  },
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    margin: 0,
    padding: 0
  },
  subscribeButton: {
    display: 'inline-block'
  },
  donateButton: {
    display: 'inline-block',
    padding: '11px 18px 9px 18px',
    borderRadius: '4px'
  }
};

export default Radium(Header);
