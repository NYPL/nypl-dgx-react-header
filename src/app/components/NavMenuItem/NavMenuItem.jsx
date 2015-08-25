import React from 'react';
import cx from 'classnames';
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
    let classes = cx('NavMenuItem-Link', {'active': this.state.activeItem === this.props.index});
    let target = (this.props.target !== '#') 
        ? `${this.props.root}${this.props.target}` : this.props.target;

    return (
      <li
        onMouseEnter={this._activate} 
        onMouseLeave={this._deactivate}
        className={(this.props.navId) ? 'NavMenuItem-'+this.props.navId : 'NavMenuItem'}>
        <span 
          className={classes}
          id={(this.props.navId) ? 'NavMenuItem-Link-'+this.props.navId : 'NavMenuItem-Link'}>
          <a href={target}>
            {this.props.label[this.props.lang]}
          </a>
        </span>
        <MegaMenu
          label={this.props.label}
          lang={this.props.lang}
          items={this.props.subNav}
          navId={this.props.navId}
          features={this.props.features}
          index={this.props.index}
          currentActiveItem={this.state.activeItem} />
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
  lang: 'en'
};

export default NavMenuItem;