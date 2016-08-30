import path from 'path';
import compression from 'compression';
import express from 'express';
import colors from 'colors';
// React
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Iso from 'iso';
import alt from 'dgx-alt-center';
// Server Configurations
import appConfig from './appConfig.js';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
// Header Component
import { Header, navConfig } from 'dgx-header-component';
// Logging
import { getLogger, initMorgan } from 'dgx-loggly';

// Global Config Variables
const ROOT_PATH = __dirname;
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;
// Boolean flag that determines if we are running
// our application in Production Mode.
const isProduction = process.env.NODE_ENV === 'production';
const serverPort = process.env.PORT || (isProduction ? 3001 : appConfig.port);

// NOTE: As of 08/30/2016 the Header will no longer use an API for it's data
// All data will come from the imported navConfig file.
// const apiRoutes = require('./src/server/ApiRoutes/ApiRoutes.js');

/* Express Server Configuration
 * ----------------------------
 * - Using .EJS as the view engine
*/
const app = express();
app.use(compression());

// Disables the Server response from
// displaying Express as the server engine
app.disable('x-powered-by');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the path where to find EJS files
app.set('views', INDEX_PATH);

// Assign the proper path where the application's dist files are located.
app.use(express.static(DIST_PATH));

// Set logger parameters
const logger = getLogger({
  env: process.env.APP_ENV,
  appTag: 'Header-App',
  token: process.env.LOGGLY_TOKEN,
  subdomain: process.env.LOGGLY_SUBDOMAIN,
});

// Have morgan here to stream reponse code above 400 to console and loggly
app.use(initMorgan(logger));

/* Isomporphic Rendering of React App
 * ----------------------------------
 * 1. Use ISO to add the <Header> component with
 *    proper data from navConfig JSON.
 * 2. Render the <Header> as a string in the EJS template
*/

// Match all routes to render the index page.
app.get('/', (req, res) => {
  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  const iso = new Iso();
  const headerApp = ReactDOMServer.renderToString(<Header navData={navConfig.upcoming} />);
  iso.add(headerApp, alt.flush());

  // First parameter references the ejs filename
  res.render('index', {
    headerApp: iso.render(),
    appTitle: appConfig.appTitle,
    favicon: appConfig.favIconPath,
    isProduction,
    webpackPort: WEBPACK_DEV_PORT,
    filename: webpackConfig.output.filename,
    nodeEnv: process.env.NODE_ENV,
    appEnv: process.env.APP_ENV,
  });
});

/* Setup the isolated header route
 * to serve only the Header DOM with
 * a populated server-side Store.
*/
app.get('/header-markup', (req, res) => {
  const urlType = req.query.urls || '';

  alt.bootstrap(JSON.stringify(res.locals.data || {}));

  const iso = new Iso();
  const headerApp = ReactDOMServer.renderToString(
    <Header urlType={(urlType === 'absolute') ? 'absolute' : ''} navData={navConfig.upcoming} />
  );

  iso.add(headerApp, alt.flush());

  res.render('isolatedHeader', {
    headerApp: iso.render(),
  });
});

// Start the server.
const server = app.listen(serverPort, (err, result) => {
  if (err) {
    logger.error(colors.red(err));
  }
  console.log(colors.yellow.underline(appConfig.appName));
  console.log(
    colors.green('Express Server is listening at'),
    colors.cyan(`localhost:${serverPort}`)
  );
});

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
const gracefulShutdown = () => {
  logger.info('Received kill signal, shutting down gracefully.');
  server.close(() => {
    logger.info('Closed out remaining connections.');
    process.exit(0);
  });
  // if after
  setTimeout(() => {
    logger.warn('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, 1000);
};
// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
*/
if (!isProduction) {
  const WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: false,
    inline: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With',
    },
  }).listen(WEBPACK_DEV_PORT, 'localhost', (err, result) => {
    if (err) {
      logger.error(colors.red(err));
    }

    console.log(
      colors.magenta('Webpack Development Server listening at'),
      colors.cyan(`localhost:${WEBPACK_DEV_PORT}`)
    );
  });
}
