import {
  Container,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <Container
      as={Stack}
      maxW={'6xl'}
      py={4}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}>
      <Text>© 2022 CookbookDAO. All rights reserved</Text>
    </Container>
  );
}