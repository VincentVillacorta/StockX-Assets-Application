import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import fetch from 'node-fetch';

let testText;
fetch('http://localhost:3000/try?name=jordan')
  .then(res => res.json())
  .then((data) => {
    console.log(data)
  }).catch(console.log)

ReactDOM.render(
  <React.StrictMode>
    <h1>{testText}</h1>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
