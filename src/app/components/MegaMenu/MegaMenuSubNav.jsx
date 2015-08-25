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

    return (
      <div className='MegaMenu-SubNav'>
        <h2>{this.props.label[this.props.lang]}</h2>
        <ul>{items}</ul>
        <SocialMediaLinksWidget 
          className={'MegaMenu-SubNav-SocialMediaWidget'} 
          displayOnly={['facebook', 'twitter']} />
      </div>
    );
  }
}

MegaMenuSubNav.defaultProps = {
  lang: 'en'
};

export default MegaMenuSubNav;