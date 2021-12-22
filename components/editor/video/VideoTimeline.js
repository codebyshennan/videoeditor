import { Box, Container, Flex, Icon, Text, HStack } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import VideoSeq from './VideoSeq'


const VideoTimeline = () => {  

//  get the context of the dimensions
  
  const videoObj = [
    {
      start: "0",
      end: "10",
      duration: 100
    }, 
    {
      start: "11",
      end: "50",
      duration: 600
    }
  ]

  const [ videoSequences, setVideoSequences ] = useState(videoObj)


  return (
    <HStack 
      // spacing="10px"
      >
      <Flex
        width={100}
        // height={10}
        boxShadow="sm"
        // pointerEvents={"none"}
        //  onMouseEnter={(event)=> console.log(event)}
        backgroundColor ="transparent"

      >
        <VideoSeq 
          zIndex={999} 
          videoSequences={videoSequences} 
          setVideoSequences = {setVideoSequences}/>
      </Flex>

    </HStack>
  )
}

export default VideoTimeline
