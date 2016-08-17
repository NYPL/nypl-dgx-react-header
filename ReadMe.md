# NYPL React Header

React NYPL Header Web Application.

### Version
1.3.1

### Node Configuration
Pass in the following environment variables:  

- `PORT`: Desired port where the server will reside (default: 3001).

- `APP_ENV`: Sets up Refinery URL `development`, `production` or `qa` (default: production).

- `NODE_ENV`: Sets up the app to be minified using `production`. Otherwise, it will default to development mode in Webpack.


### Installation
To install all npm dependencies, run:

```sh
$ npm install
```

### Development
Passing in no NODE_ENV, defaults to using the development config.
Passing in APP_ENV allows the API calls to the Refinery to be defined.

```sh
$ APP_ENV=(development/qa/production) npm start
```


### Production
To run the server in ***Production Mode***, use the following options:

```sh
$ npm run dist (builds the minified assets to /dist path)
```

```sh
$ APP_ENV=production NODE_ENV=production npm start  (starts the Node Server with proper environment)
```


License
----
