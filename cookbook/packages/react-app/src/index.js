import "./index.css";
import "@rainbow-me/rainbowkit/dist/index.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { Blogposts, Blogpost, CreateRecipe, Home, Recipes, Profile } from "./pages";
import { RecipeFeatures } from "./containers";
import { Recipe } from "./components";

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

// Configure Wagmi client
const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Cookbook',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

// Extend ChakraUI theme with brand colors
const theme = extendTheme({
  colors: {
    brand: {
      100: "#6C7C86",
      200: '#505D67',
      300: '#3C4751',
      400: '#2F3943',
      500: '#917B54',
      600: '#AD9870',
      700: '#C9B68E',
      800: '#DCCAA3'
    },
  },
})

createRoot(document.getElementById('root')).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="blog" element={<Blogposts />}>
                  <Route path=":digest" element={<Blogpost />} />
                </Route>
                <Route path="create" element={<CreateRecipe />} />
                <Route path="recipes" element={<Recipes />}>
                  <Route index element={<RecipeFeatures />} />
                  <Route path=":recipeId" element={<Recipe />} />
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </ChakraProvider>
      </ApolloProvider>
    </RainbowKitProvider>
  </WagmiConfig>,
);
