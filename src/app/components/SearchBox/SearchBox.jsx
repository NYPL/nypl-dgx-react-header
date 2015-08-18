// Import React libraries
import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

// Import components
import SimpleButton from '../Buttons/SimpleButton.jsx';

class SearchBox extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    // Dynamic class assignment based on boolean flag
    let classes = cx({'--active': this.props.isActive});
    
    return (
      <div id='NavMenu__Search-Box' className={'NavMenu__Search-Box'+classes} 
      style={this.props.isActive ? styles.show : styles.hide}>
        <form action='' method='GET'>
          <input type='text' id='NavMenu__Search-Box__Input-Field' value='What would you like to find?' />
          <input type='submit' value='submit' id='NavMenu__Search-Box__Submit-Btn' />
          <br />
          <input type='radio' name='sex' value='catalog' checked />Search the Catalog
          <br />
          <input type='radio' name='sex' value='org' />Search NYPL.org
        </form>
        <SimpleButton target='http://catalog.nypl.org/' label='Advenced Search'/>
      </div>
    );
  }
}

SearchBox.defaultProps = {
  lang: 'en'
};

const styles = {
  base: {

  },
  show: {
    display: 'block'
  },
  hide: {
    display: 'block'
  }
};

module.exports = Radium(SearchBox);