import alt from '../alt.js';
import ApiService from '../utils/ApiService.js';

class Actions {

  fetchHeaderData() {
    let self = this;

    // Here we will use the client side AJAX request
    // to fetch data
    ApiService
      .fetchData('local')
      .then((result) => {
        self.actions.updateHeaderData(result);
      })
      .catch((error) => {
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