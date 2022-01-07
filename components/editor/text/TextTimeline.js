import { Box, Container, Flex, Icon, Text, Spacer, HStack } from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context'
import transcript from '../../../transcript'


const TextTimeline = () => {
  const { videoSettings, setVideoSettings } = useContext(AppContext)
  const [ subtranscript, setSubtranscript ] = useState("")

  useEffect(()=> {
    setSubtranscript("this is a new text")
  },[])


  return (
    <HStack alignItems="center">
      <Flex >
        <Box>
          <Text fontWeight="bold"> [ </Text>
        </Box>
        <Spacer />
        <Box> { subtranscript } </Box>
        <Spacer />
        <Box>
          <Text fontWeight="bold"> ] </Text>
        </Box>
      </Flex>
    </HStack>
  )
}

export default TextTimeline
