import Navbar from '../../components/editor/Navbar'
import SidePanel from '../../components/editor/SidePanel'
import VideoDisplay from '../../components/editor/VideoDisplay'
import PlayerControls from '../../components/editor/PlayerControls' 
import VideoTimeline from '../../components/editor/VideoTimeline'
import AudioTimeline from '../../components/editor/AudioTimeline'
import TextTimeline from '../../components/editor/TextTimeline'
import ProgressBar from '../../components/editor/ProgressBar'
import VideoPlayer from '../../components/editor/VideoPlayer'
import { Box, Container, VStack, StackDivider, Grid, Flex } from '@chakra-ui/react'



const Index = () => {

  return (
    <Grid
      
      h='100vh'
      templateRows='0.2fr 6.1fr 0.9fr 0.9fr 0.3fr 0.8fr 0.1fr'
      templateColumns='1.5fr 0.5fr'
      templateAreas = {{ base: `'nav sidebar' 'display sidebar' 'video video' 'audio audio' 'playback playback' 'transcript transcript' 'status status'` }}
      gap={2}
    >
      <Box border='1px' gridArea="nav">
          <Navbar />
      </Box>
      <Box border='1px' gridArea="sidebar">
          <SidePanel />
      </Box>
      <Box border='1px' gridArea="display">
          <VideoDisplay />
      </Box>
      <Box border='1px' gridArea="video">
          <VideoTimeline />
      </Box>
      <Box border='1px' gridArea="audio">
          <AudioTimeline />
      </Box>
      <Box border='1px' gridArea="playback">
          <PlayerControls />
      </Box>
      <Box border='1px' gridArea="transcript">
          <TextTimeline />
      </Box>
      <Box border='1px' gridArea="status">
          <ProgressBar />
      </Box>

    </Grid>

  )


}

export default Index