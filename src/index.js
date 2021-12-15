import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Searchresults from './pages/searchresults';
import Domaindetails from './pages/domaindetails';

import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter,Routes,Route} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/searchresults" element={<Searchresults />} />
          <Route path="/domaindetails" element={<Domaindetails />} />
        </Routes>
      </BrowserRouter>

    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
