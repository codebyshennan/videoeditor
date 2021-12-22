import { Flex, Container } from '@chakra-ui/react';
import New from './New';
import Old from './Original';

const Download = () => (
  <Container maxW="container.xl" p={0}>
    <Flex
      h={{ base: 'auto', md: '90vh' }}
      py={[0, 10, 20]}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Old />
      <New />
    </Flex>
  </Container>
);

export default Download;