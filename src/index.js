import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Search from './pages/Search';
import Details from './pages/Details';
import Register from './pages/Register';

import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="/register/:name" element={<Register />} />
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
