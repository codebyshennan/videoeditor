import SidePanel from './file/SidePanel'
import VideoDisplay from './player/VideoDisplay'
import PlayerControls from './editor/controls/PlayerControls' 
import Scrubber from './editor/Scrubber'
import ProgressBar from './editor/controls/ProgressBar'
import { Box, Container, VStack, StackDivider, Grid, Flex, HStack } from '@chakra-ui/react'
import { useRef, useEffect, useState, useContext, createContext, useCallback } from 'react'
import { AppContext } from '../pages/index'
import Timeline from './editor/Timeline'
import TimelineButtons from './editor/TimelineButtons'
import FileOptions from './editor/controls/FileOptions'

export const TimelineContext = createContext()

const Editor = () => {

  const { videoSettings } = useContext(AppContext)

  const videoCanvasContainer = useRef()
  const timeline = useRef()
  const videoContainerRef = useRef()
  const [ timelineDimensions, setTimelineDimensions ] = useState()

  
  const handleKeyPress = useCallback((event) => {
    console.log(event.keyCode)
    switch (event.keyCode) {
      case 32:
        // [ space ]
        break;
      
      case 18:
      // [ alt ]
        break;

      case 27:
      // [ esc ]
        break;

      case 16:
      // [ shift ]
        break;
    
      default:
        break;
    }
  })


  return (
      <Grid
        h='90vh'
        minWidth='95vw'
        
        templateRows='
          5fr
          0.5fr
          0.5fr 
          3.5fr
          0.5fr
          '
        templateColumns='1fr 1.5fr '
        templateAreas = {{ 
          base:   `'sidebar   display'
                  'options    display' 
                  'playback   playback'
                  'timeline   timeline'
                  'status     status'` }}
        autoFlow = "column"
        gap={0.5}
        
      >

        <Box borderWidth="0" boxShadow="md" rounded="md" gridArea="sidebar">
          <SidePanel />
        </Box>

        <Flex borderWidth="0" boxShadow="md" rounded="md" gridArea="options">
          <FileOptions />
        </Flex>

        <Box boxShadow="md" rounded="md" gridArea="display" ref={videoCanvasContainer}>
          <VideoDisplay videoContainerRef = {videoContainerRef} />
        </Box>

        <Flex alignItems="center" boxShadow="md" rounded="md" gridArea="playback">
          <PlayerControls videoContainerRef = {videoContainerRef} />
        </Flex>
        
        <TimelineContext.Provider value = {{timelineDimensions, setTimelineDimensions}} >
          <Flex boxShadow="md" rounded="md" gridArea="timeline" ref={timeline} overflowX="auto" height="100%" w="100%">
            <Flex
              position="relative"
              height="100%"
              w="100%"
              direction="row"
            >
              <TimelineButtons />
              <Scrubber videoContainerRef={videoContainerRef}/>
              <Timeline videoContainerRef={videoContainerRef}/>
            </Flex>
          </Flex>
        </TimelineContext.Provider>

        <Flex direction="column" boxShadow="md" rounded="md" gridArea="status">
          <ProgressBar />
        </Flex>

      </Grid>
  )

}

export default Editor
