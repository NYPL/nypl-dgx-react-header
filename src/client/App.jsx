import React from 'react';
import Iso from 'iso';
import alt from '../app/alt.js';
import Actions from '../app/actions/Actions.js';
import Header from '../app/components/Header/Header.jsx';

import ga from 'react-ga';

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
		  	if (!global.nyplHeader) { 
		  		global.nyplHeader = {}; 
		  	};

		  	// Short-name reference to global.nyplHeader
		  	nyplHeaderObject = global.nyplHeader;

		  	// Let's keep track of the processed scripts within nyplHeader
		  	if (!nyplHeaderObject.processedScripts) {
		  		nyplHeaderObject.processedScripts = []; 
		  	};

		  	// Let's keep track of the processed style tags within nyplHeader
		  	if (!nyplHeaderObject.styleTags) {
		  		nyplHeaderObject.styleTags = [];
		  	};

		  	// Only create the nyplHeader if the global.nyplHeaderObject.scripts is empty
		  	if (nyplHeaderObject.processedScripts.length === 0) {

		      /*
		       * Loop through all <script> tags in the DOM.
		       * Find the match which contains 'dgx-header.min.js'.
		       * Insert the markup holding the NYPL Header
		       * right before the <script> tag matched.
		       */
		      allScriptTags = doc.getElementsByTagName('script');

		      /* Since getElementsBy is an array-like structure,
		     	 * we need to use call to iterate with forEach.
		     	 */
		      [].forEach.call(allScriptTags, function(value, index) {
		      	if (value.src.indexOf('dgx-header.min.js') !== -1) {
		      		scriptTag = value;
		      		scriptTag.parentNode.insertBefore(htmlElement, scriptTag);
		      		nyplHeaderObject.processedScripts.push(scriptTag);
		      	}
		      });

		      /*
		       * Only create one instance of the <style> tag for the Header.
		       * Append the <head> element with the new <style> tag
		       * Add the newly created tag to the nyplHeaderObject for tracking
		       */
		      if (nyplHeaderObject.styleTags.length === 0) {
				  	styleTag = document.createElement('link');
				  	styleTag.rel = 'stylesheet';
				    styleTag.type = 'text/css';
				    styleTag.href = '//header.nypl.org/styles.css';
				    styleTag.media = "all";

		  			doc.getElementsByTagName('head')[0].appendChild(styleTag);
				    nyplHeaderObject.styleTags.push(styleTag);
		      }
		  	}

		  	// Now we ensure that only ONE <script> tag and ONE <style> tag have been created
		  	// before allowing React to Render the Header.
		  	if (nyplHeaderObject.processedScripts.length === 1 && nyplHeaderObject.styleTags.length === 1) {

	  			// Fetch the data first before Render
	  			// This allows us to populate the Store so that
	  			// the <Header /> component renders with data already
	  			// loaded. There is a fallback method in the <Header />
	  			// component that checks the Store data then fetches.
	  			Actions.fetchHeaderData();

		  		setTimeout(() => {
		  			// Once rendered, React should populate the state
		  			// based off the Store.
		      	React.render(React.createElement(Header), htmlElement);

		      	console.log('Application rendered via Client');
		  		}, 250);
		  	}
	  	})(window, document);
	  }

	  if (!window.ga) {
			console.log('Analytics not available - loading through React.');
			let gaOpts = { debug: true };
			ga.initialize('UA-1420324-122', gaOpts);
		}
	}
}
