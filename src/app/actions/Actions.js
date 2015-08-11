import alt from '../alt.js';
// small http request library for client/server
import request from 'superagent';

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