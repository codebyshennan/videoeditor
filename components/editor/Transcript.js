import SideNav from '../../components/transcript/SideNav'
import TopNav from '../../components/transcript/TopNav'
import Header from '../../components/transcript/Header'
import MetaInfo from '../../components/transcript/MetaInfo'
import Transcription from '../../components/transcript/Transcription'
import AudioPlayer from '../../components/transcript/AudioPlayer'
import { Box, Flex, Container } from '@chakra-ui/react'

const Transcript = () => {


  return (
    <Flex
      height ="90vh"
    >
      <SideNav/>
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