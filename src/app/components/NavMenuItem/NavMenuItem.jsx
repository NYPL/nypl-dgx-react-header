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
      animateHover: false
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
          animateHover={this.state.animateHover}
          currentActiveItem={this.state.activeItem} /> : null,
      arrowClasses = cx({
        'active animateMenuHoverEnter fadeIn': this.state.animateHover || this.state.activeItem === this.props.index
      }),
      menuItemClasses = cx('NavMenuItem-Link', {'active': this.state.activeItem === this.props.index});

    return (
      <li
        id={(this.props.navId) ? `${this.props.className}-${this.props.navId}` : this.props.className}
        className={this.props.className}>
        <span
          onMouseEnter={this._activateHover} 
          onMouseLeave={this._deactivateHover}
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

    this.setState({animateHover: true});
  }

  // 
  _deactivateHover() {
    this.setState({activeItem: null});

    if (this.state.animateHover) {
      setTimeout(() => {
        this.setState({animateHover: false});
      }, 700);
    }
  }
}

NavMenuItem.defaultProps = {
  target: '#',
  root: '//www.nypl.org/',
  lang: 'en',
  className: 'NavMenuItem'
};

export default NavMenuItem;