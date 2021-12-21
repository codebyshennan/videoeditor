import { useState, useEffect, useRef, useContext, createContext } from 'react'
import Editor from '../../components/Editor'
import Transcript from '../../components/Transcript'
import { Flex, TabPanel, Tabs, Tab, TabPanels,TabList } from '@chakra-ui/react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

// TODO: 
/**
 * 1. make a nicer nav bar
 * 2. ensure that the videosetting props are complete
 */


const ffmpeg = createFFmpeg({
  corePath:'/ffmpeg-core/ffmpeg-core.js',
  log: true
})

export const AppContext = createContext()

const Index = () => {
  // general video settings
  const [ videoSettings, setVideoSettings ] = useState({
    playing: false,
    isMuted: false,
    thumbnails: [],
    currentGrabbed: {
      index: 0,
      type: 'none'
    },
    deletingGrabber: false,
    currentWarning: null,

    videos: [], // for now just take in one video file
    videoReady: false,
    timings: [],
    scale: 0,

    audio: "",
    audioUuid: [],
    processRatio: 1,
    processStage: [],
    timeTaken: [],
    ffmpegReady: false,
    
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

          <TabPanel>
            {/* download page */}
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
