import { useState, useEffect, useRef, useContext, createContext } from 'react'
import Editor from '../../components/Editor'
import Transcript from '../../components/Transcript'
import Profile from '../../components/profile/Profile'
import Download from '../../components/download/Download'
import { Icon, Button, TabPanel, Tabs, Tab, TabPanels,TabList } from '@chakra-ui/react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import LogoutModal from '../../components/LogoutModal'
import { useDisclosure } from '@chakra-ui/react'
import GithubCorner from 'react-github-corner';
import { CgProfile, CgSoftwareDownload, CgTranscript } from 'react-icons/cg'
import { FaPhotoVideo } from 'react-icons/fa'


// TODO: 
/**
 * 1. make a nicer nav bar [done
 * 2. ensure that the videosetting props are complete
 */


export const AppContext = createContext()
export const FileContext = createContext()

const Index = () => {
  // general video settings
  const videoSettings = useRef()
  videoSettings.current = {
        isPlaying: false,
        isMuted: false,
        isSlice: false,
        isPan: false,
        thumbnails: [],
        currentTime: 0,
        currentGrabbed: {
          index: 0,
          type: 'none'
        },
        deletingGrabber: false,
        currentWarning: null,
        videos: [], // for now just take in one video file
        videoReady: false,
        splicedTimings: [],  
        scale: 0,
        speedUp: false,
        audio: "",
        audioState: {},
        audioUuid: [],
        processRatio: 1,
        processStage: [],
        timeTaken: [],
        ffmpegReady: false,
        transcription: []
      }

  const [ fileUploads, setFileUploads ] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <AppContext.Provider value= {{ videoSettings }}>
      <FileContext.Provider value = {{ fileUploads, setFileUploads }}>
      <GithubCorner href="https://github.com/wongsn/otteraiclone/" />
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
      <Button> Click me </Button>
      <LogoutModal isOpen={isOpen} onClose={onClose}/>
      </FileContext.Provider>
    </AppContext.Provider>
  )
}

export default Index
