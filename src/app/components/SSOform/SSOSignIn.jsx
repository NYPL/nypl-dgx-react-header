import Radium from 'radium';
import React from 'react';
import InputField from '../InputField/InputField.jsx';
import cookie from 'react-cookie';

class SSOSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remember: (!!this.props.remember) || false
    }
  }

  render() {
    return (
      <div id='login-form' className='LoginForm'> 
        <form action='/' method='post' id='bc-sso-login-form--2' acceptCharset='UTF-8' onSubmit={this.submitSSO.bind(this)}>
          <div className='LoginForm-fieldContainer LoginForm-usernameField'>
            <input type='text' id='username' name='name'
              ref='username' placeholder='User Name or Barcode' autoComplete='off' />
            <div className='LoginForm-checkbox'>
              <input type='checkbox' id='remember_me' name='remember_me'
                checked={this.state.remember}
                onChange={this._remember_me.bind(this)}
                className='form-checkbox' ref='remember' />
              <label className='option' htmlFor='remember_me'>Remember me </label>
            </div>
          </div>

          <div className='LoginForm-fieldContainer LoginForm-shortField'>
            <input style={{width:'85px'}} type='password' id='pin'
              name='user_pin' size='60' maxLength='128' ref='pin'
              className='form-text' autoComplete='off' placeholder='PIN' />
              <a href='https://nypl.bibliocommons.com/user/forgot' className='forgotpin-button'>Forgot your PIN?</a>
          </div>

          <div className='LoginForm-fieldContainer LoginForm-shortField'>
            <InputField type='hidden' name='destination' value='http://www.nypl.org/' />
            <InputField
              id='login-form-submit' 
              type='submit'
              name='op'
              value='Log In'
              className='form-submit'
              style={styles.submitButton} />
              <a href='http://www.nypl.org/help/library-card' className='createacct-button'>Create an Account</a>
          </div>
        </form>
      </div>
    );
  }

  _remember_me(e) {
    this.setState({remember: e.target.checked});
  }

  submitSSO(e) {
    e.preventDefault();

    let data = {
        username: React.findDOMNode(this.refs.username).value,
        pin:      React.findDOMNode(this.refs.pin).value,
        remember: this.state.remember,
      },
      url = 'https://nypl.bibliocommons.com/user/login?destination=';

    if (data.remember) {
      cookie.save('remember_me', { path: '/' });
    } else {
      cookie.remove('remember_me');
    }

    url += window.location.href.replace('#', '%23') + '&';
    url += 'name=' + data.username;
    url += '&user_pin=' + data.pin;

    window.location.href = url;
  }
}

const styles = {
  submitButton: {
    display: 'inline-block',
    backgroundColor: '#333',
    border: 'none',
    color: 'white',
    height: '37px',
    fontSize: '13px',
    width: '85px'
  }
};

export default Radium(SSOSignIn);
