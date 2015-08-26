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
        label={item.attributes.name}
        lang='en'
        target={item.attributes.link.en.text}
        navId={item.id}
        features={item['related-mega-menu-panes']}
        subNav={item.children}
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
