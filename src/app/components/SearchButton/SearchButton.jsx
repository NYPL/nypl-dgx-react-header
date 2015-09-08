// Import React libraries
import React from 'react';
import cx from 'classnames';

// Import components
import BasicButton from '../Buttons/BasicButton.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';

// Create React class
class SearchButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state. The actived status is false
    this.state = {
      isActive: false
    };
    
    // The function activates and deactivates the search box
    this._activate = this._activate.bind(this);
    this._deactivate = this._deactivate.bind(this);
  }

  // Dom Render Section
  render () {
    // Give active class if the button is activated
    let classes = cx({'--active': this.state.isActive});
  	return (
      <li>
        <BasicButton id='NavMenu-TopLevelLinks__SearchButton'
        className={`NavMenu-TopLevelLinks__SearchButton${classes}`}
        name='Search Button'
        label='Search Box'
        style={styles.base}
        onMouseEnter={this._activate}
        onMouseLeave={this._deactivate} />
      </li>
		);
  }

  // Set the function to active search box when the button is clicked
  _activate() {
    // Set the NaveMenu activeItem to be search if search box is not shown
    // (this.state.isActive !== true) ?
    //   this.props.activate(true) : this.props.activate(null);
    // Set the button state to be active
    this.state.isActive = true;
    console.log(this.state.isActive);
  }

  _deactivate() {
    this.state.isActive = false;
    console.log(this.state.isActive);
  }
}

const styles = {
  base: {
  }
};

// Export the component
export default SearchButton;