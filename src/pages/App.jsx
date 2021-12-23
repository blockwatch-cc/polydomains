import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Home';
import Search from './Search';
import Details from './Details';

import { WalletContext } from "../context/wallet"

function App() {
  const [app, setApp] = useState({
    network: 'mainnet'
  })

  return (
    <WalletContext.Provider value={{ app, setApp }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/details/:name" element={<Details />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </WalletContext.Provider>
  );
}

export default App;
