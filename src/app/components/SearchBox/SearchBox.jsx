// Import React libraries
import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

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
          <input type='text' id='NavMenu__Search-Box__Input-Field' value='What do you want to search?' />
          <input type='submit' value='submit' id='NavMenu__Search-Box__Submit-Btn' />
          <br />
          <input type='radio' name='sex' value='male' checked />Male
          <br />
          <input type='radio' name='sex' value='female' />Female
        </form>
        <a href='http://catalog.nypl.org/'>Advenced Search</a>
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