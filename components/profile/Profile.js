import { Flex, Container } from '@chakra-ui/react';
import Tutorial from './Tutorial';
import Details from './Details';

const Profile = () => (
  <Container maxW="container.xl" p={0}>
    <Flex
      h={{ base: 'auto', md: '90vh' }}
      py={[0, 10, 20]}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Details />
      <Tutorial />
    </Flex>
  </Container>
);

export default Profile;