// Import React libraries
import React from 'react';
import cx from 'classnames';

// Import components
import InputField from '../InputField/InputField.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';

// Import HeaderStore
import HeaderStore from '../../stores/Store.js';

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
    // this._submitMobileSearchRequest = this._submitMobileSearchRequest.bind(this);
  }

  // Dom Render Section
  render() {
    // Set active class if search button is hovered or clicked
    let classes = cx({'--active': HeaderStore._getMobileMenuBtnValue() === 'clickSearch' || 
      HeaderStore._getMobileMenuBtnValue() === 'hoverSearch'});
    
    return (
      <div id={this.props.id} 
      className={`${this.props.className}${classes}`}>
        <div className={`${this.props.className}-Elements-Wrapper`}>
          <div className={`${this.props.className}-Elements-Input-Wrapper`}>

            <div className={`${this.props.className}-Elements-Input-Keywords-Wrapper`}>
              <span className='icon-magnifier2 icon'></span>
              <InputField type='text' 
              id={`${this.props.id}-Input-Keywords`}
              className={`${this.props.className}-Input-Keywords`} 
              ref='keywords' 
              value={this.state.searchKeywords}
              placeholder='What would you like to find?'
              onChange={this._keywordsChange} />
            </div>
            <div className={`${this.props.className}-Elements-Input-Options-Wrapper`}>
              <div className={`${this.props.className}-Input-Options`}>
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
              </div>
            </div>
          </div>

          <div className={`${this.props.className}-Mobile-Submit`}>
            <div className={`${this.props.className}-Mobile-Submit-Option left-column`}
            value='catalog'
            onClick={this._submitMobileSearchRequest.bind(this, 'catalog')}>
              catalog
              <span className='icon-wedge-right icon'></span>
            </div>
            <div className={`${this.props.className}-Mobile-Submit-Option`}
            value='website'
            onClick={this._submitMobileSearchRequest.bind(this, 'website')}>
              nypl.org
              <span className='icon-wedge-right icon'></span>
            </div>
          </div>
          <div className={`icon-circle-magnifier ${this.props.className}-Elements-SubmitButton submit-icon`} 
          onClick={this._submitSearchRequest}>
          </div>
        </div>
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
    if (requestParameters.option === 'catalog') {
      requestUrl = `https://nypl.bibliocommons.com/search?t=smart&q=${requestParameters.keywords}&commit=Search&searchOpt=catalogue`;
    }  else if (requestParameters.option === 'website') {
      requestUrl = `http://www.nypl.org/search/apachesolr_search/${requestParameters.keywords}`;
    }
    // Go to the search page
    window.location.assign(requestUrl);
  }

  _submitMobileSearchRequest (value) {    
    // Grab the values the user has entered as the parameters for URL
    // Go to different options as clicking different buttons
    let requestParameters = {
      keywords: encodeURIComponent(this.state.searchKeywords.trim()),
      option: value
    }
    // The vairable for request URL
    let requestUrl;
    // Decide the search option
    if (requestParameters.option === 'catalog') {
      requestUrl = `https://nypl.bibliocommons.com/search?t=smart&q=${requestParameters.keywords}&commit=Search&searchOpt=catalogue`;
    }  else if (requestParameters.option === 'website') {
      requestUrl = `http://www.nypl.org/search/apachesolr_search/${requestParameters.keywords}`;
    }
    // Go to the search page
    window.location.assign(requestUrl);
  }
}

SearchBox.defaultProps = {
  lang: 'en',
  id: 'SearchBox',
  className: 'SearchBox'
};

const styles = {
  base: {
  }
};

// Export the component
module.exports = SearchBox;