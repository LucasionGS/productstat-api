import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import Router, { PageBuild } from './components/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const pages: PageBuild[] = [
  {
    path: /^\//,
    title: "Home",
    content: <Home />
  }
];

root.render(
  <React.StrictMode>
    <Router pages={pages} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
