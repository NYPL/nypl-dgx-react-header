import Radium from 'radium';
import React from 'react';
import _ from 'underscore';
import NavMenuItem from '../NavMenuItem/NavMenuItem.jsx';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';

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
  }

  render () {
    let items = _.map(this.props.items, function(m, i) {
      return (
        <NavMenuItem
          label={m.attributes.name}
          lang={this.props.lang}
          key={i}
          index={i}
          isActive={i === this.state.activeItem}
          activate={this._activate} />
      );
    }, this),
      megas = _.map(this.props.items, function(m, i) {
        return (
          <MegaMenu
            label={m.attributes.name}
            lang={this.props.lang}
            items={m.children}
            features={m['related-mega-menu-panes']}
            key={i}
            index={i}
            isActive={i === this.state.activeItem} />
        );
    }, this);
    return (
      <nav className='NavMenu' onMouseLeave={this._deactivate}>
        <ul className='NavMenu-TopLevelLinks'>
          {items}
        </ul>
        {megas}
      </nav>
    );
  }

  _activate (i) {
    this.setState({
      activeItem: i
    });
  }

  _deactivate () {
    this._activate(null);
  }
}

NavMenu.defaultProps = {
  lang: 'en'
};

export default Radium(NavMenu);
