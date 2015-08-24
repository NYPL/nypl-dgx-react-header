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
      searchField: 'catalog'
    };

    // The functions listen to the changes of input fields
    this._keywordsChange = this._keywordsChange.bind(this);
    this._fieldChange = this._fieldChange.bind(this);
    // The function send search requests
    this._submitSearchReq = this._submitSearchReq.bind(this);
  }

  // Dom Render Section
  render() {
    // Give active class if the button is activated
    let classes = cx({'--active': this.props.isActive});
    
    return (
      <div id='NavMenu__Search-Box' 
      className={`NavMenu__Search-Box${classes}`}>
        
        <InputField type='text' 
        id='NavMenu__Search-Box__Input-Field' 
        ref='keywords' 
        value={this.state.searchKeywords}
        placeholder='What would you like to find?'
        onChange={this._keywordsChange} />

        <InputField type='submit' id='NavMenu__Search-Box__Submit-Btn' onClick={this._submitSearchReq} />
        
        <InputField type='radio' 
        name='search field' 
        value='catalog' 
        ref='field' 
        onChange={this._fieldChange}
        checked={this.state.searchField ==='catalog'} />Search the Catalog
        
        <InputField type='radio' 
        name='search field' 
        value='org' 
        ref='field'
        onChange={this._fieldChange} 
        checked={this.state.searchField ==='org'} />Search NYPL.org
        
        <SimpleButton target='http://catalog.nypl.org/' label='Advenced Search'/>
      </div>
    );
  }

  // Listen to any changes to keywords input and change the state
  _keywordsChange (event) {
    this.setState({searchKeywords: event.target.value});
  }

  // Listen to any changes to filed radio input and change the state
  _fieldChange (event) {
    this.setState({searchField: event.target.value});
  }

  // The function to generate a http request after click the search button
  _submitSearchReq (e) {
    e.preventDefault();
    
    // Grab the values the user has entered as the parameters for URL
    var reqPara = {
      keywords: encodeURIComponent(this.state.searchKeywords.trim()),
      field: this.state.searchField
    }
    
    // The vairable for request URL
    let reqUrl;

    // Decide the search field
    if (reqPara.field == 'catalog') {
      reqUrl = `https://nypl.bibliocommons.com/search?t=smart&q=${reqPara.keywords}&commit=Search&searchOpt=catalogue`;
    }  else if (reqPara.field == 'org') {
      reqUrl = `http://www.nypl.org/search/apachesolr_search/${reqPara.keywords}`;
    }

    // Go to the search page
    window.location.assign(reqUrl);
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