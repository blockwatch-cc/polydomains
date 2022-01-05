import { useState } from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
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
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/details/:name" element={<Details />} />
        </Routes>
      </HashRouter>
      <ToastContainer position="top-center" />
    </WalletContext.Provider>
  );
}

export default App;
