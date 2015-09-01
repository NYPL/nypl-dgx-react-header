import _ from 'underscore';

function ContentModel() {  
  // Function to get image object.
  this.image = data => {
    if (!data) {
      return;
    }

    let image = {};

    image.id = data.id;
    image.type = data.type;
    image.created = data.attributes['date-created'];
    image.uri = data.attributes.uri['full-uri'];

    return image;
  };

  // Function used to get any type of content - blog, events, node, etc.
  this.content = data => {
    if (!data) {
      return;
    }

    let content = {};

    content.id = data.id;
    content.type = data.type;

    content.uri = data.attributes.uri['full-uri'];

    if (data.type === 'blog') {
      // Clean up authors
      this.blog(content, data)
    }

    if (data.type === 'event-program') {
      this.events(content, data);
    }

    return content;
  };

  this.blog = (content, data) => {
    content.title = data.attributes.title;
    content.body = data.attributes.body;

    content.authors = _.map(data.authors, this.authors);
  };

  this.authors = data => {
    let authors = {};

    authors.id = data.id;
    authors.type = data.type;
    authors.displayName = data.attributes['display-name'];
    authors.email = data.attributes.email;
    authors.fullName = data.attributes['full-name'];
    authors.firstName = data.attributes['first-name'];
    authors.lastName = data.attributes['last-name'];
    authors.location = data.attributes.location;

    return authors;
  };

  this.events = (content, data) => {
    content.dates = {
      start: data.attributes['start-date'],
      end: data.attributes['start-end'],
    };
    content.name = data.attributes.name;
    content.description = data.attributes.description;
    content.spaceName = data.attributes['space-name'];

    content.location = this.location(data.location);
  };

  this.location = data => {
    let location = {};

    location.type = data.type;
    location.id = data.id;
    location.fullName = data.attributes['full-name'];
    location.symbol = data.attributes.symbol;
    location.slug = data.attributes.slug;

    return location;
  };
}

export default new ContentModel();
