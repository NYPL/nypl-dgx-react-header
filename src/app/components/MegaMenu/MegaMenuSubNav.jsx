import React from 'react';
import _ from 'underscore';
import ga from 'react-ga';

import config from '../../../../appConfig.js';
import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.jsx';

class MegaMenuSubNav extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    let items = _.map(this.props.items, (m, i) => {
        let target = m.link.en.text;

        if (typeof target === 'undefined') {
          // In reality target should never be undefined, but
          // this is plugging some holes in the fake data
          target = '#';
        } else if (!/^http/.exec(target)) {
          target = '//nypl.org/' + target;
        }
        
        return (
          <li key={i}>
            <a href={target} onClick={this._trackEvent.bind(this, m.name[this.props.lang]['text'])}>
              {m.name[this.props.lang]['text']}
            </a>
          </li>
        );
      });

    // Assign widget to the FindUs Menu Item by ID match
    let socialMediaWidget = (this.props.navId === 'df621833-4dd1-4223-83e5-6ad7f98ad26a') ?
      <SocialMediaLinksWidget 
        className={'MegaMenu-SubNav-SocialMediaWidget'}
        links={config.socialMediaLinks} 
        displayOnly={['facebook', 'twitter']} /> : null;

    return (
      <div className='MegaMenu-SubNav'>
        <h2>{this.props.label[this.props.lang].text}</h2>
        <ul>{items}</ul>
        {socialMediaWidget}
      </div>
    );
  }

  /**
   * _trackEvent(gaLabel)
   * Track a GA click event.
   *
   * @param {gaLabel} String Label for GA event.
   */
  _trackEvent(gaLabel) {
    ga.event({
      category: 'NYPL Header',
      action: 'Click',
      label: `MegaMenu SubNav - ${gaLabel}`
    });
  }
}

MegaMenuSubNav.defaultProps = {
  lang: 'en'
};

export default MegaMenuSubNav;