import React from 'react';
import cx from 'classnames';
import _ from 'underscore';

class SocialMediaLinksWidget extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let displayOnlyList = this.props.displayOnly,
      socialLinksList = this.props.links,
      socialLinksToDisplay,
      linkClass;

    // Pick the selected links to display (optional)
    if (displayOnlyList && displayOnlyList.length) {
      socialLinksList = _.pick(socialLinksList, displayOnlyList);
    }

    // Iterate over each object key->value pair and display as a list item
    socialLinksToDisplay = _.map(socialLinksList, (item, key) => {
      linkClass = cx(`${this.props.className}-Link`, `icon-${key}`);
      return (
        <li className={`${this.props.className}-ListItem`}>
          <a href={item} className={linkClass}></a>
        </li>
      );
    });

    return (
      <div className={this.props.className}>
        <ul className={`${this.props.className}-List`}>
          {socialLinksToDisplay}
        </ul>
      </div>
    );
  }
}

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'SocialMediaLinksWidget'
};

export default SocialMediaLinksWidget;