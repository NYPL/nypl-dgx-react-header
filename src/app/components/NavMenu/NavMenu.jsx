import Radium from 'radium';
import React from 'react';
import _ from 'underscore';
import NavMenuItem from '../NavMenuItem/NavMenuItem.jsx';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';
import SearchButton from '../SearchButton/SearchButton.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';

class NavMenu extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state, replaces getInitialState() method
    this.state = {
      activeItem: null
    };

    // Allows binding methods that reference this
    this._activate = this._activate.bind(this);
    this._deactivate = this._deactivate.bind(this);
    // The fucntion specifically to active search box
    this._activateSearchBox = this._activateSearchBox.bind(this);
  }

  render () {
    let items = _.map(this.props.items, function(m, i) {
      return (
        <NavMenuItem
          label={m.label}
          lang={this.props.lang}
          target={m.target}
          key={i}
          index={i}
          isActive={i === this.state.activeItem}
          activate={this._activate} />
      );
    }, this),
      megas = _.map(this.props.items, function(m, i) {
        return (
          <MegaMenu
            label={m.label}
            lang={this.props.lang}
            items={m.subnav}
            features={m.features}
            key={i}
            index={i}
            isActive={i === this.state.activeItem} />
        );
    }, this);
    return (
      <nav className='NavMenu' onMouseLeave={this._deactivate}>
        <ul className='NavMenu-TopLevelLinks'>
          {items}
          <SearchButton activate={this._activateSearchBox} />
        </ul>
        {megas}
        <SearchBox isActive={'search' === this.state.activeItem} />
      </nav>
    );
  }

  // Isolate the interaction of search button from other NaveMenuItem
  _activate (i) {
    (this.state.activeItem !== 'search') ?
      this.setState({activeItem: i}) : this.setState({activeItem: 'search'});
  }

  // Swith on or off search button
  _activateSearchBox (i) {
    this.setState({activeItem: i});
  }

  _deactivate () {
    this._activate(null);
  }
}

NavMenu.defaultProps = {
  lang: 'en'
};

export default Radium(NavMenu);
