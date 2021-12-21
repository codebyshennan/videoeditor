import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

const FileCard = () => {
  return (
    <Center py={6}>
      <Stack
        maxW={'200px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'sm'}
        rounded={'sm'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'50px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
        </Box>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}

export default FileCard
