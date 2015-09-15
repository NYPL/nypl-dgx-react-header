import alt from '../alt.js';
import Actions from '../actions/Actions.js';

class Store {
  constructor(){

    this.bindListeners({
      handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleUpdateIsHeaderSticky: Actions.UPDATE_IS_HEADER_STICKY
    });

    this.state = {
      headerData: [],
      errorMessage: null,
      isSticky: false,
      activeMobileButton: ''
    };
  }

  // Public Methods
  static _getMobileMenuBtnValue() {
    return this.state.activeMobileButton;
  }

  // Private Methods
  handleUpdateHeaderData(data) {
    this.setState({headerData: data});
  }

  handleFetchHeaderData() {
    this.setState({headerData: []});
  }

  handleHeaderDataFailedFetch(errorMessage) {
    this.setState({errorMessage: errorMessage});
  }

  handleSetMobileMenuButtonValue(currentActiveMobileButton) {
    this.setState({activeMobileButton: currentActiveMobileButton});
  }

  handleUpdateIsHeaderSticky(value) {
    this.setState({isSticky: value});
  }
}

// Export our newly created Store
export default alt.createStore(Store, 'Store');