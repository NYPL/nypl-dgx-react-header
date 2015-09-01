import _ from 'underscore';
import ContentModel from './ContentModel.js';

function Model() {

  // Build an array of header item models or a single one
  this.build = (data) => {
    if (!data) {
      return;
    }

    if (_.isArray(data) && data.length > 0) {
      return _.map(data, this.headerItemModel);
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      return this.headerItemModel(data);
    } else {
      return;
    }
  };

  // The main modeling function
  this.headerItemModel = data => {
    let headerItem = {};
    
    // Top level header-item attributes
    headerItem.id = data.id;
    headerItem.type = data.type;
    headerItem.link = data.attributes.link;
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
    if (!data || !_.isArray(data)) {
      return;
    }

    return _.map(data, fn);
  };

  // Create the featured slot in the mega menu
  this.feature = data => {
    if (!data) {
      return;
    }

    let feature = {};

    feature.id = data.id;
    feature.type = data.type;

    // A featured slot may not have a featured item, but it should. Just in case:
    if (data['current-mega-menu-item']) {
      feature.featuredItem = this.createFeatureItem(data['current-mega-menu-item']);
    }

    return feature;
  };

  this.createFeatureItem = data => {
    if (!data) {
      return;
    }

    let featuredItem = {};

    featuredItem.id = data.id;
    featuredItem.type = data.type;
    featuredItem.category = data.attributes.category;
    featuredItem.link = data.attributes.link;
    featuredItem.description = data.attributes.description;
    featuredItem.headline = data.attributes.headline;
    featuredItem.dates = {
      start: data.attributes['display-date-start'],
      end: data.attributes['display-date-end'],
    };

    if (data.images) {
      featuredItem.images = _.map(data.images, ContentModel.image);
    }

    if (data['related-content']) {
      featuredItem.content = ContentModel.content(data['related-content']);
    }

    return featuredItem;
  };
}



export default new Model();
