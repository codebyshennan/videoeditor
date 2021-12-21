import SidePanel from './file/SidePanel'
import VideoDisplay from './player/VideoDisplay'
import PlayerControls from './editor/controls/PlayerControls' 
import VideoTimeline from './editor/video/VideoTimeline'
import AudioTimeline from './editor/audio/AudioTimeline'
import TextTimeline from './editor/text/TextTimeline'
import ProgressBar from './editor/controls/ProgressBar'
import { Box, Container, VStack, StackDivider, Grid, Flex } from '@chakra-ui/react'
import { useRef, useEffect, useState, useContext } from 'react'
import { AppContext } from '../pages/main'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'

const Editor = () => {

  const { videoSettings, setVideoSettings } = useContext(AppContext)
  const [ videoCanvasDimensions, setVideoCanvasDimensions ] = useState()
  const videoCanvasContainer = useRef()

  useEffect(() => {
    const ctx = videoCanvasContainer.current.getBoundingClientRect()
  }, [])

  // for toggling light/dark modes
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Grid
      h='90vh'
      w='100vw'
      
      templateRows='
        4.6fr 
        0.6fr 
        3.6fr
        0.4fr'
      templateColumns='0.5fr 1.5fr '
      templateAreas = {{ 
        base:   `'sidebar   display' 
                'playback   playback'
                'timeline   timeline'
                'status     status'` }}
      autoFlow = "column"
      gap={0.5}
    >

      <Box borderWidth="0" boxShadow="md" rounded="md" gridArea="sidebar" onClick={toggleColorMode}>
          <SidePanel videoSettings = {videoSettings} setVideoSettings={setVideoSettings}/>
      </Box>

      <Box boxShadow="md" rounded="md" gridArea="display" ref={videoCanvasContainer}>
          <VideoDisplay />
      </Box>

      <Box boxShadow="md" rounded="md" gridArea="playback">
          <PlayerControls />
      </Box>

      <Box boxShadow="md" rounded="md" gridArea="timeline" h="100%">
        <VideoTimeline />
        <AudioTimeline />
        <TextTimeline />
      </Box>

      <Box boxShadow="md" rounded="md" gridArea="status">
          <ProgressBar />
      </Box>

    </Grid>
  )

}

export default Editor
