import React from 'react';
import Radium from 'radium';

import DonateButton from '../DonateButton/DonateButton.jsx';

class NavMenuBottomButtons extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className={this.props.className} style={styles.base}>
        <a href={this.props.libraryCardLink} className='LibraryCardLink' style={styles.libraryCardLink}>
          <span className='LibraryCardLink-Wrapper' style={styles.libraryCardLinkWrapper}>
            <span className='LibraryCardLink-Icon nypl-icon-card' style={styles.icon}></span>
            <span className='LibraryCardLink-Label' style={styles.libraryCardLinkLabel}>
              Get a Library Card
            </span>
          </span>
        </a>
        <a href={this.props.subscribeLink} className='SubscribeLink' style={styles.subscribeLink}>
          <span className='SubscribeLink-Wrapper' style={styles.subscribeLinkWrapper}>
            <span className='SubscribeLink-Icon nypl-icon-mail' style={styles.icon}></span>
            <span className='SubscribeLink-Label' style={styles.subscribeLinkLabel}>
              Get Email Updates
            </span>
          </span>
        </a>
        <DonateButton className='DonateLink' style={styles.donateLink} />
      </div>
    );
  }
}

NavMenuBottomButtons.defaultProps = {
  lang: 'en',
  className: 'NavMenuBottomButtons',
  libraryCardLink: '//www.nypl.org',
  subscribeLink: '//www.nypl.org'
};

const styles = {
  base: {
    borderTop: '2px solid #363636',
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0
  },
  subscribeLink: {
    display: 'inline-table',
    color: '#FFF',
    padding: 0,
    margin: 0,
    width: '50%',
    textAlign: 'center',
    textDecoration: 'none'
  },
  subscribeLinkWrapper: {
    width: '100%',
    borderLeft: '1.25px solid #252525',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  subscribeLinkLabel: {
    textTransform: 'uppercase',
    display: 'inline-block',
    width: '85px',
    fontSize: '16px',
    margin: '0 0 0 10px'
  },
  libraryCardLink: {
    display: 'inline-table',
    color: '#FFF',
    padding: '0',
    margin: '0',
    width: '50%',
    textDecoration: 'none',
    textAlign: 'center'
  },
  libraryCardLinkWrapper: {
    width: '100%',
    borderRight: '1.25px solid #252525',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  libraryCardLinkLabel: {
    textTransform: 'uppercase',
    display: 'inline-block',
    width: '110px',
    fontSize: '16px',
    margin: '0 0 0 10px'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: '#959595'
  },
  donateLink: {
    padding: '1.75em 0',
    display: 'block',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16px'
  }
};

export default Radium(NavMenuBottomButtons);