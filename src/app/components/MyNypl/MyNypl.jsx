import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import ClickOutHandler from 'react-onclickout';
import SimpleButton from '../Buttons/SimpleButton.jsx';

import Store from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';


class MyNypl extends React.Component {
  constructor(props) {
    super(props);

    this.state
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className}>
        <div className={this.props.className + '-Eyebrow'}></div>
        <div className={this.props.className + '-Title'}>Select your experience</div>
        <ul className={`${this.props.className}-Login-List`}>
          <li>
            <a href='' style={styles.loginButtons} className={this.props.className + '-Catalog-Btn'}>
              <span className='nypl-icon-login icon'></span>
              LOG INTO THE CATALOG
            </a>
          </li>
          <li>
            <a href='' style={styles.loginButtons} className={this.props.className + '-Classic-Btn'}>
              <span className='nypl-icon-bldg icon'></span>
              LOG INTO THE CLASSIC CATALOG
            </a>
          </li>
        </ul>

        <a href='#' className={`${this.props.className}-Catalog-Link`}
          style={styles.catalogInfo}>
          Catalog Info
        </a>
      </div>
    );
  }
}


MyNypl.defaultProps = {
  id: 'MyNypl',
  className: 'MyNypl',
  lang: 'en'
};

const styles = {
  base: {
    backgroundColor: '#1DA1D4',
    padding: '0px',
    width: 'auto'
  },
  display: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  catalogInfo: {
    borderBottom: '1px solid #fff',
    fontSize: '12px',
    color: '#fff',
    fontWeight: '200',
    position: 'absolute',
    bottom: '26px',
    right: '30px'
  },
  loginButtons: {
    display: 'inline-block',
    border: '2px solid #fff',
    color: 'white',
    padding: '7px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    backgroundColor: '#1DA1D4',
    fontFamily: 'Kievit-Book',
    marginTop: '20px'
  },
};

export default Radium(MyNypl);