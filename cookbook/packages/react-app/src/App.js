import React, { useEffect, useState, useRef } from "react";

import { Body, Button, HeaderStyle} from "./components";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { Footer, Blog, Possibility, Features, WhatCookbook, Header } from "./containers";
import { CTA, Navbar } from "./components";
import { a, useSpring } from 'react-spring'

import { Canvas } from "@react-three/fiber"

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  const [account, setAccount] = useState("");
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider) {
          return;
        }

        // Load the user's accounts.
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);

        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(accounts[0]);

        // Render either the ENS name or the shortened account address.
        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 6) + "..." + account.substring(36));
        }
      } catch (err) {
        setAccount("");
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
  }, [account, provider, setAccount, setRendered]);

  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}


function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  
  const [showRecipe, setShowRecipe] = useState(false);
  const [recipe, setRecipe] = useState({name: '', desc: '', ingredients: [], steps: [], myMeta: []});
  
  const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })
  const dropDown = useSpring({
    opacity: showRecipe ? 1 : 0,
    marginTop: showRecipe ? 0 : -500
  })
  
  const learnMoreRef = useRef(null);
  const learnMoreScroll = () => learnMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const recipeRef = useRef(null);
  const scrollToRecipe = () => {
    if (!recipeRef.current) return;
    recipeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <HeaderStyle>
        <Navbar />
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </HeaderStyle>
      <Body>
        <a.div style={fadeIn}>
        <Header learnMoreScroll={learnMoreScroll} />
        </a.div>
        <WhatCookbook learnMoreRef={learnMoreRef} />
        <Canvas>
          <Features setShowRecipe={setShowRecipe} setRecipe={setRecipe} scrollToRecipe={scrollToRecipe} />
        </Canvas>
        {showRecipe && <a.div style={dropDown} ref={recipeRef}>
          <Possibility recipe={recipe} />
        </a.div>}
        <CTA />
        <Blog />
        <Footer />
      </Body>
    </div>
  );
}

export default App;