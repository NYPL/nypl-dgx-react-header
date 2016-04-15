import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
// Model and Config
import Model from '../../app/utils/HeaderItemModel.js';
import {refineryApi} from '../../../appConfig.js';

// Logging
import { getLogger, initMorgan } from 'dgx-loggly';

// Create winston logger instance
const logger = getLogger({
  env: process.env.NODE_ENV,
  appTag: 'Header-App',
  token: process.env.LOGGLY_TOKEN,
  subdomain: process.env.LOGGLY_SUBDOMAIN,
});

const router = express.Router();
const appEnvironment = 'production'; //process.env.APP_ENV || 'production';
const apiRoot = refineryApi.root[appEnvironment];
const options = {
  endpoint: `${apiRoot}${refineryApi.endpoint}`,
  includes: refineryApi.includes,
  filters: refineryApi.filters,
};

const completeApiUrl = parser.getCompleteApi(options);

/* Match the root or /isolated-header path
 * to populate the HeaderStore data and
 * correctly parse/build the model.
 */
router
  .route('/:var(header-markup)?')
  .get((req, res, next) => {
    axios
      .get(completeApiUrl)
      .then(data => {
        let parsed = parser.parse(data.data, options),
          modelData = Model.build(parsed);

        res.locals.data = {
          HeaderStore: {
            headerData: modelData,
            subscribeFormVisible: false,
            myNyplVisible: false
          },
          // Set the API URL here so we can access it when we
          // render in the EJS file.
          completeApiUrl
        };
        next();
      })
      .catch(error => {
        logger.error('error calling API : ' + completeApiUrl + '. ' + error);
        // Set completeApiUrl for client side calling, if server side calling failed
        res.locals.data = {
          completeApiUrl
        };
        next();
      }
      );
      /* end Axios call */
  });

router
  .route('/header-data')
  .get((req, res) => {
    const query = req.query.urls || '';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    axios
      .get(completeApiUrl)
      .then(data => {
        let parsed = parser.parse(data.data, options),
          modelData = (query === 'absolute') ?
            Model.build(parsed, { urlsAbsolute: true }) : Model.build(parsed);

        res.json(modelData);
      })
      .catch(error => {
        logger.log('error calling API');
        res.json({'error': 'error calling API'});
      });
      /* end Axios call */
  });

export default router;
