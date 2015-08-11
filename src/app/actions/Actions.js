import alt from '../alt.js';

class Actions {

  fetchHeaderData() {
    let self = this;

    // Here we will use the client side AJAX request
    // to fetch data
  }

  updateHeaderData(data) {
    this.dispatch(data);
  }

  failedHeaderData(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(Actions);