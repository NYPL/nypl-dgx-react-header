# NYPL React Header

React NYPL Header Web Application.

### Version
1.0.0

### Node Configuration
Pass in the following environment variables:  

* PORT={{portNumber}} // Desired port where the server will reside, defaults to ***3001***
* APP_ENV={{environment}} // Sets up Refinery URL (development, production, qa)
* NODE_ENV={{environment}} // Sets up the app to be minified or to use webpack dev mode (production or leave empty)

*Ignore the curly braces, as it is only meant to help you see the assignments.*  

### Installation
To install all npm dependencies, run:
```sh
$ npm install
```

### Development
Passing in no NODE_ENV, defaults to using the development config.
Passing in APP_ENV allows the API calls to the Refinery to be defined.
```sh
$ APP_ENV=(development/qa/production) npm run start
```


### Production
To run the server in ***Production Mode***, use the following options:

```sh
$ npm run build  (builds the assets to /dist path)
```

```sh
$ APP_ENV=production NODE_ENV=production npm run start  (starts the Node Server with proper environment) 
```


License
----