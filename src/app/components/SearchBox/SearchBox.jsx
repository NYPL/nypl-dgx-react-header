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
    
    // The default values of input fields
    this.state = {
      searchKeywords: '',
      searchOption: 'catalog',
      placeholder: 'What would you like to find?',
      placeholderAnimation: null,
      noAnimationBefore: true
    };

    // The function listens to the changes of input fields
    this._inputChange = this._inputChange.bind(this);
    // The function sends search requests
    this._submitSearchRequest = this._submitSearchRequest.bind(this);
    // Listen to the event if enter is pressed
    this._triggerSubmit = this._triggerSubmit.bind(this);
    // The fucntion to trigger validation animation for keywords input
    this._pulseAnimation = this._pulseAnimation.bind(this);
  }

  // Dom Render Section
  render() {
    // Set active class if search button is hovered or clicked
    let classes = cx({
      '--active': HeaderStore._getMobileMenuBtnValue() === 'hoverSearch' ||
      HeaderStore._getMobileMenuBtnValue() === 'clickSearch'
    }),
      // Classes for keywords input fields to activate pulse animation
      pulseAnimation = cx({
        'keywords-pulse-fade-in': this.state.placeholderAnimation === 'initial',
        'keywords-pulse': this.state.placeholderAnimation === 'sequential'
      });

    return (
      <div id={this.props.id} className={`${this.props.className}${classes}`} onKeyPress={this._triggerSubmit}>
        <div id={`${this.props.className}-Elements-Wrapper`} className={`${this.props.className}-Elements-Wrapper`}>
          <div id={`${this.props.className}-Elements-Input-Wrapper`}
          className={`${this.props.className}-Elements-Input-Wrapper`}>

            <div id={`${this.props.className}-Elements-Input-Keywords-Wrapper`}
            className={`${this.props.className}-Elements-Input-Keywords-Wrapper`}>
              <span className='nypl-icon-magnifier-thin icon'></span>
              <div className={`${this.props.className}-Input-Keywords-Border`}>
                <InputField type='text'
                id={`${this.props.id}-Input-Keywords`}
                className={`${this.props.className}-Input-Keywords ${pulseAnimation}`}
                ref='keywords'
                value={this.state.searchKeywords}
                maxLength='128'
                placeholder={this.state.placeholder}
                onChange={this._inputChange.bind(this, 'keywords')} />
              </div>
            </div>
            <div id={`${this.props.className}-Elements-Input-Options-Wrapper`}
            className={`${this.props.className}-Elements-Input-Options-Wrapper`}>
              <div className={`${this.props.className}-Input-Options`}>
                <InputField type='radio'
                id='catalog'
                name='inputOption'
                value='catalog'
                ref='option'
                onChange={this._inputChange.bind(this, 'options')}
                checked={this.state.searchOption === 'catalog'} />

                <label htmlFor='catalog' className={`${this.props.className}-Input-Options-label`}>
                  Search the Catalog
                </label>

                <InputField type='radio'
                id='website'
                name='inputOption'
                value='website'
                ref='option'
                onChange={this._inputChange.bind(this, 'options')}
                checked={this.state.searchOption === 'website'} />

                <label htmlFor='website' className={`${this.props.className}-Input-Options-label`}>
                  Search NYPL.org
                </label>
              </div>
            </div>
          </div>

          <div id={`${this.props.className}-Mobile-Submit`}
           className={`${this.props.className}-Mobile-Submit`}>
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
          <button id={`${this.props.className}-Elements-SubmitButton`}
          className={`nypl-icon-magnifier-fat ${this.props.className}-Elements-SubmitButton`}
          onClick={this._submitSearchRequest.bind(this, null)}>
          </button>
        </div>
      </div>
    );
  }

  /**
   *  _inputChange(field)
   * Listen to the changes on keywords input field and option input fields.
   * Grab the event value, and change the state.
   * The parameter indicates which input field has been changed.
   *
   * @param {String} field
   */
  _inputChange(field) {
    if (field === 'keywords') {
      this.setState({searchKeywords: event.target.value});
    } else if (field === 'options') {
      this.setState({searchOption: event.target.value});
    }
  }

  /**
   * _submitSearchRequest(value)
   * Submit the search request based on the values of the input fields.
   *
   * @param {String} value
   */
  _submitSearchRequest(value) {
    // Store the data that the user entered
    let requestParameters = {
        keywords: encodeURIComponent(this.state.searchKeywords.trim()), 
        // If the value is null, it indicates the function is triggered on desktop version.
        // Then it should get the value for option from state.
        option: value || this.state.searchOption
      },
      // The variable for request URL
      requestUrl,
      inputKeywords,
      pulse;

    // Decide the search option based on which button the user clicked on mobile version search box
    if (requestParameters.option === 'catalog') {
      requestUrl = `https://nypl.bibliocommons.com/search?t=smart&q=${requestParameters.keywords}&commit=Search&searchOpt=catalogue`;
    }  else if (requestParameters.option === 'website') {
      requestUrl = `http://www.nypl.org/search/apachesolr_search/${requestParameters.keywords}`;
    }

    // This portion is for the interactions if the user doesn't enter any input
    if (!requestParameters.keywords) {
      // The selector for inputKeywords DOM element
      inputKeywords = this.refs.keywords;
      // The new placeholder that tells users there's no keywords input
      this.setState({placeholder: 'Please enter a search term.'});
      // Trigger the validation animation
      this._pulseAnimation(inputKeywords);
    } else {
      // Go to the search page
      window.location.assign(requestUrl);
    }
  }

  /**
   * _triggerSubmit(event)
   * The fuction listens to the event of enter key.
   * Submit search request if enter is pressed.
   *
   * @param {Event} event
   */
  _triggerSubmit(event) {
    if (event && event.charCode === 13) {
      this._submitSearchRequest(null);
    }
  }

  /**
   * _pulseAnimation(element)
   * Add the CSS animation to the placeholder of the keywords Input.
   * It adds the proper class to the html element to trigger the animation,
   * and then removes the class to stop it.
   *
   * @param {DOM Element} element
   */
  _pulseAnimation(element) {
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
    // Decide which CSS animation is going to perform
    // by adding different classes to the element.
    // It is based on if it is the first time the validation to be triggered.
    if (this.state.noAnimationBefore) {
      this.setState({placeholderAnimation: 'initial'});
    } else {
      this.setState({placeholderAnimation: 'sequential'});
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