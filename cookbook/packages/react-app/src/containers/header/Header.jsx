import React from 'react';

import logomark from '../../assets/Logomark - Sorrell Brown.png';
import wordmark from '../../assets/Wordmark - Sorrell Brown.png';
import {
  Circle,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export default function Header() {

  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Circle>
          <Image objectFit='cover' borderRadius='full' boxSize={{sm:'150px', md:'400px'}} src={logomark} alt='Logomark' />
        </Circle>
        <Image src={wordmark} alt='Wordmark' />
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'} color='brand.100'>
          Recipe creation{' '}
          <Text as={'span'} color={'brand.700'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Build recipes with our graphical builder. Create recipe collections and
          share them with your community. Interact with other users and
          discover new recipes. Create your meta kitchen.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <SignUp />
          <Button rounded={'full'} px={6}
            colorScheme={'brand'}
            bg={'brand.100'}
            _hover={{ bg: 'brand.200' }}>
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

// Sign up button with modal to embeded google form
function SignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}
      rounded={'full'}
      px={6}
      colorScheme={'brand'}
      bg={'brand.700'}
      _hover={{ bg: 'brand.500' }}>Sign Up!</Button>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' scrollBehavior='outside' isCentered='true'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe title='Cookbook Sign Up Form'
            src="https://docs.google.com/forms/d/e/1FAIpQLSdnX5kioOIjyt7ZQIRJ2fat8lG7AUdx-SDfxMbVKT3BbTVtjg/viewform?embedded=true" 
            width="375" height="1200" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}