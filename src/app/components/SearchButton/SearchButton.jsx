// Import React libraries
import Radium from 'radium';
import React from 'react';
import cx from 'classnames';

// Import components
import BasicButton from '../Buttons/BasicButton.jsx';

// Create React class
class SearchButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state. The actived status is false
    this.state = {
      isActive: false
    };
    
    // The function activates the saerch box
    this._activate = this._activate.bind(this);
  }

  // Dom Render Section
  render () {
    // Give active class if the button is activated
    let classes = cx({'--active': this.state.isActive});
  	return (
      <li>
        <BasicButton id='NavMenu-TopLevelLinks__Search-Btn'
        className={`NavMenu-TopLevelLinks__Search-Btn${classes}`}
        name='Search Button'
        label='Search Box'
        style={styles.base}
        onClick={this._activate} />
      </li>
		);
  }

  // Set the function to active search box when the button is clicked
  _activate() {
    // Set the NaveMenu activeItem to be search if search box is not shown
    (this.state.isActive === false) ?
      this.props.activate('search') : this.props.activate(null);
    // Set the button state to be active
    this.state.isActive = !this.state.isActive;
  }
}

const styles = {
  base: {
  }
};

// Export the component
export default Radium(SearchButton);