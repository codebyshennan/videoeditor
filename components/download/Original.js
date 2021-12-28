import { FormControl,  FormLabel,  Input,  VStack,  Heading,  Box,  Button,  Container,  useBreakpointValue,  useColorModeValue,  AspectRatio,  Flex,  Avatar,  Stack,  Text } from '@chakra-ui/react';
import { FileContext } from '../context'
import { useContext, useState } from 'react'

const Original = () => {
  //add dropzone

  const { uploadedVideo, setUploadedVideo, videoStatusRef } = useContext(FileContext)

  

  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const onBrowseBtnClick = () => {
    inputFile.current.click();
  };

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
            overflow={'hidden'}
            onClick = { onBrowseButtonClick }
            >
            
            { uploadedVideo && 
              <AspectRatio
                ratio={16/9}>
                <video
                  controls
                  src={URL.createObjectURL(uploadedVideo)}
                ></video>
              </AspectRatio>
            }

          </Box>
        </Container>
      </VStack>
    </VStack>
  );
};

export default Original;