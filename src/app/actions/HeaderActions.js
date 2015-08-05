import AppDispatcher from '../dispatcher/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';
import HeaderStore from '../stores/HeaderStore';

// Dispatcher will update the App Constants
export default {
	// Updates the visibility of the Subscribe Form
	// by passing in the boolean value.
	updateSubscribeFormVisible(subscribeFormVisible) {
  	AppDispatcher.handleAction({
			actionType: HeaderConstants.SUBSCRIBE_FORM_VISIBLE,
			subscribeFormVisible: subscribeFormVisible
		});
	},
	// Dispatches assigned action SUBSCRIBE_FORM_VISIBLE with new boolean value
	toggleSubscribeFormVisible() {
  	AppDispatcher.handleAction({
			actionType: HeaderConstants.SUBSCRIBE_FORM_VISIBLE,
			subscribeFormVisible: HeaderStore.getSubscribeFormVisible()
		});		
	},
	// Dispatches assigned action SSO_WINDOW_VISIBLE with new boolean value
	toggleSSOWindowVisible() {
  	AppDispatcher.handleAction({
			actionType: HeaderConstants.SSO_WINDOW_VISIBLE,
			ssoWindowVisible: HeaderStore.getSSOWindowVisible()
		});
	},
	updateSubscribeFormStatus(subscribeFormStatus) {
  	AppDispatcher.handleAction({
			actionType: HeaderConstants.SUBSCRIBE_FORM_STATUS,
			subscribeFormStatus: HeaderStore.getSubscribeFormStatus()
		});	
	}
};
