import axios from 'axios';
import parser from 'jsonapi-parserinator';
import Model from '../src/app/utils/HeaderItemModel.js';

function clientAPI(app) {
  app.get('/header-data', (req, res) => {
    let options = {
      endpoint: 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/site-data/' +
        'header-items?filter[relationships][parent]=null&include=' +
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

    axios
      .get(options.endpoint)
      .then(data => {
        let parsed = parser.parse(data.data),
          modelData = Model.build(parsed);

        res.json(modelData);
      });
  });
}

export default clientAPI;
