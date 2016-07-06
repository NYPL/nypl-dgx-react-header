import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import { navConfig } from 'dgx-header-component';
// Model and Config
import { HeaderItemModel } from 'dgx-model-data';
import { refineryApi } from '../../../appConfig.js';
// Logging
import { getLogger } from 'dgx-loggly';

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

/* Match the root or /isolated-header path
 * to populate the HeaderStore data from
 * the Header navConfig file's current IA.
 */
router
  .route('/:var(header-markup)?')
  .get((req, res, next) => {
    res.locals.data = {
      HeaderStore: {
        headerData: navConfig.current,
        subscribeFormVisible: false,
        myNyplVisible: false,
      },
      // Set the API URL here so we can access it when we
      // render in the EJS file.
      completeApiUrl,
    };
    next();
  });

// This will need to be re-factored to provide an endpoint containing the full header data for both
// current and upcoming structures with featured items.
router
  .route('/header-data')
  .get((req, res) => {
    const urlType = req.query.urls || '';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    axios
      .get(completeApiUrl)
      .then(data => {
        const opts = { urlsAbsolute: (urlType === 'absolute') };
        const parsed = parser.parse(data.data, options);
        const modelData = HeaderItemModel.build(parsed, opts);

        res.json(modelData);
      })
      .catch(error => {
        logger.log('Error calling API', error);
        res.json({ error: 'error calling API' });
      });
      /* end Axios call */
  });

export default router;
