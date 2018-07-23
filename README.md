# NYPL React Header App

React NYPL Header Web Application.

## Version
> v1.4.13

| Branch         | Status|  
|:---------------|:---------------------------------------------------------------------------------------------------------------------------|  
| `master`   | [![Build Status](https://travis-ci.org/NYPL/nypl-dgx-react-header.svg?branch=master)](https://travis-ci.org/NYPL/nypl-dgx-react-header) |  
| `qa`           | [![Build Status](https://travis-ci.org/NYPL/nypl-dgx-react-header.svg?branch=qa)](https://travis-ci.org/NYPL/nypl-dgx-react-header)   |  
| `development`  | [![Build Status](https://travis-ci.org/NYPL/nypl-dgx-react-header.svg?branch=development)](https://travis-ci.org/NYPL/nypl-dgx-react-header)       |

## Node Configuration
Pass in the following environment variables:  

- `PORT`: Desired port where the server will reside (default: 3001).

- `NODE_ENV`: Sets up the app to be minified using `production`. Otherwise, it will default to development mode in Webpack.

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
