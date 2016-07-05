import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import { navConfig } from 'dgx-header-component';
// Model and Config
import { HeaderItemModel }  from 'dgx-model-data';
import { refineryApi } from '../../../appConfig.js';
// Logging
import { getLogger } from 'dgx-loggly';

import {
  map as _map,
  findWhere as _findWhere,
} from 'underscore';

// App environment settings
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = refineryApi.root[appEnvironment];
const options = {
  endpoint: `${apiRoot}${refineryApi.endpoint}`,
  includes: refineryApi.includes,
  filters: refineryApi.filters,
};

// Create winston logger instance
const logger = getLogger({
  env: appEnvironment,
  appTag: 'Header-App',
  token: process.env.LOGGLY_TOKEN,
  subdomain: process.env.LOGGLY_SUBDOMAIN,
});

// Initialize Express Router
const router = express.Router();

// Assign full API url
const completeApiUrl = parser.getCompleteApi(options);

/*
 * getHeaderData()
 * Parse the header endpoint response and add featured items to the selected IA array
 * from the config, but based on the url query.
 */
const getHeaderData = (urlType, iaType, apiResponse) => {
  const opts = { urlsAbsolute: (urlType === 'absolute') };
  const iaArray = (iaType === 'upcoming') ? navConfig.upcoming : navConfig.current;
  const parsed = parser.parse(apiResponse, options);
  const modelData = HeaderItemModel.build(parsed, opts);

  _map(iaArray, headerItem => {
    const item = _findWhere(modelData, { id: headerItem.id });

    if (item) {
      headerItem.features = item.features;
    }
  });

  return iaArray;
};

/* Match the root or /isolated-header path
 * to populate the HeaderStore data from
 * the Header navConfig file's current IA.
 */
router
  .route('/:var(header-markup)?')
  .get((req, res, next) => {
    const urlType = req.query.urls || '';
    const iaType = req.query.ia || '';

    axios
      .get(completeApiUrl)
      .then(data => {
        const headerData = getHeaderData(urlType, iaType, data.data);

        res.locals.data = {
          HeaderStore: {
            headerData,
            subscribeFormVisible: false,
            myNyplVisible: false,
          },
          // Set the API URL here so we can access it when we
          // render in the EJS file.
          completeApiUrl,
        };
        next();
      })
      .catch(error => {
        logger.error(`Error calling API : ${completeApiUrl}. ${error}`);
        // Set completeApiUrl for client side calling, if server side calling failed
        res.locals.data = {
          completeApiUrl,
        };
        next();
      });
      /* end Axios call */
  });

// This will need to be re-factored to provide an endpoint containing the full header data for both
// current and upcoming structures with featured items.
router
  .route('/header-data')
  .get((req, res) => {
    const urlType = req.query.urls || '';
    const iaType = req.query.ia || '';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    axios
      .get(completeApiUrl)
      .then(data => {
        const headerData = getHeaderData(urlType, iaType, data.data);

        res.json(headerData);
      })
      .catch(error => {
        logger.log('Error calling API', error);
        res.json({ error: 'error calling API' });
      });
      /* end Axios call */
  });

export default router;
