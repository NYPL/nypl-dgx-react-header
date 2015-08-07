import React from 'react';

let MegaMenuFeatureItem = React.createClass({
    render: function () {
	let img = '';
	if (this.props.feature.image) {
	    img = <img src={this.props.feature.image} />
	}
	
	return (
	    <a href={this.props.feature.link} className='MegaMenu-FeatureItem'>
		    <div className="FeatureItem-Image">
		    	{img}
		    </div>
		    <div className="FeatureItem-Content">
	        <div className='FeatureItem-Content-Tag'>{this.props.feature.tag}</div>
	        <h3 className='FeatureItem-Content-Title'>{this.props.feature.title}</h3>
	        <div className='FeatureItem-Content-Desc'>{this.props.feature.desc}</div>
		    </div>
      </a>
    );
  }
});

module.exports = MegaMenuFeatureItem;