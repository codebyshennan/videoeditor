
import GithubCorner from 'react-github-corner';

import Editor from '../components/Editor'
import Transcript from '../components/Transcript'
import Profile from '../components/profile/Profile'
import Download from '../components/download/Download'

import { Icon, TabPanel, Tabs, Tab, TabPanels,TabList, useDisclosure  } from '@chakra-ui/react'
import { CgProfile, CgSoftwareDownload, CgTranscript } from 'react-icons/cg'
import { FaPhotoVideo } from 'react-icons/fa'
import LogoutModal from '../components/LogoutModal'
import { ProcessingContext } from '../components/context';

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { progress, ...rest } = useContext(ProcessingContext)
  
  return (
    <>
      { progress == 100 && <Confetti numberOfPieces={1000} recycle = {false} /> }

      <GithubCorner href="https://github.com/wongsn/videoeditor/" />

      <Tabs isFitted variant='enclosed-colored' maxWidth="100vw">

        <TabPanels>
          <TabPanel>
            <Profile />
          </TabPanel>
          <TabPanel>
            <Editor/> 
          </TabPanel>
          <TabPanel>
            <Transcript /> 
          </TabPanel>
          <TabPanel>
            <Download />
          </TabPanel> 
        </TabPanels>

        <TabList>
          <Tab>
            <Icon as={CgProfile} mr={2}/> Profile
          </Tab>
          <Tab> 
            <Icon as={FaPhotoVideo} mr={2}/> Edit Video
          </Tab>
          <Tab> 
            <Icon as={CgTranscript} mr={2}/> Transcript 
          </Tab>
          <Tab> 
            <Icon as={CgSoftwareDownload} mr={2}/> Download
          </Tab>
        </TabList>

      </Tabs>

      <LogoutModal isOpen={isOpen} onClose={onClose}/>
    </>


  )
}

export default Index
