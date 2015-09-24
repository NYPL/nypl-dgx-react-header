import React from 'react';
import Radium from 'radium';
import axios from 'axios';
import cx from 'classnames';

import config from '../../../../appConfig.js';
import InputField from '../InputField/InputField.jsx';
import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.jsx';

class SubscribeMessageBox extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      notValidEmail: false
    };
  }

  render () {
    return (
      <div className={'EmailMessageBox ' + this.props.status + ' '}>
        <div className={this.props.className + '-Eyebrow'}></div>
        <div className={this.props.className + '-Title'}>{this.props.msg}</div>
      </div>
    );
  }
}

SubscribeMessageBox.defaultProps = {
  msg: 'Thank you for subscribing to our email updates.'
};

class EmailSubscription extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // Holds the initial state, replaces getInitialState() method
    this.state = {
      formProcessing: false,
      formStatus: ''
      //formStatus: HeaderStore.getSubscribeFormStatus()
    };

    this._validateForm = this._validateForm.bind(this);
  }

  /*componentDidMount () {
    HeaderStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount () {
    HeaderStore.removeChangeListener(this._onChange.bind(this));
  }*/

  render () {
    let status = this.state.formStatus,
      isLoading = this.state.formProcessing,
      notValidEmail = this.state.notValidEmail,
      contentBox;

    const errorClass =  cx({ 'active': notValidEmail, '': !notValidEmail });
    // console.log(this.state);

    if (!isLoading) {
      contentBox = (<div>
        <div className={'EmailMessageBox ' + status}>
          <div className={'EmailSubscribeForm-Eyebrow'}></div>
          <div className={'EmailSubscribeForm-Title'}>
            Get the <span className={'EmailSubscribeForm-Title-BestNYPL'}>best of NYPL</span> in your inbox
          </div>
        </div>
        <form 
        ref='EmailSubscribeForm'
        id={this.props.id}
        className={this.props.className}
        action={this.props.target} 
        method={this.props.form_method}
        name={this.props.form_name}
        onSubmit={this._validateForm}
        style={[
          styles.base,
          this.props.style
        ]}>
          <div className='EmailSubscribeForm-fields'>
            <InputField type='hidden' name='thx' value='http://pages.email.nypl.org/confirmation' />
            <InputField type='hidden' name='err' value='http://pages.email.nypl.org/confirmation' />
            <InputField type='hidden' name='SubAction' value='sub_add_update' />
            <InputField type='hidden' name='MID' value='7000413' />
            <InputField type='hidden' name='Email Type' value='HTML' />
            <InputField type='hidden' name='lid' value='1061' />
            
            <InputField
            className={this.props.className + '-Input'} 
            type='email'
            name='Email Address'
            placeholder={this.props.placeholder}
            style={styles.emailField}
            ref='emailAddressField'
            isRequired={true} />

            <div className={'EmailSubscribeForm-Error error ' + errorClass}>
              <span className='nypl-icon-solo-x icon'></span><span>Please enter a valid email address</span>
            </div>

            <div className={'EmailSubscribeForm-Submit'}>
              <span className='nypl-icon-check-solo icon'></span>
              <InputField
              type='submit'
              name='submit'
              value='SIGN UP'
              style={styles.submitButton} />
            </div>

            <InputField type='hidden' name='Source Code' value='Homepage' />
          </div>
        </form></div>);

      if (status === 'success') {
        contentBox = (
          <div>
            <SubscribeMessageBox status={status} msg="Thank you for subscribing to our email updates." 
              className={'EmailSubscribeForm'} />
            <div className='EmailSubscribeForm-NewEmail'>
              <a href='' onClick={this._initForm.bind(this)}>Enter another email address</a>
            </div>
            <div className={'EmailSubscribeForm-FollowUs'}>
              <p>Follow us:</p>
              <SocialMediaLinksWidget
                className={'EmailSubscribeForm-SocialMediaWidget'}
                links={config.socialMediaLinks} 
                displayOnly={['facebook', 'twitter']} />
            </div>
          </div>
        );     
      }

      if (status === 'exists') {
        contentBox = (
          <div>
            <SubscribeMessageBox status={status} msg="Looks like you're already signed up!"
              className={'EmailSubscribeForm'}/>
            <div className='EmailSubscribeForm-NewEmail'>
              <a href='' onClick={this._initForm.bind(this)}>Enter a different email address</a>
            </div>
          </div>
        );
      }

      if (status === 'error' || status === 'Internal Server Error') {
        contentBox = (
          <div className='EmailSubscribeForm-Misc-Error'>
            <div>Hmm...</div>
            <div>Something isn&apos;t quite right.</div>
            <div>Please try again.</div>
            <a href='' onClick={this._initForm.bind(this)} style={styles.tryAgainButton}>
              <span className='nypl-icon-arrow-left icon'></span>
              TRY AGAIN
            </a>
          </div>
        );     
      }

      return (
        <div>
          {contentBox}
          <a href={this.props.policyUrl}
            className='EmailSubscribeForm-pp-link'
            style={styles.privacyLink}>
            Privacy Policy
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <SubscribeMessageBox status={status} msg="Loading..." 
            className={'EmailSubscribeForm'} />
        </div>
      );
    }
  }

  _initForm(e) {
    e.preventDefault();
    this.setState({
      formProcessing: false,
      formStatus: ''
    });
  }

  // Store changes are funky, need to look into it
  /*_onChange () {
    this.setState({formStatus: HeaderStore.getSubscribeFormStatus()});
  }*/

  _validateForm (e) {
    let userInput = React.findDOMNode(this.refs.emailAddressField);

    // Prevent re-direct, handle validation
    e.preventDefault();

    if (!this._isValidEmail(userInput.value)) {
      userInput.value = '';
      userInput.placeholder = 'Please enter a valid email address';
      userInput.focus();
      this.setState({
        notValidEmail: true
      });
    } else {
      this.setState({
        notValidEmail: false
      });

      // Send as a POST request
      this._addSubscriberToList(
        userInput.value,
        this.props.target,
        this.props.list_id
      );
    }
  }

  _isValidEmail (value) {
    const emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
    if (!value) {
      return false;
    }

    return emailRegex.test(value);
  }

  _addSubscriberToList(email, url, listid) {
    const postUrl = `${url}/add-subscriber/${listid}`;

    // Display loader while processing finalizes.
    this.setState({
      formProcessing: true
    });

    axios.post(postUrl, {
      email: email
    })
    .then((response) => {
      this.setState({
        formStatus: response.data.responseStatus,
        formProcessing: false
      });
    })
    .catch((response) => {
      this.setState({
        formStatus: response.data.responseStatus || response.statusText,
        formProcessing: false
      });   
    });
  }
};

