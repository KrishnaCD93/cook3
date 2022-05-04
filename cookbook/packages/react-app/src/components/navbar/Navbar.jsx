import { Button, ButtonGroup, Link, Spacer } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = ({ isVisible, children }) => {
  return(
    <>
    <ButtonGroup variant={'link'}>
      <Button>
        <Link as={NavLink} style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/">Home</Link>
      </Button>
      <Button>
        <Link as={NavLink} style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/blog">Blog</Link>
      </Button>
      <Button>
        <Link as={NavLink} style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/create">Create</Link>
      </Button>
    </ButtonGroup>
    <Spacer />
    <Button variant='link'>
      <Link as={NavLink} style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "#c9b68e" : "",
            };
          }} to="/profile">Profile</Link>
    </Button>
    {isVisible && {children}}
    </>
  )
}

export default Navbar;