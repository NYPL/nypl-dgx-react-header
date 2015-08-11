import React from 'react';
import Iso from 'iso';
import alt from '../app/alt.js';
import Header from '../app/components/Header/Header.jsx';

import './styles/main.scss';

if (typeof window !== 'undefined') {
	window.onload = () => {
	  Iso.bootstrap(function (state, meta, container) {
	    alt.bootstrap(state);
	    React.render(React.createElement(Header), container);
	  });
	}
}
