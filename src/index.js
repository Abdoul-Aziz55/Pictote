import React from 'react';
import {render} from 'react-dom';
import App from './App';
import "./styles/index.scss"

// ici on rend notre application react sur le DOM

render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);