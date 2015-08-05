import React from 'react';
import Header from '../app/components/Header/Header.jsx';

import './styles/main.scss';

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(<Header />, document.body);
  }
}