// Import React libraries
import React from 'react';
import cx from 'classnames';
import Radium from 'radium';

// Import components
import BasicButton from '../Buttons/BasicButton.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';

import HeaderStore from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Create React class
class SearchButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state. The actived status is false
    this.state = {
    };
  }

  // Dom Render Section
  render () {
    // Give active class if the button is activated
    let classes = cx({
          '--active': HeaderStore._getMobileMenuBtnValue() === 'hoverSearch'
      });

    return (
      <div className={`${this.props.className}-SearchBox-Wrapper`}
      onMouseEnter={this._hoverOpen.bind(this)}
      onMouseLeave={this._hoverClose.bind(this)}>
        <BasicButton id={`${this.props.className}-SearchButton`}
        className={`nypl-icon-magnifier-fat ${this.props.className}-SearchButton${classes}`}
        name='Search Button'
        label=''
        onClick={this._toggle.bind(this)} />
        <SearchBox id={`${this.props.className}-SearchBox`}
        className={`${this.props.className}-SearchBox`} />
      </div>
    );
  }

  /**
   * _hoverOpen()
   * Make search button is able to be triggered by hovering in, but only when it hasn't been
   * triggered by click method yet.
   */
  _hoverOpen() {
    if (HeaderStore._getMobileMenuBtnValue() !== 'hoverSearch') {
      if (HeaderStore._getMobileMenuBtnValue() !== 'clickSearch') {
        Actions.setMobileMenuButtonValue('hoverSearch');
        console.log('hoverSearch');
      }
    }
  }

  /**
   * _hoverClose()
   * This function will close search box when the user hovers out
   * from search button and search box.
   */
  _hoverClose() {
    Actions.setMobileMenuButtonValue('');
    console.log('no search');
  }

  /**
   * _toggle()
   * If search button is triggered by clicking, the only way to close its
   * is to click it again no matter on mobile or desktop version.
   */
  _toggle() {
    // Only activated when the button was triggered by clicking
    if (HeaderStore._getMobileMenuBtnValue() === 'clickSearch') {
      Actions.setMobileMenuButtonValue('');
    } else if (HeaderStore._getMobileMenuBtnValue() === '') {
      Actions.setMobileMenuButtonValue('clickSearch');
    }
  }
}

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

const styles = {
  base: {
  }
};

// Export the component
export default Radium(SearchButton);