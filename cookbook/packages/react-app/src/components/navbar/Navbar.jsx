import { Button, ButtonGroup, Link, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink } from "react-router-dom";

const Navbar = ({ isVisible, children }) => {
  return(
    <>
    <ButtonGroup variant={'link'}>
      <Button>
        <Link as={ReactLink} to="/">Home</Link>
      </Button>
      <Button>
        <Link as={ReactLink} to="/about">About</Link>
      </Button>
      <Button>
        <Link as={ReactLink} to="/create">Create</Link>
      </Button>
    </ButtonGroup>
    <Spacer />
    <Button variant={'link'}>
      <Link as={ReactLink} to="/profile">Profile</Link>
    </Button>
    {isVisible && {children}}
    </>
  )
}

export default Navbar;