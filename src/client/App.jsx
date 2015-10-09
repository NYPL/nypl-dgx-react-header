import React from 'react';
import Iso from 'iso';
import alt from '../app/alt.js';
import Actions from '../app/actions/Actions.js';
import Header from '../app/components/Header/Header.jsx';
import ga from 'react-ga';

import './styles/main.scss';

if (typeof window !== 'undefined') {
	"use strict";

	window.onload = () => {

			let isRenderedByServer = false;

			// Render Isomorphically
		  Iso.bootstrap(function (state, meta, container) {
		  	console.log('Application rendered Isomorphically.');
		    alt.bootstrap(state);
		    React.render(React.createElement(Header), container);
		    isRenderedByServer = true;
		  });

		  // Render Client Side Only
		  if (!isRenderedByServer) {

		  	let allScriptTags, scriptTag, htmlElement, nyplHeaderObject, appEnv;

	  		// create element to hold the single header instance.
	  		htmlElement = document.createElement('div');
	  		htmlElement.id = 'nypl-dgx-header';

		  	// Make a global object to store the instances of nyplHeader
		  	if (!window.nyplHeader) { 
		  		window.nyplHeader = {};
		  	};

		  	// Short-name reference to window.nyplHeader
		  	nyplHeaderObject = window.nyplHeader;

		  	// Let's keep track of the processed scripts within nyplHeader
		  	if (!nyplHeaderObject.processedScripts) {
		  		nyplHeaderObject.processedScripts = []; 
		  	};

		  	// Only create the nyplHeader if the global.nyplHeaderObject.scripts is empty
		  	if (nyplHeaderObject.processedScripts.length === 0) {

		      /*
		       * Loop through all <script> tags in the DOM.
		       * Find the match which contains 'dgx-header.min.js'.
		       * Insert the markup holding the NYPL Header
		       * right before the <script> tag matched.
		       */
		      allScriptTags = document.getElementsByTagName('script');

		      /* Since getElementsBy is an array-like structure,
		     	 * we need to use call to iterate with forEach.
		     	 */
		      [].forEach.call(allScriptTags, function(value, index) {
		      	if (value.src.indexOf('dgx-header.min.js') !== -1) {
		      		scriptTag = value;

		      		if (scriptTag.src.indexOf('dev-header.nypl.org') !== -1) {
		      			appEnv = 'development';
		      		} else if (scriptTag.src.indexOf('qa-header.nypl.org') !== -1) {
		      			appEnv = 'qa';
		      		} else {
		      			appEnv = 'production';
		      		}

		      		scriptTag.parentNode.insertBefore(htmlElement, scriptTag);
		      		nyplHeaderObject.processedScripts.push(scriptTag);
		      	}
		      });


			  	// Now we ensure that only ONE <script> tag has been created
			  	// before allowing React to Render the Header.
			  	if (nyplHeaderObject.processedScripts.length === 1 && htmlElement) {

		  			// Fetch the data first before Render
		  			// This allows us to populate the Store so that
		  			// the <Header /> component renders with data already
		  			// loaded. There is a fallback method in the <Header />
		  			// component that checks the Store data then fetches.
		  			//Actions.fetchHeaderData();

			  		setTimeout(() => {
			  			// Once rendered, React should populate the state
			  			// based off the Store.
			      	React.render(React.createElement(Header), htmlElement);

			      	console.log('nypl-dgx-header rendered via client');
			  		}, 250);
			  	}
		  	}
		  }
	}
}
