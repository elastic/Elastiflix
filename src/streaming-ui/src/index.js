import React from 'react';
import ReactDOM from 'react-dom';
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import '@elastic/eui/dist/eui_theme_light.css';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
