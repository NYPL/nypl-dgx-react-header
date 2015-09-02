import React from 'react';
import cx from 'classnames';

class SocialMediaLinksWidget extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let displayOnlyList = this.props.displayOnly,
      socialMediaName,
      linkClass,
      // TODO: Will a fallback exist in the code?
      socialLinksProp = this.props.links || [
      {
        url : 'https://www.facebook.com/nypl',
        name: 'Facebook'
      },
      {
        url : 'https://twitter.com/nypl',
        name: 'Twitter'
      },
      {
        url : 'https://instagram.com/nypl',
        name: 'Instagram'
      },
      {
        url : 'http://nypl.tumblr.com/',
        name: 'Tumblr'
      },
      {
        url : 'https://www.youtube.com/user/NewYorkPublicLibrary',
        name: 'Youtube'
      },
      {
        url : 'https://soundcloud.com/nypl',
        name: 'Soundcloud'
      }
    ];

    let socialLinks = socialLinksProp.map((item, index) => {
      // shorter name reference to the name of the link
      socialMediaName = item.name.toLowerCase();

      // dynamic class assignment based on the link name
      linkClass = cx(this.props.className + '-Link', 'icon-'+item.name.toLowerCase());

      // Only return those links that are matched with the included options
      if (displayOnlyList && displayOnlyList.length) {
        if (displayOnlyList.indexOf(socialMediaName) !== -1) {
          return (
            <li key={index} className={this.props.className + '-ListItem'}>
              <a href={item.url} className={linkClass}>{item.name}</a>
            </li>
          );
        }
      } else {
        return (
          <li key={index} className={this.props.className + '-ListItem'}>
            <a href={item.url} className={linkClass}>{item.name}</a>
          </li>
        );
      }
    });

    return (
      <div className={this.props.className}>
        <ul className={this.props.className + '-List'}>
          {socialLinks}
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