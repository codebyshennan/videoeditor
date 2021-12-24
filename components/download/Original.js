import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Box,
  Button,
  Container,
  useBreakpointValue,
  useColorModeValue,
  AspectRatio,
  Flex,
  Avatar,
  Stack,
  Text
} from '@chakra-ui/react';

const Original = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  return (
    <VStack 
      w="full" 
      h="full" 
      p={10} 
      spacing={10} 
      alignItems="flex-start"
    >
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl"> Original Video</Heading>
        <Container>
            <Box
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>

              <AspectRatio
                ratio={16/9}>
                <video></video>
              </AspectRatio>

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

export default Original;