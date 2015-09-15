import React from 'react';
import Radium from 'radium';

// Dependent NYPL React Component
import DonateButton from '../DonateButton/DonateButton.jsx';

class NavMenuBottomButtons extends React.Component{
  
  constructor(props) {
    super(props);
  }

  render() {
    let libraryCardClass = 'LibraryCardLink',
      subscribeLinkClass = 'SubscribeLink';

    return (
      <div className={this.props.className} style={styles.base}>
        <a href={this.props.libraryCardLink} className={libraryCardClass} style={styles.links}>
          <span className={`${libraryCardClass}-Wrapper`} style={[styles.wrapper, styles.libraryCardLinkWrapper]}>
            <span className={`${libraryCardClass}-Icon nypl-icon-card`} style={styles.icon}></span>
            <span className={`${libraryCardClass}-Label`} style={[styles.label, styles.libraryCardLinkLabel]}>
              Get a Library Card
            </span>
          </span>
        </a>
        <a href={this.props.subscribeLink} className={subscribeLinkClass} style={styles.links}>
          <span className={`${subscribeLinkClass}-Wrapper`} style={[styles.wrapper, styles.subscribeLinkWrapper]}>
            <span className={`${subscribeLinkClass}-Icon nypl-icon-mail`} style={styles.icon}></span>
            <span className={`${subscribeLinkClass}-Label`} style={[styles.label, styles.subscribeLinkLabel]}>
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
  links: {
    display: 'inline-table',
    color: '#FFF',
    padding: 0,
    margin: 0,
    width: '50%',
    textAlign: 'center',
    textDecoration: 'none'
  },
  label: {
    fontSize: '16px',
    margin: '0 0 0 10px',
    textTransform: 'uppercase',
    display: 'inline-block'
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  subscribeLinkWrapper: {
    borderLeft: '1.25px solid #252525'
  },
  subscribeLinkLabel: {
    width: '85px'
  },
  libraryCardLinkWrapper: {
    borderRight: '1.25px solid #252525'
  },
  libraryCardLinkLabel: {
    width: '110px'
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