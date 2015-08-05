import path from 'path';
import express from 'express';
import React from 'react';
import Header from '../app/components/Header/Header.jsx';
// Used to setup Development Environment
//import WebpackConfig from '../../webpack.config.js';

const DIST_PATH = path.resolve(__dirname, '../../dist');
const INDEX_PATH = path.resolve(__dirname, '../client/');

// Boolean flag that determines if we are running
// our application in Production Mode.
// Assigning as let variables, since they are mutable
let isProduction = process.env.NODE_ENV === 'production';
let serverPort = process.env.PORT || (isProduction ? 3001 : 3001);

/* Isomporphic Rendering of React App
 * ----------------------------------
 * 1. Render the App as a String to be passed
 *    to the server.
 * 2. Ideally we would pass in the API Data here
 *    to our component.
*/
// Assign the string containing the markup from the component
let headerApp = React.renderToString(<Header/>);


/* Express Server Configuration
 * ----------------------------
 * - Using .EJS as the view engine
*/
let app = express();

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

// Match all routes to render the index page.
app.get('/*', (req, res) => {
	// First parameter references the ejs filename
  res.render('index', {
  	// Assign the Header String to the
  	// proper EJS variable
  	headerApp: headerApp
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