import React from 'react';
import cx from 'classnames';

import gaUtils from '../../utils/gaUtils.js';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';

class NavMenuItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null,
      animateHoverEnter: false,
      animateHoverLeave: false
    };

    // Allows binding methods that reference this
    this._activateHover = this._activateHover.bind(this);
    this._deactivateHover = this._deactivateHover.bind(this);
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
          animateHoverEnter={this.state.animateHoverEnter}
          animateHoverLeave={this.state.animateHoverLeave}
          currentActiveItem={this.state.activeItem} /> : null,
      arrowClasses = cx({
        'active animateMenuHover fadeIn': this.state.animateHoverEnter && this.state.activeItem === this.props.index,
        'active animateMenuHover fadeOut': this.state.animateHoverLeave
      }),
      menuItemClasses = cx('NavMenuItem-Link', {'active': this.state.activeItem === this.props.index});

    return (
      <li
        onMouseEnter={this._activateHover} 
        onMouseLeave={this._deactivateHover}
        id={(this.props.navId) ? `${this.props.className}-${this.props.navId}` : this.props.className}
        className={this.props.className}>
        <span 
          className={menuItemClasses}
          id={(this.props.navId) ? 'NavMenuItem-Link-' + this.props.navId : 'NavMenuItem-Link'}>
          <a href={target} onClick={gaUtils._trackEvent.bind(this, 'Click', `Nav Item: ${this.props.label['en'].text}`)}>
            {this.props.label[this.props.lang].text}
          </a>
          {(this.props.subNav && this.props.features) ? 
            <span className={`NavMenuItem-Arrow-${this.props.navId} ${arrowClasses}`}></span> : null}
        </span>
        {megaMenu}
      </li>
    );
  }

  // Set the current index as the state's active item
  _activateHover() {
    this.setState({activeItem: this.props.index});

    setTimeout(() => {
      this.setState({animateHoverEnter: true});
    }, 500);
  }

  // 
  _deactivateHover() {
    this.setState({activeItem: null});
    this.setState({animateHoverEnter: false});
    this.setState({animateHoverLeave: true});

    setTimeout(() => {
      this.setState({animateHoverLeave: false});
    }, 250);
  }
}

NavMenuItem.defaultProps = {
  target: '#',
  root: '//www.nypl.org/',
  lang: 'en',
  className: 'NavMenuItem'
};

export default NavMenuItem;