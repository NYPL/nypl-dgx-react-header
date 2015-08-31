import _ from 'underscore';

function Model() {

  this.build = (data) => {
    // console.log(data);

    if (!data) {
      return;
    }

    if (_.isArray(data) && data.length > 0) {
      return _.map(data, this.model);
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      return this.model(data);
    } else {
      return;
    }

  };

  this.model = (data) => {

  };

}



export default new Model();
