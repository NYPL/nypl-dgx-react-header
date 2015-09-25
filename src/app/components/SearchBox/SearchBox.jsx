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
      searchOption: 'catalog',
      placeholderAnimation: null,
      noAnimationBefore: true
    };

    // The functions listen to the changes of input fields
    this._keywordsChange = this._keywordsChange.bind(this);
    this._searchOptionChange = this._searchOptionChange.bind(this);
    // The function send search requests
    this._submitSearchRequest = this._submitSearchRequest.bind(this);
  }

  // Dom Render Section
  render() {
    // Set active class if search button is hovered or clicked
    let classes = cx({'--active': HeaderStore._getMobileMenuBtnValue() === 'clickSearch' ||
      HeaderStore._getMobileMenuBtnValue() === 'hoverSearch'});
    // Classes for keywords input fields to activate pulse animation
   let pulseAnimation = cx({'keywords-pulse-fade-in': this.state.placeholderAnimation === 'initial',
   'keywords-pulse': this.state.placeholderAnimation === 'sequential'});

    return (
      <div id={this.props.id}
      className={`${this.props.className}${classes}`}>
        <div className={`${this.props.className}-Elements-Wrapper`}>
          <div className={`${this.props.className}-Elements-Input-Wrapper`}>

            <div className={`${this.props.className}-Elements-Input-Keywords-Wrapper`}>
              <span className='nypl-icon-magnifier-thin icon'></span>
              <div className={`${this.props.className}-Input-Keywords-Border`}>
                <InputField type='text'
                id={`${this.props.id}-Input-Keywords`}
                className={`${this.props.className}-Input-Keywords ${pulseAnimation}`}
                ref='keywords'
                value={this.state.searchKeywords}
                placeholder='What would you like to find?'
                onChange={this._keywordsChange} />
              </div>
            </div>
            <div className={`${this.props.className}-Elements-Input-Options-Wrapper`}>
              <div className={`${this.props.className}-Input-Options`}>
                <InputField type='radio'
                id='catalog'
                name='input option'
                value='catalog'
                ref='option'
                onChange={this._searchOptionChange}
                checked={this.state.searchOption ==='catalog'} />

                <label htmlFor='catalog' className={`${this.props.className}-Input-Options-label`}>
                  Search the Catalog
                </label>

                <InputField type='radio'
                id='website'
                name='input option'
                value='website'
                ref='option'
                onChange={this._searchOptionChange}
                checked={this.state.searchOption ==='website'} />

                <label htmlFor='website' className={`${this.props.className}-Input-Options-label`}>
                  Search NYPL.org
                </label>
              </div>
            </div>
          </div>

          <div className={`${this.props.className}-Mobile-Submit`}>
            <div className={`${this.props.className}-Mobile-Submit-Option left-column`}
            value='catalog'
            onClick={this._submitSearchRequest.bind(this, 'catalog')}>
              catalog
              <span className='nypl-icon-wedge-right icon'></span>
            </div>
            <div className={`${this.props.className}-Mobile-Submit-Option`}
            value='website'
            onClick={this._submitSearchRequest.bind(this, 'website')}>
              nypl.org
              <span className='nypl-icon-wedge-right icon'></span>
            </div>
          </div>
          <div className={`nypl-icon-magnifier-fat ${this.props.className}-Elements-SubmitButton`}
          onClick={this._submitSearchRequest.bind(this, null)}>
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
    // console.log(this.state.searchOption);
  }

  // The function to generate a http request after click the search button
  _submitSearchRequest (value) {
    let requestParameters;
    // Grab the values the user has entered as the parameters for URL,
    // depends on desktop or mobile
    requestParameters = {
      keywords: encodeURIComponent(this.state.searchKeywords.trim()), 
      option: value || this.state.searchOption
    }
    // The variable for request URL
    let requestUrl;
    // Decide the search option
    if (requestParameters.option === 'catalog') {
      requestUrl = `https://nypl.bibliocommons.com/search?t=smart&q=${requestParameters.keywords}&commit=Search&searchOpt=catalogue`;
    }  else if (requestParameters.option === 'website') {
      requestUrl = `http://www.nypl.org/search/apachesolr_search/${requestParameters.keywords}`;
    }

    // The portion for interaction if the uses doesn't enter any search keywords
    if (!requestParameters.keywords) {
      // Select keywords input DOM element
      let inputKeywords = document.getElementsByClassName(`${this.props.className}-Input-Keywords`)[0];
      // The placeholder to tell the user there's no keywords input
      inputKeywords.placeholder = 'Please enter a search term.';
      // Decide which animation is going to perform
      let pulse = element => {
        let frame = 0,
          animation = setInterval(() => {
            frame ++;
            // Remove the class to stop the animation after 0.1s
            if (frame > 1) {
              clearInterval(animation);
              this.setState({placeholderAnimation: null});
              // Set animation to be sequential
              this.setState({noAnimationBefore: false});
            }
          }, 100);
        if (this.state.noAnimationBefore) {
          this.setState({placeholderAnimation: 'initial'});
        } else {
          this.setState({placeholderAnimation: 'sequential'});
        }
      };
      pulse(inputKeywords);
    } else {
      // Go to the search page
      window.location.assign(requestUrl);
    }
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