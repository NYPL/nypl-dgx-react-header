# NYPL React Header

React Web App that renders the NYPL Header.

### Version
0.0.1

### Node Configuration
Pass in the following environment variables:  

* PORT={{portNumber}} // Desired port where the server will reside, defaults to ***3001***

*Ignore the curly braces, as it is only meant to help you see the assignments.*  

### Installation
To install all npm dependencies, run:
```sh
$ npm install
```

### Development
Work in progress...


### Production
To run the server in ***Production Mode***, use the following options:

1) Run in a two part command that includes the ability to set the NODE ENV variables

```sh
$ npm run build  (builds the assets to /dist path)
```

```sh
$ NODE_ENV=production npm run start  (starts the Node Server with proper environment) 
```

2) Run in a single command
```sh
$ npm run start-prod  (builds minified assets, runs Node Server with default NODE_ENV=production)
```


License
----