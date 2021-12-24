import { useState, useContext, useRef, useEffect } from 'react'
import Draggable from 'react-draggable'
import { Box, Container, Flex, } from '@chakra-ui/react'
import { TimelineContext } from '../Editor'
import { FileContext } from '../../pages/index'


const Scrubber = ({ videoContainerRef }) => {
  
  const frameLocation = useRef()
  const time = useRef()
  const { timelineDimensions, setTimelineDimensions } = useContext(TimelineContext)
  const { fileUploads, setFileUploads, videoStatus } = useContext(FileContext)

  const [ scrubPosition, setScrubPosition ] = useState(0)
  const [ ratio, setRatio ] = useState(0)
  
  const getRatio = (event) => {
    const box = frameLocation.current.getBoundingClientRect()
    let mousePos = event.clientX
    let ratio = ((mousePos - box.left) / box.width) * 100
    setRatio(ratio)
  }

  const shiftTimeScrub = (event) => {
    event.preventDefault()
    const boxWidth = frameLocation.current.getBoundingClientRect().width
    let mousePos = event.clientX
    let ratio = ( mousePos / boxWidth ) * 100
    setScrubPosition(ratio)
  }

  // useEffect(()=> {

  // })


  return (
   <Flex 
      ref={frameLocation}
      position="absolute"
      width= "calc(100% - 50px)"
      height= "calc(100% - 6px)"
      top="6px"
      left="50px"
      // zIndex={99}
      onMouseMove={getRatio} 
    >
      <Box
        position="absolute"
        width="2px"
        height="100%"
        backgroundColor="gray"
        opacity="0.3"
        left={`${ratio}%`}
        zIndex={99}
        // onClick={ (ev)=> console.log(ev) }
        id="marker"
      />

      <Draggable axis="x">
        <Box>
          <Box 
            width="10px"
            height="10px"
            position="absolute"
            cursor = {"col-resize"}
            left={`${scrubPosition}%`}
            backgroundColor="red"
          />
          <Box
            width={"2px"}
            height="100%"
            cursor = {"col-resize"}
            left={`${scrubPosition}%`}
            ref={time}
            backgroundColor="red"
            id="position"
          />
        </Box>
      </Draggable>
     </Flex>
  )
}

export default Scrubber
