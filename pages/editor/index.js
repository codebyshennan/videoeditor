import Navbar from '../../components/editor/Navbar'
import SidePanel from '../../components/editor/SidePanel'
import VideoDisplay from '../../components/editor/VideoDisplay'
import PlayerControls from '../../components/editor/PlayerControls' 
import VideoTimeline from '../../components/editor/VideoTimeline'
import AudioTimeline from '../../components/editor/AudioTimeline'
import TextTimeline from '../../components/editor/TextTimeline'
import ProgressBar from '../../components/editor/ProgressBar'
import VideoPlayer from '../../components/editor/VideoPlayer'
import { Box, Container, Flex, VStack, StackDivider } from '@chakra-ui/react'



const Index = () => {

  return (
    <Box>
      <Flex>
        <Flex direction="column">
          <Navbar />
          <VideoDisplay />
          <PlayerControls />
        </Flex>
        <SidePanel />
      </Flex>
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
        <VideoTimeline />
        <AudioTimeline />
        <VideoPlayer />
        <TextTimeline />
        <ProgressBar />
      </VStack>
    </Box>
  )
}

export default Index