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
      activeMobileButton: HeaderStore.getState().activeMobileButton
    };
    
    // The function activates and deactivates the search box
    this._activate = this._activate.bind(this);
    this._deaactivate = this._deactivate.bind(this);
  }

  // Dom Render Section
  render () {
    // Give active class if the button is activated
    let classes = cx({'--active': this.state.isActive});
  	return (
      <div className='NavMenu-TopLevelLinks__SearchButton-Wrapper'
      onMouseEnter={this._activate}
      onMouseLeave={this._deactivate}>
        <BasicButton id='NavMenu-TopLevelLinks__SearchButton'
        className={`icon-magnifier2 NavMenu-TopLevelLinks__SearchButton${classes}`}
        name='Search Button'
        label=''
        style={styles.base} />
        <SearchBox id='NavMenu-SearchBox' className='NavMenu-SearchBox' isActive={this.state.activeMobileButton==='search'} />
      </div>
		);
  }

  // Set the function to active search box when the button is clicked
  _activate() {
    Actions.setMobileMenuButtonValue('search');
  }

  _deactivate() {
    if (HeaderStore._getMobileMenuBtnValue() === 'mobileSearch'){
    Actions.setMobileMenuButtonValue('mobileSearch');
    } else {
      Actions.setMobileMenuButtonValue('');
    }
  }
}

const styles = {
  base: {
  }
};

// Export the component
export default Radium(SearchButton);