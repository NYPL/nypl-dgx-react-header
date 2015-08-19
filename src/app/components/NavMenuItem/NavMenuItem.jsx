import React from 'react';
import cx from 'classnames';

class NavMenuItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Allows binding methods that reference this
    this._activate = this._activate.bind(this);
  }

  render() {
    let classes = cx('NavMenuItem', {'active': this.props.isActive}),
      target = (this.props.target !== '#') 
        ? `${this.props.root}${this.props.target}` : this.props.target;

    return (
      <li className={classes} id={(this.props.navId) ? 'NavMenuItem-'+this.props.navId : 'NavMenuItem'}>
        <a href={target} onMouseEnter={this._activate} >
          {this.props.label[this.props.lang]['text']}
        </a>
      </li>
    );
  }

  // Pass the index of this item up to the parent so that it can set
  // the active item
  _activate() {
    this.props.activate(this.props.index);
  }
}

NavMenuItem.defaultProps = {
  target: '#',
  root: '//nypl.org/',
  lang: 'en'
};

export default NavMenuItem;