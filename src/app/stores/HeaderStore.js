import EventEmitter from 'eventemitter3';
import AppDispatcher from '../dispatcher/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';
import _ from 'underscore';
// Boolean flag that initially hides the Subscribe Form
let _subscribeFormVisible =  false,
	_ssoWindowVisible = false;

let _subscribeFormStatus = '';

// Simple reference to a repetitive non-changing string
const CHANGE_EVENT = 'change';

/* Setters are assigned in private scope */
// Sets the boolean value of the Subscribe Form Visibility
function setSubscribeFormVisible (subscribeFormVisible) {
  _subscribeFormVisible = subscribeFormVisible;
}
// Toggles the boolean value of the Subscribe Form Visibility
// and checks the value of the SSO Window Visibility,
// if true, set it to false.
function toggleSubscribeFormVisible () {
	_subscribeFormVisible = !_subscribeFormVisible;
	if (_ssoWindowVisible) {
		_ssoWindowVisible = false;
	}
}
// Sets the boolean value of the SSO Window Visibility
function setSSOWindowVisible (ssoContainerVisible) {
	_ssoWindowVisible = ssoContainerVisible;
}

function setSubscribeFormStatus (subscribeFormStatus) {
	_subscribeFormStatus = subscribeFormStatus;
}
// Toggles the boolean value of the SSO Window Visibility
// and checks the value of the Subscribe Form Visibility, 
// if true, set it to false.
function toggleSSOWindowVisible () {
	_ssoWindowVisible = !_ssoWindowVisible;
	if (_subscribeFormVisible) {
		_subscribeFormVisible = false;
	}
}

const HeaderStore = _.extend({}, EventEmitter.prototype, {
	// Gets the state of the Subscribe Form Visibility boolean
	getSubscribeFormVisible () {
		return _subscribeFormVisible;
	},
	getSSOWindowVisible () {
		return _ssoWindowVisible;
	},
	// Get the state of the Form Status
	getSubscribeFormStatus () {
		return _subscribeFormStatus;
	},
	// Emits change event to all registered event listeners
	emitChange () {
		return this.emit(CHANGE_EVENT);
  },
  // Register a new change event listener
  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

HeaderStore.dispatchToken = AppDispatcher.register((payload) => {
	let action = payload.action;

	switch (action.actionType) {
		// Respond to SUBSCRIBE_FORM_VISIBLE action
		case HeaderConstants.SUBSCRIBE_FORM_VISIBLE:
			// using setter instead of toggle here.
			//setSubscribeFormVisible(action.subscribeFormVisible);
			
			toggleSubscribeFormVisible();
			HeaderStore.emitChange();
			break;
		// Respond to SSO_WINDOW_VISIBLE action
		case HeaderConstants.SSO_WINDOW_VISIBLE:
			toggleSSOWindowVisible();
			HeaderStore.emitChange();
		case HeaderConstants.SUBSCRIBE_FORM_STATUS:
			setSubscribeFormStatus(action.subscribeFormStatus);
			HeaderStore.emitChange();
		default:
    // Do nothing
	}
});

export default HeaderStore;
