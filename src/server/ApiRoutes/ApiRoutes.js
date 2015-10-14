import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import Model from '../../app/utils/HeaderItemModel.js';
import {refineryApi} from '../../../appConfig.js';

let router = express.Router(),
  appEnvironment = process.env.APP_ENV || 'production',
  apiRoot = refineryApi.root[appEnvironment],
  options = {
    endpoint: `${apiRoot}${refineryApi.endpoint}`,
    includes: refineryApi.includes,
    filters: refineryApi.filters
  };

const completeApiUrl = parser.getCompleteApi(options);

router
  .route('/')
  .get((req, res, next) => {
    axios
      .get(completeApiUrl)
      .then(data => {
        let parsed = parser.parse(data.data, options),
          modelData = Model.build(parsed);

        res.locals.data = {
          Store: {
            headerData: modelData,
            subscribeFormVisible: false
          },
          // Set the API URL here so we can access it when we
          // render in the EJS file.
          completeApiUrl
        };
        next();
      })
      .catch(error => {
        console.log('error calling API : ' + error);
        console.log('Attempted to call : ' + completeApiUrl);

        res.locals.data = {
          completeApiUrl
        };
        next();
      }); /* end Axios call */
  });

router
  .route('/header-data')
  .get((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    axios
      .get(completeApiUrl)
      .then(data => {
        let parsed = parser.parse(data.data, options),
          modelData = Model.build(parsed);

        res.json(modelData);
      })
      .catch(error => {
        console.log('error calling API');
        res.json({'error': 'error calling API'});
      }); /* end Axios call */
  });

export default router;
