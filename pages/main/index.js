import { useState, useEffect, useRef, useContext, createContext } from 'react'
import Editor from '../../components/editor/Editor'
import Transcript from '../../components/editor/Transcript'
import { Flex, TabPanel, Tabs, Tab, TabPanels,TabList } from '@chakra-ui/react'


const ffmpeg = createFFmpeg({
  corePath:'/ffmpeg-core/ffmpeg-core.js',
  log: true
})

export const AppContext = createContext()

const Index = () => {
  // general video settings
  const [ videoSettings, setVideoSettings ] = useState({
    video: [], // for now just take in one video file
    processStage: [],
    timeTaken: [],
    audio: "",
    audioUuid: [],
    processRatio: 1,
    timings: [],
    scale: 0,
    videoReady: false,
    ffmpegReady: false,
    playing: false,
    isMuted: false,
    currentGrabbed: {
      index: 0,
      type: 'none'
    },
    deletingGrabber: false,
    currentWarning: null,
    imageUrl: "",
    transcription: []
  })

  return (
    <AppContext.Provider value= {{ videoSettings, setVideoSettings }}>
      <Tabs isFitted variant='enclosed'>
        <TabPanels>
          <TabPanel>
            <Editor/> 
          </TabPanel>
          <TabPanel>
            <Transcript /> 
          </TabPanel>
        </TabPanels>
        <TabList>
          <Tab> Upload </Tab>
          <Tab> Edit </Tab>
          <Tab> Download </Tab>
        </TabList>
      </Tabs>
    </AppContext.Provider>
  )
}

export default Index
