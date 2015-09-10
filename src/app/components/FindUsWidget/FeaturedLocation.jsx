import React from 'react';
import cx from 'classnames';

class FeaturedLocation extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    let img = (this.props.image) ? <img src={this.props.image} /> : '',
      classes = cx({'with-image': this.props.image, 'without-image': !this.props.image});

    return (
      <div className={this.props.className}>
        <div className={this.props.className +'-Image FeatureItem-Image ' + classes}>
          {img}
        </div>
        <div className={this.props.className +'-Content ' + classes}>
          <div className={this.props.className +'-Content-Tag'}>{this.props.category}</div>
          <h3 className={this.props.className +'-Content-Title'}>{this.props.title}</h3>
          <div className={this.props.className +'-Content-Desc'}>{this.props.desc}</div>
        </div>
      </div>
    );
  }
}

FeaturedLocation.defaultProps = {
  lang: 'en',
  className: 'FeaturedLocation'
};

export default FeaturedLocation;