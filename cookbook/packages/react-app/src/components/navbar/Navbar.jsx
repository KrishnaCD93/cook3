import { Button, ButtonGroup, Link, Spacer } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from "react-router-dom";
import { Header } from "../index"

const Navbar = ({ children }) => {
  return(
    <Header>
      <ButtonGroup>
        <Button>
          <Link as={NavLink} style={({ isActive }) => {
              return {
                color: isActive ? "#c9b68e" : "#2F3943",
              };
            }} to="/">Home</Link>
        </Button>
        <Button>
          <Link as={NavLink} style={({ isActive }) => {
              return {
                color: isActive ? "#c9b68e" : "#2F3943",
              };
            }} to="/blog">Blog</Link>
        </Button>
        <Button>
          <Link as={NavLink} style={({ isActive }) => {
              return {
                color: isActive ? "#c9b68e" : "#2F3943",
              };
            }} to="/recipes">Recipes</Link>
        </Button>
      </ButtonGroup>
      <Spacer />
      <ButtonGroup>
        <Button>
          <Link as={NavLink} style={({ isActive }) => {
            return {
              color: isActive ? "#c9b68e" : "#2F3943",
            };
          }} to="/profile">View Cookbook</Link>
        </Button>
        <Button>
          <Link as={NavLink} style={({ isActive }) => {
            return {
              color: isActive ? "#c9b68e" : "#2F3943",
            };
          }} to="/create">Create Recipe</Link>
        </Button>
      </ButtonGroup>
      <Spacer />
      {children}
    </Header>
  )
}

export default Navbar;