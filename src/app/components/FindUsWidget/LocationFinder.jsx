import React from 'react';

class LocationFinder extends React.Component {

  constructor(props) {
    super(props);

    // Holds the initial state
    // replaces getInitialState() method
    this.state = {
    	zipcode: null
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className={this.props.className + '-Wrapper'}>
          <div className={this.props.className + '-Tag'}>Find a Library</div>
          <label htmlFor='LocationFinder-Input' className={this.props.className + '-IntroText'}>
            Type a zip code where you would like to find a NYPL Location.
          </label>
          <div className={this.props.className + '-SearchBox'}>
            <input type='text' placeholder='Zip Code' id='LocationFinder-Input' name='LocationFinder-Input' />
            <button type='button' id='LocationFinder-Submit' onClick={this._handleSubmit}>FIND</button>
          </div>
        </div>
      </div>
    );
  }

  _handleSubmit() {
  	console.log(this.state);
  }

  _getNearestLocations(zipcode) {

  }

  _validateUserInput(zipcode) {
  	
  }
}

LocationFinder.defaultProps = {
  lang: 'en',
  className: 'LocationFinder'
};

export default LocationFinder;