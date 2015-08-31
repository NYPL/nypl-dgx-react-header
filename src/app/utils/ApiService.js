// Server Side Request Module
import axios from 'axios';
import config from '../../../appConfig.js';
import parser from 'jsonapi-parserinator';

const fakeData = [];

const HeaderApiService = {
	fetchData(source, url) {
    let options = {
        endpoint: '/api/nypl/ndo/v0.1/site-data/header-items',
        includes: [
          'children',
          'related-mega-menu-panes.current-mega-menu-item.related-content',
          'related-mega-menu-panes.current-mega-menu-item.images'],
        filters: {
          'relationships': {'parent': 'null'}
        }
      };

    parser.setChildrenObjects(options)

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
      return axios
        .get('http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/site-data/' +
          'header-items?filter[relationships][parent]=null&include=' +
          'children,related-mega-menu-panes.current-mega-menu-item.' +
          'related-content,related-mega-menu-panes.current-mega-menu-item.images')
        .then(res => parser.parse(res.data));
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


