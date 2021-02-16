import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`

:root {
  --black: #000000;
  --white: #ffffff;
  --greyLight: #eeeeee;
  --greyMedium: #e0e0e0;
  --greyMedium2: #d1d1d1;
  --greyDark: #767676;
}

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
  body {
   width:100%;
   background-color: white;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>

    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
