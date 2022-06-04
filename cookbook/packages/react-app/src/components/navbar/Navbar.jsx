import { Box, Flex, Image, Link, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Header } from "../index"
import logo from '../../assets/Logo - Limed Spruce.svg'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";

const Navbar = ({ children, ...props}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return(
    <Header>
    <NavBarContainer {...props}>
      <Logo w='100px' />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
      <Spacer />
      {children}
    </NavBarContainer>
    </Header>
  )
}

function Logo(props) {
  return (
    <Link as={NavLink} to='/'>
      <Box {...props}>
        <Image src={logo} alt="Logo" />
      </Box>
    </Link>
  )
}

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box color='brand.600' display={{ base: "block", md: "none" }} onClick={toggle} m={2} p={2}>
      {isOpen ? <AiOutlineCloseCircle size={30} /> : <BiFoodMenu size={30} />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link as={NavLink} to={to} style={({ isActive }) => {
      return {
        color: isActive ? "#c9b68e" : "#6C7C86",
      };
    }}>
      <Text fontSize={'lg'} display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }} m={2}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to='/'>Home</MenuItem>
        <MenuItem to='/blog'>Blog</MenuItem>
        <MenuItem to='/recipes'>Recipes</MenuItem>
        <MenuItem to='/create'>Create Recipe</MenuItem>
        <MenuItem to='/profile' isLast>Profile</MenuItem>
      </Stack>
    </Box>
  )
}

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Navbar;