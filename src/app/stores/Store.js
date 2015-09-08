import alt from '../alt.js';
import Actions from '../actions/Actions.js';
//import HeaderSource from '../utils/HeaderSource.js';

class Store {
  constructor(){

    this.bindListeners({
      handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE
    });

    this.state = {
      headerData: [],
      errorMessage: null,
      activeMobileButton: ''
    };
  }

  // Public GET Method
  static _getMobileMenuBtnValue() {
    return this.state.activeMobileButton;
  }

  // Private Store Methods
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
}

// Export our newly created Store
export default alt.createStore(Store, 'Store');