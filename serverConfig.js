import path from 'path';
import compression from 'compression';
import express from 'express';
import colors from 'colors';
import parser from 'jsonapi-parserinator';

// React
import React from 'react';
import Iso from 'iso';
import alt from 'dgx-alt-center';

// Server Configurations
import appConfig from './appConfig.js';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

// Header Component
import Header from 'dgx-header-component';

// Global Config Variables
const ROOT_PATH = __dirname;
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const API_URL = process.env.API_URL || appConfig.apiUrl;
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;

// Boolean flag that determines if we are running
// our application in Production Mode.
// Assigning as let variables, since they are mutable
let isProduction = process.env.NODE_ENV === 'production',
  serverPort = process.env.PORT || (isProduction ? 3001 : appConfig.port),
  // Assign API Routes
  apiRoutes = require('./src/server/ApiRoutes/ApiRoutes.js'),
  /* Express Server Configuration
   * ----------------------------
   * - Using .EJS as the view engine
  */
  app = express();

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
 * 1. Bootstrap the FLUX Store with API Data
 * 2. Use ISO to add the <Header> component with
 *    proper data
 * 3. Render the <Header> as a string in the EJS template
*/
app.use('/', apiRoutes);

// Match all routes to render the index page.
app.get('/', (req, res) => {
  let headerApp, iso;

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  iso = new Iso();

  headerApp = React.renderToString(React.createElement(Header));
  iso.add(headerApp, alt.flush());

  // First parameter references the ejs filename
  res.render('index', {
    // Assign the Header String to the
    // proper EJS variable
    headerApp: iso.render(),
    appTitle: appConfig.appTitle,
    favicon: appConfig.favIconPath,
    isProduction: isProduction,
    webpackPort: WEBPACK_DEV_PORT,
    filename: webpackConfig.output.filename,
    nodeEnv: process.env.NODE_ENV,
    appEnv: process.env.APP_ENV,
    apiUrl: res.locals.data.completeApiUrl
  });

});

/* Setup the isolated header route
 * to serve only the Header DOM with
 * a populated server-side Store.
*/
app.get('/header-markup', (req, res) => {
  let headerApp, iso;

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  iso = new Iso();

  headerApp = React.renderToString(React.createElement(Header));
  iso.add(headerApp, alt.flush());

  res.render('isolatedHeader', {
    headerApp: iso.render()
  });
});

// Start the server.
let server = app.listen(serverPort, (err, result) => {
  if (err) {
    console.log(colors.red(err));
  }
  console.log(colors.yellow.underline(appConfig.appName));
  console.log(colors.green('Express server is listening at'), colors.cyan('localhost:' + serverPort));
});

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
let gracefulShutdown = function() {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(function() {
    console.log("Closed out remaining connections.");
    process.exit(0);
  }); 
  // if after 
  setTimeout(function() {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit()
  }, 10*1000);
}
// listen for TERM signal .e.g. kill 
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
*/
if (!isProduction) {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: false,
    inline: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(WEBPACK_DEV_PORT, 'localhost', (err, result) => {
    if (err) {
      console.log(colors.red(err));
    }
    console.log(colors.magenta('Webpack Dev Server listening at'), colors.cyan('localhost' + WEBPACK_DEV_PORT));
  });
}
