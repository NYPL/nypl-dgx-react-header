# NYPL React Header App

React NYPL Header Web Application.

## Version
> 1.3.9

## Change Log

### v1.3.9
> Updated the Header Component to v1.5.5. The updates include integrating the log in related functions with login server, removing console loggings for patron token expiration, and turning off the feature flag of OAuth Login and set it as default.

### v1.3.8
> Updated the Header Component to v1.5.1. The update includes HTTPS fix and the JavaScript fallback for the log in button on the Header Component.

### v1.3.7
- Added Optimizely script in the index.ejs file.

#### v1.3.5
> Using NPM version of Header with updated donation url's

#### v1.3.4 and below
> As of **08/2016** the Header App relies on a navConfig JSON file contained within the
Header component which populates the Header navigation links.

> ***No Ajax calls are executed by the Header App.***

## Node Configuration
Pass in the following environment variables:  

- `PORT`: Desired port where the server will reside (default: 3001).

- `NODE_ENV`: Sets up the app to be minified using `production`. Otherwise, it will default to development mode in Webpack.


## Installation
To install all npm dependencies, run:

```sh
$ npm install
```

## Development
Passing in no NODE_ENV, defaults to using development mode.

```sh
$ npm start
```


## Production
To run the server in ***Production Mode***, use the following options:

```sh
$ npm run dist (builds the minified assets to /dist path)
```

```sh
$ NODE_ENV=production npm start  (starts the Node Server with proper environment)
```

License
----
