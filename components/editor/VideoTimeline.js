import { MdVideocam } from 'react-icons/md'
import { Box, Container, Flex, Icon, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'


const VideoTimeline = () => {
  const [ subtranscript, setSubtranscript ] = useState("")

  useEffect(()=> {
    setSubtranscript("this is a new text")
  },[])


  return (
    <Box>
      <Flex>
        <Box>
          <Icon as={MdVideocam} />
        </Box>
        <Box>
            
        </Box>
      </Flex>
    </Box>
  )
}

export default VideoTimeline
