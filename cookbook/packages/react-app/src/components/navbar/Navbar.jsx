import { Button, ButtonGroup, Link, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink } from "react-router-dom";

const Navbar = ({ isVisible, children }) => {
  return(
    <>
    <Button variant={'link'}>
      <Link as={ReactLink} to="/">Home</Link>
    </Button>
    <Spacer />
    <ButtonGroup variant={'link'}>
      <Button>
        <Link as={ReactLink} to="/about">About</Link>
      </Button>
      <Button>
        <Link as={ReactLink} to="/create">Create</Link>
      </Button>
      <Button>
        <Link as={ReactLink} to="/profile">Profile</Link>
      </Button>
    </ButtonGroup>
      {isVisible && {children}}
    </>
  )
}

export default Navbar;