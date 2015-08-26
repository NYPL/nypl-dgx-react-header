import Radium from 'radium';
import React from 'react';
// Dependent Components
import NavMenuItem from '../NavMenuItem/NavMenuItem.jsx';

class NavMenu extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let navMenu = this.props.items.map((item, index) => {
      return (
        <NavMenuItem 
        label={item.label}
        lang={this.props.lang}
        target={item.target}
        navId={item.id}
        features={item.features}
        subNav={item.subnav}
        key={index}
        index={index} />
      );
    });

    return (
      <nav className='NavMenu'>
        <ul className='NavMenu-List'>
          {navMenu}
        </ul>
      </nav>
    );
  }
}

NavMenu.defaultProps = {
  lang: 'en'
};

export default Radium(NavMenu);
