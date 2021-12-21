import { useState, useEffect, useRef } from 'react'
import { Flex, Box, Container } from '@chakra-ui/react'
import VideoSeq from '../../lib/components/VideoSeq'
import Draggable from 'react-draggable'
import ReactJoyride from 'react-joyride'


const VideoEditor = () => {


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
    <Flex>
      <Box
        position={"absolute"}
        width={"2px"}
        height={400}
        backgroundColor="gray"
        left={`${ratio}%`}
        zIndex={-1}
        // onClick={ (ev)=> console.log(ev) }
        id="marker"
      ></Box>
      <Draggable axis="x">
        <Box
          position={"absolute"}
          width={"2px"}
          height={400}
          cursor = {"col-resize"}
          left={`${scrubPosition}%`}
          ref={timeScrubber}
          backgroundColor="red"
          id="position"
        ></Box>
      </Draggable>
      <Flex
        width={windowDimensions}
        height={400}
        border={"2px solid"}
        // pointerEvents={"none"}
        //  onMouseEnter={(event)=> console.log(event)}
        onMouseMove={getRatio}
        backgroundColor ="transparent"
        id="test"
        ref={frameLocation}
      >
        <VideoSeq zIndex={999} videoSequences={videoSequences} setVideoSequences = {setVideoSequences}/>
      </Flex>
      
    </Flex>
  )
}

export default VideoEditor
