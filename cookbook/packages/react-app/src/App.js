import React from "react";
import { Outlet } from "react-router-dom";

import { Header, Navbar } from "./components";
import { Footer } from "./containers";
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {

  return (
    <div>
      <Navbar>
        <ConnectButton label='Sign in' />
      </Navbar>
      <div>
        <Outlet />
      </div>
      <Header>
        <Footer />
      </Header>
    </div>
  );
}

export default App;