import alt from '../alt.js';
import Actions from '../actions/Actions.js';
import HeaderSource from '../utils/HeaderSource.js';

class Store {
  constructor(){
    this.headerData = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA
    });

    this.registerAsync(HeaderSource);
  }

  handleUpdateHeaderData(data) {
    this.headerData = data;
  }

  handleFetchHeaderData() {
    this.headerData = [];
  }

  handleHeaderDataFailedFetch(errorMessage) {
    this.errorMessage =  errorMessage;
  }
}

// Export our newly created Store
export default alt.createStore(Store, 'Store');