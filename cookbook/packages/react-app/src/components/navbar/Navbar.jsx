import { Button, ButtonGroup, Link, Spacer } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from "react-router-dom";
import { Header } from "../index"

const Navbar = ({ children }) => {
  return(
    <Header>
    <ButtonGroup variant={'link'}>
      <Button>
        <Link as={NavLink} style={({ isActive }) => {
            return {
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/">Home</Link>
      </Button>
      <Button>
        <Link as={NavLink} style={({ isActive }) => {
            return {
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/recipes">Recipes</Link>
      </Button>
      <Button>
        <Link as={NavLink} style={({ isActive }) => {
            return {
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/create">Create</Link>
      </Button>
      <Button>
        <Link as={NavLink} style={({ isActive }) => {
            return {
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/blog">Blog</Link>
      </Button>
    </ButtonGroup>
    <Spacer />
    <Button variant='link'>
      <Link as={NavLink} style={({ isActive }) => {
            return {
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/profile">Profile</Link>
    </Button>
    {children}
    </Header>
  )
}

export default Navbar;