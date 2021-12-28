import { Heading, VStack, Image, AspectRatio, Text, Divider, Stack, useColorMode
  Button, Container, Box, Flex, } from '@chakra-ui/react';
import { useContext } from 'react'
import { FileContext } from '../../pages/index'

const Optimized = () => {\
  
  const { uploadedVideo, setUploadedVideo, videoStatusRef } = useContext(FileContext)

  const onDownloadClick = () => {
    downloadAnchor.current.click();
  };


  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={6}
      align="flex-start"
    >
      <VStack alignItems="flex-start" spacing={3}>
        <Heading size="2xl">Optimized Video</Heading>
        <Container>
            <Box
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
              onClick = {onDownloadClick}>

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

export default Optimized;