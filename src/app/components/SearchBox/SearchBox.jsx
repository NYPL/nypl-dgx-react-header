// Import React libraries
import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

// Import components
import InputField from '../InputField/InputField.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';

class SearchBox extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    
    // Set the default values of input fields
    this.state = {
      searchKeywords: '',
      searchOption: 'catalog'
    };

    // The functions listen to the changes of input fields
    this._keywordsChange = this._keywordsChange.bind(this);
    this._searchOptionChange = this._searchOptionChange.bind(this);
    // The function send search requests
    this._submitSearchRequest = this._submitSearchRequest.bind(this);
  }

  // Dom Render Section
  render() {
    // Give active class if the button is activated
    let classes = cx({'--active': this.props.isActive});
    
    return (
      <div id='NavMenu__SearchBox' 
      className={`NavMenu__SearchBox${classes}`}>
        
        <InputField type='text' 
        id='NavMenu__SearchBox__InputField' 
        ref='keywords' 
        value={this.state.searchKeywords}
        placeholder='What would you like to find?'
        onChange={this._keywordsChange} />

        <InputField type='submit' id='NavMenu__SearchBox__SubmitButton' onClick={this._submitSearchRequest} />
        
        <InputField type='radio' 
        name='search option' 
        value='catalog' 
        ref='option' 
        onChange={this._searchOptionChange}
        checked={this.state.searchOption ==='catalog'} />Search the Catalog
        
        <InputField type='radio' 
        name='search option' 
        value='website' 
        ref='option'
        onChange={this._searchOptionChange} 
        checked={this.state.searchOption ==='website'} />Search NYPL.org
        
        <SimpleButton target='http://catalog.nypl.org/' label='Advenced Search'/>
      </div>
    );
  }

  // Listen to any changes to keywords input and change the state
  _keywordsChange (event) {
    this.setState({searchKeywords: event.target.value});
  }

  // Listen to the changes of the search options and change the state
  _searchOptionChange (event) {
    this.setState({searchOption: event.target.value});
  }

  // The function to generate a http request after click the search button
  _submitSearchRequest (e) {
    e.preventDefault();
    
    // Grab the values the user has entered as the parameters for URL
    let requestParameters = {
      keywords: encodeURIComponent(this.state.searchKeywords.trim()),
      option: this.state.searchOption
    }
    
    // The vairable for request URL
    let requestUrl;

    // Decide the search option
    if (requestParameters.option == 'catalog') {
      requestUrl = `https://nypl.bibliocommons.com/search?t=smart&q=${requestParameters.keywords}&commit=Search&searchOpt=catalogue`;
    }  else if (requestParameters.option == 'website') {
      requestUrl = `http://www.nypl.org/search/apachesolr_search/${requestParameters.keywords}`;
    }

    // Go to the search page
    window.location.assign(requestUrl);
  }
}

SearchBox.defaultProps = {
  lang: 'en'
};

const styles = {
  base: {
  }
};

// Export the component
module.exports = Radium(SearchBox);