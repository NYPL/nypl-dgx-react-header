# NYPL React Header App

React NYPL Header Web Application.

## Version
> 1.4.2

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
