import alt from '../alt.js';
import axios from 'axios';

class Actions {

  fetchHeaderData() {
    let self = this;

    // // Here we will use the client side AJAX request
    // // to fetch data
    axios
      .get('https://dev-header.nypl.org/')
      .then(result => {
        self.actions.updateHeaderData(result.data);
      })
      .catch(error => {
        console.log('Error on local data fetch', error);
      });

  }

  updateHeaderData(data) {
    this.dispatch(data);
  }

  failedHeaderData(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(Actions);