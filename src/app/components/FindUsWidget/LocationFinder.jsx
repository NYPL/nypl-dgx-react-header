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
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
  	let zipcode = this.state.zipcode;
    return (
      <div className={this.props.className}>
        <div className={this.props.className + '-Wrapper'}>
          <div className={this.props.className + '-Tag'}>Find a Library</div>
          <label htmlFor='LocationFinder-Input' className={this.props.className + '-IntroText'}>
            Type a zip code where you would like to find a NYPL Location.
          </label>
          <div className={this.props.className + '-SearchBox'}>
            <input type='text' placeholder='Zip Code' id='LocationFinder-Input' ref='zipCodeInput' value={zipcode} onChange={this._handleChange} />
            <button type='button' id='LocationFinder-Submit' onClick={this._handleSubmit}>FIND</button>
          </div>
        </div>
      </div>
    );
  }

  _handleSubmit() {

  }

  _getNearestLocations(zipcode) {

  }

  _validateZipcode(zipcode) {
  	if (zipcode && !isNaN(zipcode) && zipcode.length === 5) {
  		console.log(zipcode);
  		return true;
  	}
  	return false;
  }

  _handleChange(event) {
  	let zipcode = event.target.value;
  	this.setState({zipcode: zipcode});

  	if(this._validateZipcode(zipcode)) {
  		// Execute Autocomplete Search Suggestions
  		console.log('Input is valid, autocomplete should be enabled');
  	} else {
  		// Do not execute Autocomplete
  	}
  }
}

LocationFinder.defaultProps = {
  lang: 'en',
  className: 'LocationFinder'
};

export default LocationFinder;