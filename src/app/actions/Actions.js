import alt from '../alt.js';
import axios from 'axios';

import appConfig from '../../../appConfig.js';

class Actions {
  // TODO: Clean this method with new API methods
  fetchHeaderData(appEnv) {
    let self = this,
      headerRootUrl;

    // Set the proper URL to fetch the Header Data model.
    if (appEnv === 'development') {
      headerRootUrl = appConfig.headerClientEnv.development;
    } else if (appEnv === 'qa') {
      headerRootUrl = appConfig.headerClientEnv.qa;
    } else {
      headerRootUrl = appConfig.headerClientEnv.production;
    }

    // Here we will use the client side AJAX request
    // to fetch data
    axios
      .get(headerRootUrl + '/header-data')
      .then(result => {
        self.actions.updateHeaderData(result.data);
      })
      .catch(response => {
        console.warn('Error on Axios GET request: ' + headerRootUrl + '/header-data');

        if (response instanceof Error) {
          console.log(response.message);
          self.actions.updateHeaderData([]);
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
          console.log(response.config);
        }
      });
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

  setLastActiveMenuItem(value) {
    this.dispatch(value);
  }

  searchButtonActionValue(actionValue) {
    this.dispatch(actionValue);
  }

  updateIsHeaderSticky(value) {
    this.dispatch(value);
  }

  toggleSubscribeFormVisible(value) {
    this.dispatch(value);
  }
}

export default alt.createActions(Actions);