/* Default Component Properties */
EmailSubscription.defaultProps = {
  id: 'EmailSubscribeForm',
  className: 'EmailSubscribeForm',
  lang: 'en',
  target: 'http://cl.exct.net/subscribe.aspx',
  form_name: 'subscribeForm',
  list_id: '1061',
  form_method: 'POST',
  placeholder: 'Your email address',
  policyUrl: 'http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy'
};

const styles = {
  base: {
    backgroundColor: '#1DA1D4',
    padding: '0px',
    width: 'auto'
  },
  display: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  emailField: {},
  submitButton: {
    marginTop: '50px',
    border: '2px solid #fff',
    color: 'white',
    height: '38px',
    paddingLeft: '15px',
    width: '100px',
    borderRadius: '20px',
    fontSize: '12px',
    backgroundColor: '#1DA1D4',
    fontFamily: 'Kievit-Book'
  },
  tryAgainButton: {
    display: 'inline-block',
    border: '2px solid #fff',
    color: 'white',
    padding: '5px 15px 5px 5px',
    width: '90px',
    borderRadius: '20px',
    fontSize: '12px',
    backgroundColor: '#1DA1D4',
    fontFamily: 'Kievit-Book',
    marginTop: '25px'
  },
  privacyLink: {
    textDecoration: 'underline',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '200',
    position: 'absolute',
    bottom: '26px',
    right: '25px'
  }
};

export default Radium(EmailSubscription);
