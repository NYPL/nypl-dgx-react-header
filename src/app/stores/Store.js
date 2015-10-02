import alt from '../alt.js';
import Actions from '../actions/Actions.js';

class Store {
  constructor(){

    this.bindListeners({
      handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleUpdateIsHeaderSticky: Actions.UPDATE_IS_HEADER_STICKY,
      handleSetLastActiveMenuItem: Actions.SET_LAST_ACTIVE_MENU_ITEM
    });

    this.exportPublicMethods({
      _getMobileMenuBtnValue: this._getMobileMenuBtnValue,
      _getIsStickyValue: this._getIsStickyValue,
      _getLastActiveMenuItem: this._getLastActiveMenuItem
    });

    this.state = {
      headerData: [],
      errorMessage: null,
      isSticky: false,
      lastActiveMenuItem: '',
      activeMobileButton: ''
    };
  }

  /*** PUBLIC METHODS ***/
  /**
   * _getMobileMenuBtnValue() 
   * returns the current state.activeMobileButton
   * value.
   * @return {String}
   */
  _getMobileMenuBtnValue() {
    return this.state.activeMobileButton;
  }

  /**
   * _getIsStickyValue() 
   * returns the current state.isSticky value.
   *
   * @return {Boolean} true/false
   */
  _getIsStickyValue() {
    return this.state.isSticky;
  }

  _getLastActiveMenuItem() {
    return this.state.lastActiveMenuItem;
  }

  /*** PRIVATE METHODS ***/
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

  handleSetLastActiveMenuItem(value) {
    this.setState({lastActiveMenuItem: value});
  }
}

// Export our newly created Store
export default alt.createStore(Store, 'Store');