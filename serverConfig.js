import path from 'path';
import compression from 'compression';
import express from 'express';
import colors from 'colors';
import parser from 'jsonapi-parserinator';
// React
import React from 'react';
import Iso from 'iso';
import alt from './src/app/alt.js';
// Server Configurations
import appConfig from './appConfig.js';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

// Temporary API Service
import HeaderApiService from './src/app/utils/ApiService';
// Need to improve for server-side and client-side requests
import HeaderSource from './src/app/utils/HeaderSource.js';

import Header from './src/app/components/Header/Header.jsx';

const ROOT_PATH = __dirname;
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const API_URL = process.env.API_URL || appConfig.apiUrl;
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;

// Boolean flag that determines if we are running
// our application in Production Mode.
// Assigning as let variables, since they are mutable
let isProduction = process.env.NODE_ENV === 'production';
let serverPort = process.env.PORT || (isProduction ? 3001 : appConfig.port);
let refineryData;

// Use the HeaderApiService to fetch our Header Data
// // We would parse the Data at this point and Model it
// // Local Mock
// HeaderApiService
//   .fetchData('local')
//   .then((result) => {
//     refineryData = result;
//   })
//   .catch((error) => {
//     console.log('Error on local data fetch', error);
//   });


/* Express Server Configuration
 * ----------------------------
 * - Using .EJS as the view engine
*/
let app = express();

app.use(compression());

// Disables the Server response from
// displaying Express as the server engine
app.disable('x-powered-by');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the path where to find EJS files
app.set('views', INDEX_PATH);

// Assign the proper path where the
// application's dist files are located.
app.use(express.static(DIST_PATH));


/* Isomporphic Rendering of React App
 * ----------------------------------
 * 1. Render the App as a String to be passed
 *    to the server.
 * 2. Ideally we would pass in the API Data here
 *    to our component.
*/
// Assign the string containing the markup from the component
let headerApp = React.renderToString(<Header />);

// Used to debug refinery response
app.get('/header-data', (req, res) => {
  let options = {
    endpoint: '/api/nypl/ndo/v0.1/site-data/header-items',
    includes: [
      'children',
      'related-mega-menu-panes.current-mega-menu-item.related-content',
      'related-mega-menu-panes.current-mega-menu-item.images'],
    filters: {
      'relationships': {'parent': 'null'}
    }
  };
 
  parser
    .setHost({
      api_root: 'dev.refinery.aws.nypl.org',
      api_version: 'v0.1'
    })
    .setChildrenObjects(options)
    .get(options, function (data) {
      res.json(parser.parse(data));
    });
});

// Match all routes to render the index page.
app.get('/*', (req, res) => {

  let options = {
    endpoint: '/api/nypl/ndo/v0.1/site-data/header-items',
    includes: [
      'children',
      'related-mega-menu-panes.current-mega-menu-item.related-content',
      'related-mega-menu-panes.current-mega-menu-item.images'],
    filters: {
      'relationships': {'parent': 'null'}
    }
  };
 
  // ASYNC REQUEST!
  parser
    .setHost({
      api_root: 'dev.refinery.aws.nypl.org',
      api_version: 'v0.1'
    })
    .setChildrenObjects(options)
    .get(options, function (data) {
      res.locals.data = {
        Store: { headerData: parser.parse(data) }
      };

      alt.bootstrap(JSON.stringify(res.locals.data || {}));
      let headerApp = React.renderToString(React.createElement(Header));
      let iso = new Iso();
      iso.add(headerApp, alt.flush());

      // First parameter references the ejs filename
      res.render('index', {
        // Assign the Header String to the
        // proper EJS variable
        headerApp: iso.render(),
        appTitle: appConfig.appTitle,
        favicon: appConfig.favIconPath,
        isProduction: isProduction,
        webpackPort: WEBPACK_DEV_PORT
      });
    });

});

// Start the server.
app.listen(serverPort, (err, result) => {
  if (err) {
    console.log(colors.red(err));
  }
  console.log(colors.yellow.underline(appConfig.appName));
  console.log(colors.green('Express server is listening at'), colors.cyan('localhost:' + serverPort));
});


/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
*/
if (!isProduction) {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: false,
    historyApiFallback: true
  }).listen(WEBPACK_DEV_PORT, 'localhost', (err, result) => {
    if (err) {
      console.log(colors.red(err));
    }
    console.log(colors.magenta('Webpack Dev Server listening at'), colors.cyan('localhost' + WEBPACK_DEV_PORT));
  });
}