import Radium from 'radium';
import React from 'react';

import SSOLoggedInMenu from './SSOLoggedInMenu.jsx';
import SSOSignIn from './SSOSignIn.jsx';

class SSOform extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='sso-login signIn-up-arrow'
        style={[
          styles.base,
          this.props.style,
          this.props.display ? styles.display : styles.hide
        ]}>
        {this.props.loggedIn ? <SSOLoggedInMenu /> : <SSOSignIn remember={this.props.remember} />}
      </div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: '#666',
    position: 'absolute',
    width: '365px',
    top: '38px',
    left: '-141px',
    zIndex: '1000',
  },
  display: {
    display: 'block'
  },
  hide: {
    display: 'none'
  }
};

export default Radium(SSOform);
