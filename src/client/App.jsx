import React from 'react';
import Iso from 'iso';
import alt from '../app/alt.js';
import Actions from '../app/actions/Actions.js';
import Header from '../app/components/Header/Header.jsx';
import ga from 'react-ga';

import './styles/main.scss';

(function (window, document) {
	if (typeof window !== 'undefined') {

		window.onload = () => {
			let isRenderedByServer = false;

			// Render Isomorphically
		  Iso.bootstrap(function (state, meta, container) {
		    alt.bootstrap(state);
		    React.render(React.createElement(Header), container);
		    isRenderedByServer = true;
		    console.log('nypl-dgx-header rendered isomorphically.');
		  });

		  // Render Client Side Only
		  if (!isRenderedByServer) {
		  	let allScriptTags, styleTag, scriptTag, htmlElement, nyplHeaderObject, appEnv;

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
		       * In addition, setup the proper client appEnv
		       * to fetch the modeled data endpoint.
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

		      /*
		       * Only create one instance of the <style> tag for the Header.
		       * Append the <head> element with the new <style> tag
		       * Add the newly created tag to the nyplHeaderObject for tracking
		       */
		      if (nyplHeaderObject.styleTags.length === 0) {
				  	styleTag = document.createElement('link');
				  	styleTag.rel = 'stylesheet';
				    styleTag.type = 'text/css';
				    styleTag.media = "all";

				    if (appEnv === 'development') {
				    	styleTag.href = '//dev-header.nypl.org/styles.css';
				    } else if (appEnv === 'qa') {
				    	styleTag.href = '//qa-header.nypl.org/styles.css';
				    } else {
				    	styleTag.href = '//header.nypl.org/styles.css';
				    }

		  			document.getElementsByTagName('head')[0].appendChild(styleTag);
				    nyplHeaderObject.styleTags.push(styleTag);
		      }
		    }

		  	// Now we ensure that only ONE <script> tag has been created
		  	// before allowing React to Render the Header.
		  	if (nyplHeaderObject.processedScripts.length === 1 
		  		&& nyplHeaderObject.styleTags.length === 1 && htmlElement && appEnv) {

	  			// Fetch the data first before Render
	  			// This allows us to populate the Store so that
	  			// the <Header /> component renders with data already
	  			// loaded. There is a fallback method in the <Header />
	  			// component that checks the Store data then fetches.
	  			// Set the clientAppEnv so that the <Header> knows what
	  			// /header-data url to fetch.
	  			Actions.setClientAppEnv(appEnv);
	  			
	  			setTimeout(() => {
	  				Actions.fetchHeaderData(appEnv);
	  			}, 1);

		  		setTimeout(() => {
		  			// Once rendered, React should populate the state
		  			// based off the Store.
		      	React.render(React.createElement(Header), htmlElement);

		      	console.log('nypl-dgx-header rendered via client');
		  		}, 250);
		  	}
		  }

		  if (!window.ga) {
				let gaOpts = { debug: true };
				ga.initialize('UA-1420324-122', gaOpts);
			}
		}
	}
})(window, document);
