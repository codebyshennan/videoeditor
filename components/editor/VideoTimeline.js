import { MdVideocam } from 'react-icons/md'
import { Box, Container, Flex, Icon, Text, HStack } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import VideoSeq from '../../components/editor/VideoSeq'
import Draggable from 'react-draggable'


const VideoTimeline = () => {  

//  get the context of the dimensions

  const [ windowDimensions, setWindowDimensions ] = useState()
  const [ scrubPosition, setScrubPosition ] = useState(0)
  const [ ratio, setRatio ] = useState(0)
  const frameLocation = useRef()
  const timeScrubber = useRef()
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

  useEffect(()=> {
    setWindowDimensions(window.innerWidth)

    const handleResize = ()=> {
      console.log(window)
      setWindowDimensions(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getRatio = (event) => {
    const boxWidth = frameLocation.current.getBoundingClientRect().width
    let mousePos = event.clientX
    let ratio = (mousePos / boxWidth) * 100
    setRatio(ratio)
  }

  const shiftTimeScrub = (event) => {
    event.preventDefault()
    const boxWidth = frameLocation.current.getBoundingClientRect().width
    let mousePos = event.clientX
    let ratio = ( mousePos / boxWidth ) * 100
    setScrubPosition(ratio)
  }

  return (
    <HStack 
      spacing="10px"
      ref={frameLocation} 
      onMouseMove={getRatio} 
      id="test"
      >
      <Flex minWidth="50px" justifyContent="center" alignItems="center">
          <Icon as={MdVideocam} />
      </Flex>

      <Box>
        <Box
          position={"absolute"}
          width={"2px"}
          height={120}
          backgroundColor="gray"
          left={`${ratio}%`}
          zIndex={-1}
          // onClick={ (ev)=> console.log(ev) }
          id="marker"
        >

        </Box>
        <Draggable axis="x">
          <Box
            position={"absolute"}
            marginLeft="75px"
            width={"2px"}
            height={120}
            cursor = {"col-resize"}
            left={`${scrubPosition}%`}
            ref={timeScrubber}
            backgroundColor="red"
            id="position"
          ></Box>
        </Draggable>


          <Flex>
            <Flex
              width={windowDimensions}
              height={10}
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
            
          </Flex>
      </Box>
    </HStack>
  )
}

export default VideoTimeline
