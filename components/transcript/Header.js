import { Button, ButtonGroup, Flex, Spacer, Box, Text } from '@chakra-ui/react'

const Header = () => {

  return (
    <Flex>
      <Box p='6'>
        <Text fontSize='4xl' fontWeight="bold">
          Transcript
        </Text> 
      </Box>
      <Spacer />
      <Box p='6'>
        <ButtonGroup variant='outline' spacing='6'>
          <Button colorScheme='blue'>Edit</Button>
          <Button>?</Button>
          <Button>...</Button>
        </ButtonGroup>
      </Box>
    </Flex>
  )
}


export default Header


