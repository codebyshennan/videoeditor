import { Box, Flex, Input, Icon, Text, Container } from '@chakra-ui/react'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'

const TopNav = () => {

  return (
    <Box>
      <Flex
        py="2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex mr="4" justifyContent="right" alignItems="center">
          <Input placeholder='Search' />
          <Container> 
            <Icon as={FaSearch} />
          </Container> 
        </Flex>
      </Flex>
    </Box>
  )
}


export default TopNav


