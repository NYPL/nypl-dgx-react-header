import express from 'express';
import axios from 'axios';
import request from 'superagent';
import parser from 'jsonapi-parserinator';
import Model from '../src/app/utils/HeaderItemModel.js';

let router = express.Router();

let options = {
  endpoint: 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/site-data/' +
    'header-items?filter\[relationships\]\[parent\]=null&include=' +
    'children,' +
    'related-mega-menu-panes.current-mega-menu-item.images,' +
    'related-mega-menu-panes.current-mega-menu-item.related-content.authors.nypl-location,' +
    'related-mega-menu-panes.current-mega-menu-item.related-content.location',
  includes: [
    'children',
    'related-mega-menu-panes.current-mega-menu-item.images',
    'related-mega-menu-panes.current-mega-menu-item.related-content.authors.nypl-location',
    'related-mega-menu-panes.current-mega-menu-item.related-content.location'],
  filters: {
    'relationships': {'parent': 'null'}
  }
};

// Set the actual children relationships you want to create
// for the embedded properties.
parser.setChildrenObjects(options)

router
  .route('/')
  .get((req, res, next) => {
    request
      .get(options.endpoint)
      .end((error, data) => {
        if (error) {
          console.log('error calling API : ' + error);
          console.log('Attempted to call : ' + options.endpoint);
        }

        let parsed = parser.parse(data.body),
          modelData = Model.build(parsed);

        res.locals.data = {
          Store: {
            headerData: modelData
          }
        };
        next();
      }); /* end request call */
  });

router
  .route('/header-data')
  .get((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    request
      .get(options.endpoint)
      .end((error, data) => {
        if (error) {
          console.log('error calling API');
          res.json({'error': 'error calling API'});
        }

        let parsed = parser.parse(data.body),
          modelData = Model.build(parsed);

        res.json(modelData);
      }); /* end request call */
  });

export default router;
