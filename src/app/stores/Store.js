import alt from '../alt.js';
import Actions from '../actions/Actions.js';

class Store {
  constructor(){

    this.bindListeners({
      handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleSearchButtonActionValue: Actions.SEARCH_BUTTON_ACTION_VALUE,
      handleUpdateIsHeaderSticky: Actions.UPDATE_IS_HEADER_STICKY
    });

    this.exportPublicMethods({
      _getMobileMenuBtnValue: this._getMobileMenuBtnValue,
      _getSearchButtonActionValue: this._getSearchButtonActionValue,
      _getIsStickyValue: this._getIsStickyValue
    });

    this.state = {
      headerData: [],
      errorMessage: null,
      isSticky: false,
      activeMobileButton: '',
      searchButtonAction:''
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
   * _getSearchButtonActionValue()
   * returns the current state.getSearchButtonActionValue
   * value.
   * @return {String}
   */
  _getSearchButtonActionValue() {
    return this.state.searchButtonAction;
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

  // The set search button action value to Store
  handleSearchButtonActionValue(actionValue) {
    this.setState({searchButtonAction: actionValue});
  }

  handleUpdateIsHeaderSticky(value) {
    this.setState({isSticky: value});
  }
}

// Export our newly created Store
export default alt.createStore(Store, 'Store');