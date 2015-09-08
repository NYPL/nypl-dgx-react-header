import alt from '../alt.js';
import ApiService from '../utils/ApiService.js';

class Actions {
  // TODO: Clean this method with new API methods
  fetchHeaderData() {
    let self = this;
  }

  updateHeaderData(data) {
    this.dispatch(data);
  }

  failedHeaderData(errorMessage) {
    this.dispatch(errorMessage);
  }

  setMobileMenuButtonValue(currentActiveMobileButton) {
    this.dispatch(currentActiveMobileButton);
  }
}

export default alt.createActions(Actions);