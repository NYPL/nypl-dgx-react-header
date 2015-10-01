import React from 'react';
import cx from 'classnames';

import gaUtils from '../../utils/gaUtils.js';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';

class NavMenuItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    };

    // Allows binding methods that reference this
    this._activate = this._activate.bind(this);
    this._deactivate = this._deactivate.bind(this);
  }

  render() {

    let target = (this.props.target.indexOf('nypl.org') !== -1 || this.props.target === '#') ?
        this.props.target : `${this.props.root}${this.props.target}`,
      megaMenu = (this.props.subNav && this.props.features) ?
        <MegaMenu
          label={this.props.label}
          lang={this.props.lang}
          items={this.props.subNav}
          navId={this.props.navId}
          features={this.props.features}
          index={this.props.index}
          currentActiveItem={this.state.activeItem} /> : null,
      classes = cx({'active': this.state.activeItem === this.props.index});

    return (
      <li
        onMouseEnter={this._activate} 
        onMouseLeave={this._deactivate}
        id={(this.props.navId) ? `${this.props.className}-${this.props.navId}` : this.props.className}
        className={this.props.className}>
        <span 
          className={`NavMenuItem-Link ${classes}`}
          id={(this.props.navId) ? 'NavMenuItem-Link-' + this.props.navId : 'NavMenuItem-Link'}>
          <a href={target} onClick={gaUtils._trackEvent.bind(this, 'Go to...', `${this.props.label['en'].text}`)}>
            {this.props.label[this.props.lang].text}
          </a>
          {(this.props.subNav && this.props.features) ? 
            <span className={`NavMenuItem-Arrow-${this.props.navId} ${classes}`}></span> : null}
        </span>
        {megaMenu}
      </li>
    );
  }

  // Set the current index as the state's active item
  _activate() {
    this.setState({activeItem: this.props.index});
  }

  // Reset the state to null
  _deactivate() {
    this.setState({activeItem: null});
  }
}

NavMenuItem.defaultProps = {
  target: '#',
  root: '//nypl.org/',
  lang: 'en',
  className: 'NavMenuItem'
};

export default NavMenuItem;