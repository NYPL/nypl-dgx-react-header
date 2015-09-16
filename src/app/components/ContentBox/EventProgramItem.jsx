import React from 'react';
import cx from 'classnames';
import moment from 'moment';

class EventProgramItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let feature = this.props.feature,
      classes = this.props.classes;

    let startDate = moment(feature.dates.start),
      endDate = moment(feature.dates.end);

    // Not including end date yet...
    return (
      <a href={feature.link} className={this.props.className}>
        <div className={'FeatureItem-Image ' + classes}>
          {feature.img}
        </div>
        <div className={'FeatureItem-Content ' + classes}>
          <div className='FeatureItem-Content-Tag'>{feature.category}</div>
          <h3 className='FeatureItem-Content-Title'>{feature.title}</h3>
          <div className='FeatureItem-Content-Desc'>{feature.desc}</div>
          <p>{startDate.format('hA | YYYY')}</p>
          <p>{feature.location.fullName}</p>
        </div>
      </a>
    );
  }
}

EventProgramItem.defaultProps = {
  lang: 'en',
  className: 'EventProgramItem'
};

export default EventProgramItem;
