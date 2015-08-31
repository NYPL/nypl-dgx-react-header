// Server Side Request Module
import axios from 'axios';
import config from '../../../appConfig.js';
import parser from 'jsonapi-parserinator';
import Model from './HeaderItemModel.js';

const fakeData = [];

const HeaderApiService = {
	fetchData(source, url) {
    // Set the options for the embedded properties that need to be added
    // for the relationships in JSONAPI specification.
    let options = {
        endpoint: '/api/nypl/ndo/v0.1/site-data/header-items',
        includes: [
          'children',
          'related-mega-menu-panes.current-mega-menu-item.related-content.authors',
          'related-mega-menu-panes.current-mega-menu-item.related-content.location',
          'related-mega-menu-panes.current-mega-menu-item.images'],
        filters: {
          'relationships': {'parent': 'null'}
        }
      };

    // Set the actual children relationships you want to create
    // for the embedded properties.
    parser.setChildrenObjects(options)

    // Need to correctly work on the Promise-like return.
    if (source === 'parser') {
      parser
        .setHost({
          api_root: 'dev.refinery.aws.nypl.org',
          api_version: 'v0.1'
        })
        .get(options, function (data) {
          return parser.parse(data);
        });
    }

		if (source === 'server') {
      // Pass in the full URL - this is okay since this will not really change.
      return axios
        .get('http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/site-data/' +
          'header-items?filter[relationships][parent]=null&include=' +
          'children,' +
          'related-mega-menu-panes.current-mega-menu-item.images,' +
          'related-mega-menu-panes.current-mega-menu-item.related-content.authors,' +
          'related-mega-menu-panes.current-mega-menu-item.related-content.location')
        .then(res => {
          let data = parser.parse(res.data);

          Model.build(data);

          return data;
        });
		}

		if (source === 'client') {

		}

		if (source === 'local') {
			return new Promise((resolve, reject) => {
				resolve(fakeData);
			});
		}
	}
};


export default HeaderApiService;


