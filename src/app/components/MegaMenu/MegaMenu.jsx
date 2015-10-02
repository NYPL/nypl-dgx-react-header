import React from 'react';
import cx from 'classnames';

import HeaderStore from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

import MegaMenuSubNav from './MegaMenuSubNav.jsx';
import MegaMenuFeatures from './MegaMenuFeatures.jsx';

class MegaMenu extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      lastActiveMenuItem: HeaderStore.getState().lastActiveMenuItem
    }
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({lastActiveMenuItem: HeaderStore.getState().lastActiveMenuItem});
  }

  render() {
    // Dynamic class assignment based on activeItem property matching current index.
    let classes = cx('MegaMenu', {
      'active animateMegaMenuEnter fadeIn': this.props.index === this.props.currentActiveItem,
      'active': HeaderStore._getLastActiveMenuItem() === this.props.navId && this.props.index !== this.props.currentActiveItem
    });

    return (
      <div 
      onMouseEnter={this._watchHoverIntentEnter.bind(this)}
      onMouseLeave={this._watchHoverIntentLeave.bind(this)}
      id={(this.props.navId) ? 'MegaMenu-' + this.props.navId : 'MegaMenu'}
        className={classes}>
          <div className='MegaMenu-LeftBgWrapper'></div>
          <div className='MegaMenu-Wrapper'>
            <div className='MegaMenu-SubNavWrapper'>
              <MegaMenuSubNav
                label={this.props.label} 
                items={this.props.items} 
                lang={this.props.lang}
                navId={this.props.navId} />
            </div>
            <div className='MegaMenu-FeaturesWrapper'>
              <MegaMenuFeatures navId={this.props.navId} features={this.props.features} />
            </div>
          </div>
      </div>
    );
  }

  _watchHoverIntentEnter() {
    if (this.props.lastActiveMenuItem === this.props.navId) {
      Actions.setLastActiveMenuItem(this.props.navId);
    }
  }

  _watchHoverIntentLeave() {
    Actions.setLastActiveMenuItem('');
  }
}

MegaMenu.defaultProps = {
  lang: 'en'
};

module.exports = MegaMenu;