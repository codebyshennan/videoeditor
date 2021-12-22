import {
  Heading,
  Flex,
  VStack,

  Center,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';



const Tutorial = () => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');


  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={6}
      align="flex-start"
      bg={bgColor}
    >
      <VStack alignItems="flex-start" spacing={3}>
        <Heading size="2xl">Runthrough</Heading>
  
      </VStack>
    </VStack> 
  )
};

export default Tutorial;