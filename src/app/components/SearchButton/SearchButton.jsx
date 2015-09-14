// Import React libraries
import React from 'react';
import cx from 'classnames';
import Radium from 'radium';

// Import components
import BasicButton from '../Buttons/BasicButton.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';

import HeaderStore from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Create React class
class SearchButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state. The actived status is false
    this.state = {
      isActive: false
    };
  }

  // Dom Render Section
  render () {
    // Give active class if the button is activated
    let classes = cx({'--active': this.state.isActive});
  	return (
      <div className={`${this.props.className}-SearchBox-Wrapper`}
      onMouseEnter={this._activate.bind(this, 'hover')}
      onMouseLeave={this._deactivate.bind(this)}>
        <BasicButton id={`${this.props.className}-SearchButton`}
        className={`icon-magnifier2 ${this.props.className}-SearchButton${classes}`}
        name='Search Button'
        label=''
        style={styles.base}
        onClick={this._activate.bind(this, 'click')} />
        <SearchBox id={`${this.props.className}-SearchBox`} 
        className={`${this.props.className}-SearchBox${classes}`} />
      </div>
		);
  }

  // Set the function to active searchbox when the button is hovered
  _activate(option) {
    if (option === 'hover') {
      Actions.setMobileMenuButtonValue('hoverSearch');
      this.setState({isActive: true});
      console.log('mouse in');
    } else if (option === 'click') {
      if (HeaderStore._getMobileMenuBtnValue() === 'clickSearch'){
        this._toggle();
      }
    }
  }

  _deactivate() {
    // _deactive function only works when it is on desktop version
    if (HeaderStore._getMobileMenuBtnValue() === 'hoverSearch') {
      Actions.setMobileMenuButtonValue('');
      this.setState({isActive: false});
      console.log('close');
    }
  }

  _toggle() {
    if (HeaderStore._getMobileMenuBtnValue() === '') {
      Actions.setMobileMenuButtonValue('clickSearch');
      this.setState({isActive: true});
    } else {
      Actions.setMobileMenuButtonValue('');
      this.setState({isActive: false});
    }
    console.log('click');
  }
}

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

const styles = {
  base: {
  }
};

// Export the component
export default Radium(SearchButton);