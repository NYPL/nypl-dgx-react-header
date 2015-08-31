import _ from 'underscore';

function Model() {

  this.build = (data) => {
    // console.log(data);

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

  this.headerItemModel = data => {
    let headerItem = {};
    
    // Top level header-item attributes
    headerItem.id = data.id;
    headerItem.type = data.type;
    headerItem.link = data.attributes.link;
    headerItem.name = data.attributes.name;
    headerItem.sort = data.attributes.sort;

    // Sub navigation header items:
    if (data.children) {
      headerItem.subnav = this.subnav(data.children);
    }

    if (data['related-mega-menu-panes']) {
      headerItem.features = this.features(data['related-mega-menu-panes']);
    }

    return headerItem;
  };

  this.subnav = children => {
    if (!children || !_.isArray(children)) {
      return;
    }

    return _.map(children, this.headerItemModel);
  };

  this.features = features => {
    if (!features || !_.isArray(features)) {
      return;
    }

    return _.map(features, this.createFeature);
  };

  this.createFeature = data => {
    if (!data) {
      return;
    }

    let feature = {};

    feature.id = data.id;
    feature.type = data.type;

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
      featuredItem.images = _.map(data.images, this.getImage);
    }

    if (data['related-content']) {
      featuredItem.content = this.getContent(data['related-content']);
    }

    return featuredItem;
  };


  this.getImage = data => {
    if (!data) {
      return;
    }

    let image = {};

    image.id = data.id;
    image.type = data.type;
    image.created = data.attributes['date-created'];
    image.uri = data.attributes.uri;

    return image;
  };

  this.getContent = data => {
    if (!data) {
      return;
    }

    let content = {};
    // console.log(data);

    content.id = data.id;
    content.type = data.type;

    // content.title = data.attributes.title;
    // content.body = data.attributes.body;
    content.uri = data.attributes.uri['full-uri'];

    if (data.type === 'blog') {
      // Clean up authors
      content.authors = data.authors;
    }

    if (data.type === 'event-program') {
      // Need to clean up location
      content.location = data.location;
    }

    return content;
  };

}



export default new Model();
