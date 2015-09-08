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
    // this._click = this._click.bind(this);
  }

  // Dom Render Section
  render () {
    // Give active class if the button is activated
    let classes = cx({'--active': this.state.isActive});
  	return (
      <li onMouseEnter={this._activate} 
      onMouseLeave={this._deactivate}>
        <BasicButton id='NavMenu-TopLevelLinks__SearchButton'
        className={`NavMenu-TopLevelLinks__SearchButton${classes}`}
        name='Search Button'
        label='Search Box'
        style={styles.base} />
        <SearchBox id='NavMenu-SearchBox' className='NavMenu-SearchBox' isActive={this.state.isActive} />
      </li>
		);
  }

  // Set the function to active search box when the button is clicked
  _activate() {
    // Set the isActive state to be true
    this.setState({isActive: true});
  }

  _deactivate() {
    // Set the isActive state to be false
    // this.setState({isActive: false});
  }

  // _click() {
  //   this.setState({isActive: !isActive});
  // }
}

const styles = {
  base: {
  }
};

// Export the component
export default SearchButton;