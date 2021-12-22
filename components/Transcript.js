import TopNav from './transcript/TopNav'
import Header from './transcript/Header'
import MetaInfo from './transcript/MetaInfo'
import Transcription from './transcript/Transcription'
import AudioPlayer from './transcript/AudioPlayer'
import { Box, Flex, Container } from '@chakra-ui/react'

const Transcript = () => {


  return (
    <Flex
      height ="90vh"
    >
      {/* <Spacer /> */}
      <Flex 
        align="stretch"
        direction="column"
        width = "95vw"
      >
        <Flex
          direction="column" 
          
          overflowY="scroll"
        >
          <TopNav />
          <Container maxWidth="50vw">
            <Header />
            <MetaInfo />
            <Transcription />
          </Container>
        </Flex>
        <Box
          height ="10vh"
          ml="20px"
          mr="20px"
        >
           <AudioPlayer />
        </Box>
      </Flex>
    </Flex>
  )

}


export default Transcript