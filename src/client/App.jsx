import React from 'react';
import Iso from 'iso';
import alt from '../app/alt.js';
import Actions from '../app/actions/Actions.js';
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

	  // Render Client Side Only
	  if (!isRenderedByServer) {
	  	// Wrap in closure
	  	(function (global, doc) {
		  	let styleTag, allScriptTags, scriptTag, htmlElement, nyplHeaderObject, i;

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

		  	// Only create the nyplHeader if the global.nyplHeaderObject.scripts is empty
		  	if (nyplHeaderObject.processedScripts.length === 0) {

		      /*
		       * Loop through all <script> tags in the DOM.
		       * Find the match which contains 'bundle.js'.
		       * Insert the markup holding the NYPL Header
		       * right before the <script> tag matched.
		       */
		      allScriptTags = doc.getElementsByTagName('script');
		      for (i=0; i < allScriptTags.length; i++) {
		      	// TODO: Make a better comparison (source host)
		      	if (allScriptTags[i].src.indexOf('bundle.js') !== -1) {
		      		scriptTag = allScriptTags[i];
		      		scriptTag.parentNode.insertBefore(htmlElement, scriptTag);
		      		nyplHeaderObject.processedScripts.push(scriptTag);
		      	}
		      }

		      /*
		       * Only create one instance of the <style> tag for the Header.
		       * Append the <head> element with the new <style> tag
		       * Add the newly created tag to the nyplHeaderObject for tracking
		       */
		      if (nyplHeaderObject.styleTags.length === 0) {
				  	styleTag = document.createElement('link');
				  	styleTag.rel = 'stylesheet';
				    styleTag.type = 'text/css';
				    styleTag.href = 'http://dev.header.aws.nypl.org/styles.css';
				    styleTag.media = "all";

		  			doc.getElementsByTagName('head')[0].appendChild(styleTag);
				    nyplHeaderObject.styleTags.push(styleTag);
		      }
		  	}

		  	// Now we ensure that only ONE <script> tag and ONE <style> tag have been created
		  	// before allowing React to Render the Header.
		  	if (nyplHeaderObject.processedScripts.length === 1 && nyplHeaderObject.styleTags.length === 1) {

	  			// Fetch the data first before Render
	  			Actions.fetchHeaderData();

		  		setTimeout(() => {
		  			// Once rendered, React should populate the state
		  			// based off the Store.
		      	React.render(React.createElement(Header), htmlElement);

		      	console.log('Application rendered via Client');
		  		}, 1000);
		  	}
	  	})(window, document);
	  }
	}
}
