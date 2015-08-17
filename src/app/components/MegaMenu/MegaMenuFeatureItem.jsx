import React from 'react';
import cx from 'classnames';

class MegaMenuFeatureItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
	render() {
		let img = (this.props.feature.image) ? <img src={this.props.feature.image} /> : '',
			classes = cx({'with-image': this.props.feature.image, 'without-image': !this.props.feature.image});

		return (
	    <a href={this.props.feature.link} className='MegaMenu-FeatureItem'>
		    <div className={'FeatureItem-Image '+classes}>
		    	{img}
		    </div>
		    <div className={'FeatureItem-Content '+classes}>
	        <div className='FeatureItem-Content-Tag'>{this.props.feature.tag}</div>
	        <h3 className='FeatureItem-Content-Title'>{this.props.feature.title}</h3>
	        <div className='FeatureItem-Content-Desc'>{this.props.feature.desc}</div>
		    </div>
      </a>
	  );
	}
}

export default MegaMenuFeatureItem;