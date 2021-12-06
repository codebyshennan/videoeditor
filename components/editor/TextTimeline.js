import { MdOutlineTextFields } from 'react-icons/md'
import { Box, Container, Flex, Icon, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'


const TextTimeline = () => {
  const [ subtranscript, setSubtranscript ] = useState("")

  useEffect(()=> {
    setSubtranscript("this is a new text")
  },[])


  return (
    <Box>
      <Flex>
        <Box>
          <Icon as={MdOutlineTextFields} />
        </Box>
        <Container>
            <Text> { subtranscript } </Text>
        </Container>
      </Flex>
    </Box>
  )
}

export default TextTimeline
