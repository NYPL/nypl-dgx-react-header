# NYPL React Header App

React NYPL Header Web Application.

## Version
> v1.4.21

| Branch         | Status|  
|:---------------|:---------------------------------------------------------------------------------------------------------------------------|  
| `master`   | [![Build Status](https://travis-ci.org/NYPL/nypl-dgx-react-header.svg?branch=master)](https://travis-ci.org/NYPL/nypl-dgx-react-header) |  
| `qa`           | [![Build Status](https://travis-ci.org/NYPL/nypl-dgx-react-header.svg?branch=qa)](https://travis-ci.org/NYPL/nypl-dgx-react-header)   |  
| `development`  | [![Build Status](https://travis-ci.org/NYPL/nypl-dgx-react-header.svg?branch=development)](https://travis-ci.org/NYPL/nypl-dgx-react-header)       |

## Node Configuration
Pass in the following environment variables:  

- `PORT`: Desired port where the server will reside (default: 3001).

- `NODE_ENV`: Sets up the app to be minified using `production`. Otherwise, it will default to development mode in Webpack.

## Dynamic Embedded Header Usage
The Header is a standalone application that can potentially be picked up by many different applications. Currently, Locations, Staff Profiles, Research Divisions, Old Drupal, and New Drupal use the production build of this repo to import the Header into their application. There are differences in how the Header is pulled in and configurations for the nav links and skip navigation.

### Embeddable Script
Locations, Staff Profiles, and Research Divisions all pull in the Header through an embeddable standalone script tag that should be used in the `<body>` element of the main HTML file (or any other HTML files in the app). Since the Header loads dynamically, the script is surrounded by optional HTML markup and styles so that the top part of the page doesn't jump and cause a flash. It is suggested that the Header be imported as a whole with the following markup:

```HTML
<!-- Header -->
<div id="Header-Placeholder">
    <style>
        #Header-Placeholder {
            min-height: 70px;
        }
        @media screen and (min-width: 1024px) {
            #Header-Placeholder {
                min-height: 230px;
            }
        }
    </style>
    <script type="text/javascript" src="https://header.nypl.org/dgx-header.min.js?skipNav=main-content" async></script>
</div>
```

There are configurations that can be passed into the header script to enable/configure a few features.

* `urls` - The accepted values are `relative`/`absolute`, with `relative` as the default. This outputs the main navigation links as either relative to the app or absolute. For apps that will not live on an `nypl.org/...` path, it's best to pass `urls=absolute` into the configuration. Otherwise, the navigation will render links relative to the app which may not exist.
* `skipNav` - The id of the `<main>` element on the app where the Header is being imported. If this configuration is being enabled, make sure to also add a `tabindex` attribute of `-1` to the main element. This will allow the Header to programmatically focus on the main content.

```HTML
<main id="main-content" tabindex="-1">
  <!-- app goes here -->
</main>
```

### Drupal Import
We call this the Drupal import way of rendering the Header because it's the only site that imports the Header in this way. This app has a `/header-markup` endpoint that can be used to get _only_ the HTML markup for the header. Any app can use that markup as they wish, but it won't be interactive or styled unless they import the corresponding CSS and JS files as well.

* JS - https://header.nypl.org/dgx-header.min.js
* CSS - https://header.nypl.org/styles.css

*NOTE* - It is important to know that if you follow this approach, you are free to but responsible for importing all the files together and rendering them correctly along with your own app's production build.

## Installation
Install all NPM dependencies listed under `package.json`
```sh
$ npm install
```

## Running the Application
### Development Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

```sh
$ npm start // Starts localhost:3001
```

### Production Mode
To replicate the application in a production state. We execute 2 npm scripts with the proper `ENV` variables. By using `NODE_ENV=production`, we disable the hot-reload server. In addition, the `production` Webpack configuration by is set by running `npm run dist`.

* **Step 1**: Build the distribution assets into `./dist/`
```sh
$ npm run dist
```

* **Step 2**: Starts the Node/Express server in `localhost:3001`.
```sh
$ NODE_ENV=production npm start
```

## GIT Workflow
We follow a [feature-branch](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) workflow. If you need to introduce/update the application code, you `SHOULD`:

* Create a new branch off the `development` branch
* Send a PR pointing to the `development` branch upon completion
* Once the PR is approved, it should be merged into the `development` branch
* If there are several PR's in process, a release should be scheduled by merging all completed PR's into the `development` branch
* When a release is to be deployed, the `development` branch will be merged into `master`
* All releases merged into `master`, `MUST` be tagged and pushed to Github with their corresponding `version`

## AWS Elastic Beanstalk Application Settings
By using the `aws-cli`, developers can deploy the Header App to the desired AWS application environments listed below:

| AWS Profile | Application Name | Environment |
|---|---|---|
| `nypl-digital-dev` | `nypl-header-app` | **QA**: `nypl-header-qa` <br><br> **Production**: `nypl-header-production` |
| `nypl-sandbox` | `nypl-header-app` | **Development**: `nypl-header-development` |

> Note: All QA and Development servers should be configured with only 1 instance. Production servers are typically setup with auto-scaling supporting 2 or more instances.

## AWS Deployment

#### QA/Development
Developers `SHOULD` target the proper environment when deploying the application for review. Using their proper profile credentials, developers will execute the `eb deploy` command to deploy a new version of the application on AWS.

#### Production
In our AWS production environment, we have defined a CI/CD pipeline via Travis CI to automatically:
* Run the npm task to build the distribution assets as a safety prior to deployment
* Execute the `deploy` hook only for `production` for AWS Elastic Beanstalk to deploy the new updates merged into `master`. This occurs only if the `build` phase is successful
* Developers do not need to manually deploy the application unless an error occurred via Travis

## Header Component Development
This repository deploys an instance of the Header app which is used for multiple applications as both an embedded dynamic script and as a means to distribute static HTML markup to use for scrapping by other apps.

The main work for the NYPL Header is done in the component  [dgx-header-component](https://github.com/NYPL/dgx-header-component). If a change is done there and wants to be deployed to the `development` or `qa` instances of the Header app, then that change needs to be done in the `package.json` file.

There are changes we'd like to deploy that can't always be tested locally for a wider audience. For example, functional and design changes to the log in menu should be deployed for the QA team on the `development` or `qa` instance. A developer can test changes in the `dgx-header-component` locally by configuring their host settings to have `localhost:3001` point to `local.nypl.org:3001` to test the log in cookie and JSON Web Token (JWT) authentication. For a wider audience, we want to deploy this on `dev-header.nypl.org` for example, and then test on `dev-www.nypl.org` to be able to log in successfully. (To create an alias domain mapping, update `/etc/hosts` with where you want localhost `127.0.0.1` to point to, such as `local.nypl.org`).

In order to make changes and deploy them, update the reference to `@nypl/dgx-header-component` in `package.json` to point to the working branch in Github. For example, update:

```
"@nypl/dgx-header-component": "2.4.11",
```

to

```
"@nypl/dgx-header-component": "git+https://git@github.com/NYPL/dgx-header-component#name-of-feature-branch",
```

Make sure that `name-of-feature-branch` is pushed to Github and public in order for Travis and AWS to pick it up. This repo for the Header app should have it's own feature branch with this updated header component feature branch change. Then a developer can manually deploy to `development` or `qa` for testing.
