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
    let classes = cx({'--active': HeaderStore._getMobileMenuBtnValue() === 'clickSearch' ||
      HeaderStore._getMobileMenuBtnValue() === 'hoverSearch'});
    return (
      <div className={`${this.props.className}-SearchBox-Wrapper`}
      onMouseEnter={this._activate.bind(this, 'hover')}
      onMouseLeave={this._deactivate.bind(this)}>
        <BasicButton id={`${this.props.className}-SearchButton`}
        className={`nypl-icon-magnifier-thin ${this.props.className}-SearchButton${classes}`}
        name='Search Button'
        label=''
        style={styles.base}
        onClick={this._activate.bind(this, 'click')} />
        <SearchBox id={`${this.props.className}-SearchBox`}
        className={`${this.props.className}-SearchBox`} />
      </div>
    );
  }

  // Set the function to active searchbox when the button is hovered or clicked
  _activate(option) {
    if (option === 'hover') {
      // And the only when the button has not been activated yet
      if (HeaderStore._getMobileMenuBtnValue() !== 'clickSearch') {
        Actions.setMobileMenuButtonValue('hoverSearch');
      } 
    } else {
      // And only when the button has not activated by hovering
      if (HeaderStore._getMobileMenuBtnValue() !== 'hoverSearch'){
        this._toggle();
      }
    }
  }

  // Deactivated the button only when it was activated by hovering
  _deactivate() {
    // _deactive function only works when it is on desktop version
    if (HeaderStore._getMobileMenuBtnValue() === 'hoverSearch') {
      Actions.setMobileMenuButtonValue('');
    }
  }

  // The toggle for the interaction of clicking on the button
  _toggle() {
    // Only activated when the button has not been activated yet
    if (HeaderStore._getMobileMenuBtnValue() !== 'clickSearch') {
      Actions.setMobileMenuButtonValue('clickSearch');
      console.log('click search');
    } else {
      Actions.setMobileMenuButtonValue('');
      console.log('no search');
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