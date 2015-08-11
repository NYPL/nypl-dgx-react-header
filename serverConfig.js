import path from 'path';
import compression from 'compression';
import express from 'express';
import request from 'request';
import parser from 'jsonapi-parserinator';
import React from 'react';
import Iso from 'iso';
import alt from './src/app/alt.js';
import HeaderApiService from './src/app/utils/ApiService';
import appConfig from './appConfig.js';

import Header from './src/app/components/Header/Header.jsx';

const ROOT_PATH = __dirname;
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const API_URL = process.env.API_URL || appConfig.apiUrl;

// Boolean flag that determines if we are running
// our application in Production Mode.
// Assigning as let variables, since they are mutable
let isProduction = process.env.NODE_ENV === 'production';
let serverPort = process.env.PORT || (isProduction ? 3001 : appConfig.port);
let refineryData;

// Use the HeaderApiService to fetch our Header Data
// We would parse the Data at this point and Model it
/*HeaderApiService
  .fetchData('server', API_URL)
  .then(function(result){
    refineryData = result.data;
  })
  .catch(function(error){
    console.log('Error on HeaderApiService.fetchData()', error);
  });*/

// Local Mock
HeaderApiService
  .fetchData('local')
  .then(function(result){
    refineryData = result;
  })
  .catch(function(error){
    console.log('Error on HeaderApiService.fetchData()', error);
  });

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
	res.json(refineryData);
});

// Match all routes to render the index page.
app.get('/*', (req, res) => {

  res.locals.data = {
    Store: { headerData: refineryData }
  };

  alt.bootstrap(JSON.stringify(res.locals.data || {}));

  let headerApp = React.renderToString(React.createElement(Header));

  let iso = new Iso();

  iso.add(headerApp, alt.flush());

	// First parameter references the ejs filename
  res.render('index', {
  	// Assign the Header String to the
  	// proper EJS variable
  	headerApp: iso.render()
  });
});

// Start the server.
app.listen(serverPort, () => {
  console.log('Express server is listening at localhost:%s', serverPort);
});


/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
*/
if (!isProduction) {

}