// NOTE: Header Data source has moved from AJAX dependent to
// JSON config file as of 08/30/2016.

// import express from 'express';
// import axios from 'axios';
// import parser from 'jsonapi-parserinator';
// import { navConfig } from 'dgx-header-component';
// // Model and Config
// import { HeaderItemModel } from 'dgx-model-data';
// import { refineryApi } from '../../../appConfig.js';
// // Logging
// import { getLogger } from 'dgx-loggly';
//
// import {
//   map as _map,
//   findWhere as _findWhere,
// } from 'underscore';
//
// // App environment settings
// const appEnvironment = 'production';
// const apiRoot = refineryApi.root[appEnvironment];
// const options = {
//   endpoint: `${apiRoot}${refineryApi.endpoint}`,
//   includes: refineryApi.includes,
//   filters: refineryApi.filters,
// };
//
// // Create winston logger instance
// const logger = getLogger({
//   env: appEnvironment,
//   appTag: 'Header-App',
//   token: process.env.LOGGLY_TOKEN,
//   subdomain: process.env.LOGGLY_SUBDOMAIN,
// });
//
// // Initialize Express Router
// const router = express.Router();
//
// // Assign full API url
// const completeApiUrl = parser.getCompleteApi(options);
//
// const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));
//
// /*
//  * getHeaderData()
//  * Parse the header endpoint response and add featured items to the selected IA array
//  * from the config, but based on the url query.
//  */
// const getHeaderData = (urlType, iaNavArray, apiResponse) => {
//   const iaNavCopy = iaNavArray;
//   let nav = [];
//   const opts = { urlsAbsolute: (urlType === 'absolute') };
//   const parsed = parser.parse(apiResponse, options);
//   const modelData = HeaderItemModel.build(parsed, opts);
//
//   const urlsAbsolute = opts.urlsAbsolute || false;
//
//   nav = _map(iaNavCopy, headerItem => {
//     const item = _findWhere(modelData, { id: headerItem.id });
//
//     if (item) {
//       headerItem.features = item.features;
//     }
//
//     headerItem.link = urlsAbsolute ? headerItem.link :
//       HeaderItemModel.validateUrlObjWithKey(headerItem.link, 'text');
//
//     _map(headerItem.subnav, sub => {
//       sub.link = urlsAbsolute ? sub.link :
//         HeaderItemModel.validateUrlObjWithKey(sub.link, 'text');
//
//       return sub;
//     });
//
//     return headerItem;
//   });
//
//   return nav;
// };
//
// /* Match the root (/) or /isolated-header path
//  * to populate the HeaderStore data from
//  * the static navConfig file's current IA.
//  */
// router
//   .route('/:var(header-markup)?')
//   .get((req, res, next) => {
//     res.locals.data = {
//       HeaderStore: {
//         headerData: navConfig.current,
//         subscribeFormVisible: false,
//         myNyplVisible: false,
//       },
//       // Set the API URL here so we can access it when we
//       // render in the EJS file.
//       completeApiUrl,
//     };
//     next();
//       /* end Axios call */
//   });
//
// router
//   .route('/header-data')
//   .get((req, res) => {
//     const urlType = req.query.urls || '';
//     const iaType = req.query.ia || '';
//
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Cache-Control', 'max-age=3600');
//
//     axios
//       .get(completeApiUrl)
//       .then(data => {
//         const iaNavArray = (iaType === 'upcoming') ?
//           _map(navConfig.upcoming, deepCopy) :
//           _map(navConfig.current, deepCopy);
//         const headerData = getHeaderData(urlType, iaNavArray, data.data);
//
//         res.json(headerData);
//       })
//       .catch(error => {
//         logger.log('Error calling API', error);
//         res.json({ error: 'error calling API' });
//       });
//       /* end Axios call */
//   });
//
// export default router;
