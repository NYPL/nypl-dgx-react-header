import {
  isObject as _isObject,
  isArray as _isArray,
  isEmpty as _isEmpty,
  each as _each,
  map as _map
} from 'underscore';
import ContentModel from './ContentModel.js';

function Model() {

  this.setModelSettings = (opts = {}) => {
    this.urlsAbsolute = opts.urlsAbsolute || false;
  };

  // Build an array of header item models or a single one
  this.build = (data, opts = {}) => {
    if (!data) {
      return;
    }

    this.setModelSettings(opts);

    if (_isArray(data) && data.length > 0) {
      return _map(data, this.headerItemModel);
    } else if (_isObject(data) && !_isEmpty(data)) {
      return this.headerItemModel(data);
    } else {
      return;
    }
  };

  // The main modeling function
  this.headerItemModel = (data) => {
    let headerItem = {};

    // Top level header-item attributes
    headerItem.id = data.id;
    headerItem.type = data.type;
    headerItem.link = this.urlsAbsolute ?
      data.attributes.link : this.validateUrlObjWithKey(data.attributes.link, 'text');
    headerItem.name = data.attributes.name;
    headerItem.sort = data.attributes.sort;

    // Sub navigation header items
    if (data.children) {
      // The subnavigation is made up of header items as well
      headerItem.subnav = this.mapArrayData(data.children, this.headerItemModel);
    }

    // The features if they are available
    if (data['related-mega-menu-panes']) {
      headerItem.features = this.mapArrayData(data['related-mega-menu-panes'], this.feature);
    }

    return headerItem;
  };

  // Map a data set to a function.
  this.mapArrayData = (data, fn) => {
    if (!data || !_isArray(data)) {
      return;
    }

    return _map(data, fn);
  };

  // Create the featured slot in the mega menu
  this.feature = data => {
    if (!data) {
      return;
    }

    let feature = {},
      featuredItem = data['current-mega-menu-item'] ?
        data['current-mega-menu-item'] :
        data['default-mega-menu-item'];

    feature.id = data.id;
    feature.type = data.type;

    feature.featuredItem = this.createFeatureItem(featuredItem);

    return feature;
  };

  this.createFeatureItem = (data) => {
    if (!data) {
      return;
    }

    let featuredItem = {};

    featuredItem.id = data.id;
    featuredItem.type = data.type;
    featuredItem.category = data.attributes.category;
    featuredItem.link = this.urlsAbsolute ?
      data.attributes.link : this.validateUrlObjWithKey(data.attributes.link, 'text');
    featuredItem.description = data.attributes.description;
    featuredItem.headline = data.attributes.headline;
    featuredItem.dates = {
      start: data.attributes['display-date-start'],
      end: data.attributes['display-date-end'],
    };

    if (data.images) {
      featuredItem.images = _map(data.images, ContentModel.image);
    }

    return featuredItem;
  };

  this.validateUrlObjWithKey = (obj, key) => {
    if (_isObject(obj) && !_isEmpty(obj)) {
      _each(obj, (v, k) => {
        if (k === key && typeof v === 'string') {
          obj[k] = this.convertUrlRelative(v);
        } else {
          this.validateUrlObjWithKey(v, key);
        }
      });
    }

    return obj;
  };

  this.convertUrlRelative = (url) => {
    // Validate existence and type
    if (!url || typeof url !== 'string') {
      return '#';
    }

    const regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i);

    // Test regex matching pattern
    return (regex.test(url)) ? url.replace(regex, "") : url;
  };
}



export default new Model();
