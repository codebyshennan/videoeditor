import {
  Center,
  Image,
  Avatar,
  Box,
  Flex,
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react';

const Details = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Welcome Back!</Heading>
          <Container>
            <Box
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
                objectFit={'cover'}
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                  }
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                    John Doe
                  </Heading>
                  <Text color={'gray.500'}>johndoe@doeraemi.com</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>3</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Videos Optimized
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>142</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Minutes Optimized
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Container>
      </VStack>
    </VStack>
  );
};

export default Details;