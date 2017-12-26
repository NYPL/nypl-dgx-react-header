// Polyfill Promise for legacy browsers
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Iso from 'iso';
import FeatureFlags from 'dgx-feature-flags';
import { config, gaUtils } from 'dgx-react-ga';
import alt from 'dgx-alt-center';
import { Header, navConfig } from '@nypl/dgx-header-component';
import './styles/main.scss';

(function renderApp(window, document) {
  if (typeof window !== 'undefined') {
    window.onload = () => {
      let isRenderedByServer = false;

      // Render Isomorphically
      Iso.bootstrap((state, meta, container) => {
        alt.bootstrap(state);
        ReactDOM.render(
          <Header navData={navConfig.current} />,
          container
        );
        isRenderedByServer = true;
        console.log('nypl-dgx-header rendered isomorphically.');
      });

      // Render Client Side Only
      if (!isRenderedByServer) {
        let urlType = '';
        let allScriptTags;
        let styleTag;
        let scriptTag;
        let appEnv;
        let skipNavElem;

        // create element to hold the single header instance.
        const htmlElement = document.createElement('div');
        htmlElement.id = 'nypl-dgx-header';

        // Make a global object to store the instances of nyplHeader
        if (!window.nyplHeader) {
          window.nyplHeader = {};
        }

        // Short-name reference to window.nyplHeader
        const nyplHeaderObject = window.nyplHeader;

        // Keep track of the processed scripts within nyplHeader
        if (!nyplHeaderObject.processedScripts) {
          nyplHeaderObject.processedScripts = [];
        }

        // Keep track of the processed style tags within nyplHeader
        if (!nyplHeaderObject.styleTags) {
          nyplHeaderObject.styleTags = [];
        }

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
          console.log(allScriptTags);
          /* Since getElementsBy is an array-like structure,
          * we need to use call to iterate with forEach.
          */
          [].forEach.call(allScriptTags, (value, index) => {
            if (value.src.indexOf('dgx-header.min.js') !== -1) {
              scriptTag = value;

              if (scriptTag.src.indexOf('dev-header.nypl.org') !== -1) {
                appEnv = 'development';
              } else if (scriptTag.src.indexOf('qa-header.nypl.org') !== -1) {
                appEnv = 'qa';
              } else {
                appEnv = 'production';
              }

              // Parse urls param from src string.
              if (scriptTag.src.indexOf('?urls=absolute') !== -1) {
                urlType = 'absolute';
              }

              // With the assumption that the skipNav query is the last option in the URL:
              const skipNavIndex = scriptTag.src.indexOf('skipNav');
              if (skipNavIndex !== -1) {
                // Plus 8 since the query is in the form of `skipNav=[id-of-element]`
                // and we want everything after that since we do not know
                // how long the id will be.
                skipNavElem = {
                  target: scriptTag.src.substr(skipNavIndex + 8),
                };
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
            styleTag.media = 'all';

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
        if (nyplHeaderObject.processedScripts.length === 1 &&
          nyplHeaderObject.styleTags.length === 1 &&
          htmlElement && appEnv) {
          setTimeout(() => {
            ReactDOM.render(
              <Header urlType={urlType} navData={navConfig.current} skipNav={skipNavElem} />,
              htmlElement
            );
            console.log('nypl-dgx-header rendered via client');
          }, 250);
        }
      }

      if (!window.ga) {
        const isProd = process.env.NODE_ENV === 'production';
        const gaOpts = { debug: !isProd, titleCase: false };

        gaUtils.initialize(config.google.code(isProd), gaOpts);
      }

      // Used to activate/deactivate AB tests on global namespace.
      if (!window.dgxFeatureFlags) {
        window.dgxFeatureFlags = FeatureFlags.utils;
      }
    };
  }
}(window, document));
