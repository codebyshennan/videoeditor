import SideNav from '../../components/transcript/SideNav'
import TopNav from '../../components/transcript/TopNav'
import Header from '../../components/transcript/Header'
import MetaInfo from '../../components/transcript/MetaInfo'
import Transcription from '../../components/transcript/Transcription'
import AudioPlayer from '../../components/transcript/AudioPlayer'
import { Box, Flex, Container } from '@chakra-ui/react'

const Index = () => {


  return (
    <Flex>
      <SideNav/>
      {/* <Spacer /> */}
      <Flex 
        align="stretch"
        direction="column"
        width = "95vw"
      >
        <Flex
          direction="column" 
          height ="90vh"
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


export default Index