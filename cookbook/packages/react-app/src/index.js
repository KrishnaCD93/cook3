import "./index.css";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

import App from "./App";
import { createRoot } from 'react-dom/client';

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

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
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <App tab='home' />
    </ChakraProvider>
  </ApolloProvider>,
);
