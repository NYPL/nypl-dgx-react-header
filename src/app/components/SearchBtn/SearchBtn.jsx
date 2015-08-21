// Import React libraries
import Radium from 'radium';
import React from 'react';

// Import components
import BasicButton from '../Buttons/BasicButton.jsx';

// Create React class
class SearchBtn extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state, replaces getInitialState() method
    this.state = {
      isActivate: false
    };

    this._active = this._active.bind(this);
  }

  render () {
  	return (
      <li>
        <BasicButton id='NavMenu-TopLevelLinks__Search-Btn'
        className='NavMenu-TopLevelLinks__Search-Btn'
        name='Search Button'
        label='Search Box'
        style={styles.base}
        onMouseEnter={this._activate} />
      </li>
		);
  }

  _active() {
    this.setState.isActivate = true;
  }
}

const styles = {
  base: {

  }
};

// Export the class
export default Radium(SearchBtn);