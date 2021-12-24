import { useState, useEffect, useRef, useContext, createContext } from 'react'
import Editor from '../components/Editor'
import Transcript from '../components/Transcript'
import Profile from '../components/profile/Profile'
import Download from '../components/download/Download'
import { Icon, Button, TabPanel, Tabs, Tab, TabPanels,TabList, Progress, ProgressLabel, Flex, HStack, Tooltip  } from '@chakra-ui/react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import LogoutModal from '../components/LogoutModal'
import { useDisclosure } from '@chakra-ui/react'
import GithubCorner from 'react-github-corner';
import { CgProfile, CgSoftwareDownload, CgTranscript } from 'react-icons/cg'
import { FaPhotoVideo } from 'react-icons/fa'
import { cleanClip } from '../components/clip-handlers/cleanClip';
import { extractAudioClip } from '../components/clip-handlers/extractAudioClip';
import * as stage from '../components/clip-handlers/stage-constants';
import * as ffmpegProcess from '../components/videoprocessing/ffmpegProcess';

import { ffmpegContext, UserContext } from '../components/context';

//import needed to get firebase initiated
import { firestore, auth } from '../components/firebase';

import { flattenedTranscript } from '../refTranscriptData/cxTranscripts1min'
import { parseTranscript } from '../components/utils'

export const AppContext = createContext()
export const FileContext = createContext()

const Index = () => {

  const onboarding = [{
    target: '',
    content: ''
  }]



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
  
  const ffmpeg = useContext(ffmpegContext);
  let user = auth.currentUser
  const [ fileUploads, setFileUploads ] = useState([])
  const videoStatus = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [audioUuid, setAudioUuid] = useState();
  const [cleanedClip, setCleanedClip] = useState();
  //TODO remove trasncript
  const [ transcription, setTranscription] = useState();
  const ffmpegRatio = useRef(0);
  const [ processStage, setProcessStage] = useState([]);
  const [ progress, setProgress ] = useState(0)
  const [ timeTaken, setTimeTaken] = useState([]);
  const [ audioAnalysisBegan, setAudioAnalysisBegan] = useState(false);
  const NORMS = {
    "Loading video"       : 5,
    "Extracting audio"    : 5, 
    "Extracted audio"     : 5, 
    "Uploading audio"     : 5,
    "Analysing audio"     : 5, 
    "Analysed audio"      : 25, 
    "Processing video"    : 5, 
    "Cleaning transcript" : 5,
    "Cutting video"       : 5, 
    "Speeding up pauses"  : 16,
    "Preparing to stitch" : 4,
    "Stitching video"     : 5,
    "Clearing memory"     : 9,
    "Completed"           : 1
  }

  const timeStampAtStage = (stage) => {
    const currTime = Math.round(+new Date());
    // can be combined
    timeTaken.push(currTime);
    processStage.push(stage);
    setTimeTaken(timeTaken);
    setProcessStage(processStage);
    setProgress(progress + +NORMS[stage])
  };

  const load = async () => {
    if (!ffmpeg.isLoaded()) {
      console.log('ffmpeg was not loaded');
      try {
        await ffmpeg.load().then(() => setReady(true));
        await ffmpeg.setProgress((p) => {
          console.log('ratio', p);
          // setProgressRatio(p.ratio);
          ffmpegRatio.current = p.ratio;
        });
      } catch (e) {
        console.log('error loading ffmpeg', e);
        location.reload();
      }
    } else {
      console.log('ffmpeg loaded');
      setReady(true);
    }
  };

  useEffect(() => {
    load();
  }, []); // only called once

  useEffect(() => {
    //check auth for user
    if (user !== null && audioUuid !== null && audioAnalysisBegan) {
      const userUid = user.uid;
      console.log('userUid', userUid);
      //listen for transcript
      const unsub = onSnapshot(
        doc(firestore, 'users', userUid, 'transcript', audioUuid),
        (doc) => {
          if (doc.data() !== undefined && 'response' in doc.data()) {
            console.log('currentdata:', JSON.parse(doc.data().response));
            setTranscription(JSON.parse(doc.data().response).result);
            timeStampAtStage(stage.ANALYSED_AUDIO);
          }
        }
      );

      // deleting transcript takes time
      const deleteStatus = deleteDoc(
        doc(firestore, 'users', userUid, 'transcript', audioUuid)
      );
    } else {
      console.log('no user logged in, please log in');
    }
  }, [audioUuid]);

  const onBrowseBtnClick = () => {
    inputFile.current.click();
  };

  const onDownloadClick = () => {
    downloadAnchor.current.click();
  };

  const calcTimeTakenPerStage = () => {
    const durations = [];
    for (let i = 1; i < timeTaken.length; i += 1) {
      durations.push(timeTaken[i] - timeTaken[i - 1]);
    }
    return durations;
  };
  const [ transcriptList, setTranscriptList] = useState()
  const [ optimizedList, setOptimizedList ] = useState()
  const [ remainingPercentage, setRemainingPercentage] = useState(100)

  useEffect(()=> {
    parseTranscript( flattenedTranscript, setTranscriptList, setOptimizedList, remainingPercentage, setRemainingPercentage)
  }, [] )


  return (
    <AppContext.Provider value= {{ videoSettings }}>
      <FileContext.Provider value = {{ fileUploads, setFileUploads, videoStatus }}>
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
      <LogoutModal isOpen={isOpen} onClose={onClose}/>
      </FileContext.Provider>
    </AppContext.Provider>
  )
}

export default Index
