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

    this.state = {
      searchKeywords: '',
      searchField: ''
    };

    this._submitSearchReq = this._submitSearchReq.bind(this);
  }

  render() {
    // Dynamic class assignment based on boolean flag
    let classes = cx({'--active': this.props.isActive});
    
    return (
      <div id='NavMenu__Search-Box' className={'NavMenu__Search-Box'+classes} 
      style={this.props.isActive ? styles.show : styles.hide}>
        <InputField type='text' 
        id='NavMenu__Search-Box__Input-Field' 
        ref='keywords' 
        value='What would you like to find?'/>
        <InputField type='submit' id='NavMenu__Search-Box__Submit-Btn' onClick={this._submitSearchReq} />
        <InputField type='radio' name='search field' value='catalog' ref='field' checked />Search the Catalog
        <InputField type='radio' name='search field' value='org' ref='field' />Search NYPL.org
        <SimpleButton target='http://catalog.nypl.org/' label='Advenced Search'/>
      </div>
    );
  }

  // The function to generate a http request after click the search button
  _submitSearchReq (e) {
    e.preventDefault();
    
    // The parameters the user has entered
    var reqPara = {
      keywords: encodeURIComponent(React.findDOMNode(this.refs.keywords).value.trim()),
      field: React.findDOMNode(this.refs.field).value
    }
    
    // The vairable for request URL
    let reqUrl;

    // Decide the search field
    if (reqPara.field == 'catalog') {
      reqUrl = `https://nypl.bibliocommons.com/search?t=smart&q=${reqPara.keywords}&commit=Search&searchOpt=catalogue`;
    }  else if (reqPara.field == 'org') {
      reqUrl = `http://www.nypl.org/search/apachesolr_search/${reqPara.keywords}`;
    }

    console.log(reqUrl);
    
    // Go to search page
    window.location.replace(reqUrl);
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