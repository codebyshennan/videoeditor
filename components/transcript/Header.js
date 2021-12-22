import { Button, ButtonGroup, Flex, Spacer, Box, Text, Tooltip } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import DisplayOptions from './DisplayOptions'
import DisplayEdit from './DisplayEdit'

const Header = () => {

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isOptionsOpen, onOpen: onOptionsOpen, onClose: onOptionsClose } = useDisclosure()


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
          <Button colorScheme='blue' onClick={onEditOpen}>Edit</Button>
          <DisplayEdit isOpen={isEditOpen} onClose={onEditClose} />

          <Tooltip hasArrow label="Insert helper text" bg="gray.300">
            <Button>?</Button>
          </Tooltip>

          <Button onClick={onOptionsOpen}>...</Button>
          <DisplayOptions isOpen={isOptionsOpen} onClose={onOptionsClose} />

        </ButtonGroup>
      </Box>
    </Flex>
  )
}


export default Header


