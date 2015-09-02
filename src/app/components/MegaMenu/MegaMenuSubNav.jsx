import React from 'react';
import _ from 'underscore';

import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.jsx';

class MegaMenuSubNav extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    let items = _.map(this.props.items, function(m, i) {
        let target = m.target;

        if (typeof target === 'undefined') {
          // In reality target should never be undefined, but
          // this is plugging some holes in the fake data
          target = '#';
        } else if (!/^http/.exec(target)) {
          target = '//nypl.org/' + target;
        }
        
        return (
          <li key={i}>
            <a href={target}>{m.label[this.props.lang]}</a>
          </li>
        );
    }, this);

    let socialMediaWidget = (this.props.navId === 'abb58f55-20e0-0d34-d1ae-45687cc4799d') ?
      <SocialMediaLinksWidget 
        className={'MegaMenu-SubNav-SocialMediaWidget'} 
        displayOnly={['facebook', 'twitter']} /> : null;

    return (
      <div className='MegaMenu-SubNav'>
        <h2>{this.props.label[this.props.lang]}</h2>
        <ul>{items}</ul>
        {socialMediaWidget}
      </div>
    );
  }
}

MegaMenuSubNav.defaultProps = {
  lang: 'en'
};

export default MegaMenuSubNav;