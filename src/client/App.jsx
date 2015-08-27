import React from 'react';
import Iso from 'iso';
import alt from '../app/alt.js';
import Header from '../app/components/Header/Header.jsx';

import './styles/main.scss';

if (typeof window !== 'undefined') {

	let isRenderedByServer = false;

	window.onload = () => {
		// Render Isomorphically
	  Iso.bootstrap(function (state, meta, container) {
	  	console.log('Application rendered Isomorphically.');
	    alt.bootstrap(state);
	    React.render(React.createElement(Header), container);
	    isRenderedByServer = true;
	  });

	  // Render Client Side Only, attached to ID
	  if (!isRenderedByServer) {
	  	// Wrap in closure
	  	(function (global, doc) {
		  	let scriptTags, styleTag, htmlElement, nyplHeaderObject, i;

	  		// create element to hold the single header instance.
	  		htmlElement = doc.createElement('div');
	  		htmlElement.id = 'nypl-dgx-header';

		  	// Make a global object to store the instances of nyplHeader
		  	if(!global.nyplHeader) { global.nyplHeader = {}; };
		  	// Short-name reference to global.nyplHeader
		  	nyplHeaderObject = global.nyplHeader;

		  	// Let's keep track of the processed scripts within nyplHeader
		  	if(!nyplHeaderObject.processedScripts) { nyplHeaderObject.processedScripts = []; };

		  	// Let's keep track of the processed style tags within nyplHeader
		  	if(!nyplHeaderObject.styleTags) { nyplHeaderObject.styleTags = []; };

		  	// Only create the nyplHeader if the global.nyplHeaderObject is empty
		  	if (nyplHeaderObject.styleTags.length === 0 && nyplHeaderObject.processedScripts.length === 0) {

		  		// create the single styletag reference.
			  	styleTag = doc.createElement('link');
			  	styleTag.rel = 'stylesheet';
		      styleTag.type = 'text/css';
		      styleTag.href = 'http://dev.header.aws.nypl.org/styles.css';
		      styleTag.media = "all";

		      // attach the React component first before adding the style tag
		      React.render(React.createElement(Header), htmlElement);

		      // append the style-tag to the element holding the nypl-header
		      htmlElement.appendChild(styleTag);

		      // insert the markup right before the script tag
		      scriptTags = doc.getElementsByTagName('script');
		      for (i=0; i < scriptTags.length; i++) {
		      	if (scriptTags[i].src.indexOf('bundle.js') !== -1) {
		      		scriptTags[i].parentNode.insertBefore(htmlElement, scriptTags[i]);
		      	}
		      }

		      // update the global nyplHeaderObject
		      nyplHeaderObject.styleTags.push(styleTag);
		      nyplHeaderObject.processedScripts.push(scriptTag);
		  	}

		  	console.log('Application rendered via Client');
		  	//console.log(htmlElement);
	  	})(window, document);
	  }
	}
}
