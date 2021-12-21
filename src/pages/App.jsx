import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './Home';
import Search from './Search';
import Details from './Details';
import Register from './Register';


import { WalletContext } from "../context/wallet"

function App() {
  const [account, setAccount] = useState(null)

  return (
    <WalletContext.Provider value={{ account, setAccount }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="/register/:name" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </WalletContext.Provider>
  );
}

export default App;
