// import { ApolloProvider } from '@apollo/client'
// import { useApollo } from '../../apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { UserContext, ffmpegContext, FileContext, AppContext, ProcessingContext, TranscriptionContext } from '../components/context'
import { useUserData } from '../components/hooks/hooks'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Theme from './theme'
import Footer from '../components/Footer'
import { useState, useRef, useContext } from 'react'
import { flattenedTranscript } from '../refTranscriptData/cxTranscripts1min'
import { cleanClip } from '../components/clip-handlers/cleanClip';
import { extractAudioClip } from '../components/clip-handlers/extractAudioClip';
import * as stage from '../components/clip-handlers/stage-constants';
import NORMS from '../components/norms'
import * as ffmpegProcess from '../components/videoprocessing/ffmpegProcess';

const ffmpeg = createFFmpeg({
  corePath: '/ffmpeg-core/ffmpeg-core.js',
  // log: true,
  // logger: ({message})=> console.log(message),
  // progress: (p) => console.log(p)
});

const App = ({ Component, pageProps }) => {
  // const apolloClient = useApollo(pageProps.initialApolloState)

  // ======== AUTH & USER SETTINGS ========
  const userData = useUserData()

  // ======== FFMPEG & VIDEO SETTINGS ========
  const videoSettingsRef = useRef()
  const videoStatusRef = useRef()
  const ffmpegRatio = useRef(0);
  videoSettingsRef.current = {
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

  const [ ffmpegReady, setffmpegReady ] = useState(false);
  const [ uploadedVideo, setUploadedVideo ] = useState();
  const [ audioUuid, setAudioUuid ] = useState();
  
  // ======== PROCESSING STATES ========
  const [ cleanedClip, setCleanedClip ] = useState();
  const [ processStage, setProcessStage ] = useState([])
  const [ progress, setProgress ] = useState(0)
  const [ timeTaken, setTimeTaken ] = useState([])
  const [ audioAnalysisBegan, setAudioAnalysisBegan ] = useState(false)


  // ======== TRANSCRIPTION STATES ========
  const [ transcription, setTranscription ] = useState()
  const [ mergedTranscript, setMergedTranscript] = useState();
  const [ cleanedTranscript, setCleanedTranscript] = useState();
  const [ transcriptList, setTranscriptList] = useState()
  const [ optimizedList, setOptimizedList ] = useState()
  const [ remainingPercentage, setRemainingPercentage] = useState(100)

  export const timeStampAtStage = (stage) => {
    const currTime = Math.round(+new Date());
    // can be combined
    timeTaken.push(currTime);
    processStage.push(stage);
    setTimeTaken(timeTaken);
    setProcessStage(processStage);
    setProgress(progress + +NORMS[stage])
  };

  
  const calcTimeTakenPerStage = () => {
    const durations = [];
    for (let i = 1; i < timeTaken.length; i += 1) {
      durations.push(timeTaken[i] - timeTaken[i - 1]);
    }
    return durations;
  };

  // initialize ffmpeg
  useEffect( async () => {
    if (!ffmpeg.isLoaded()) {
      console.log('ffmpeg was not loaded');
      try {
        await ffmpeg.load().then(() => setffmpegReady(true));
        ffmpeg.setProgress((p) => {
          console.log('ratio', p);
          ffmpegRatio.current = p.ratio;
        });
      } catch (e) {
        console.log('error loading ffmpeg', e);
        location.reload();
      }
    } else {
      console.log('ffmpeg loaded');
      setffmpegReady(true);
    }
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
  }, [ audioUuid ]);

  return (
    // <ApolloProvider client={apolloClient}>
      <ChakraProvider theme= {{Theme}} >
        <UserContext.Provider value = {{ userData }} >
          <ffmpegContext.Provider 
            value = {{ 
              ffmpeg, 
              ffmpegReady, setffmpegReady, 
              audioUuid, setAudioUuid 
            }} 
          >
            <AppContext.Provider 
              value = {{ videoSettingsRef }}>
              <FileContext.Provider 
                value = {{ uploadedVideo, setUploadedVideo, videoStatusRef }}>
                <ProcessingContext.Provider 
                  value= {{ 
                    cleanedClip, setCleanedClip, 
                    processStage, setProcessStage, 
                    progress, setProgress, 
                    timeTaken, setTimeTaken, 
                    audioAnalysisBegan, setAudioAnalysisBegan}}>
                  <TranscriptionContext.Provider 
                    value= {{
                      transcription, setTranscription,
                      mergedTranscript, setMergedTranscript,
                      cleanedTranscript, setCleanedTranscript,
                      transcriptList, setTranscriptList,
                      optimizedList, setOptimizedList,
                      remainingPercentage, setRemainingPercentage
                    }}>
                    <DndProvider backend={ HTML5Backend }>
                      <Component {...pageProps} />
                      <Footer />
                    </DndProvider>
                  </TranscriptionContext.Provider>
                </ProcessingContext.Provider>
              </FileContext.Provider>
            </AppContext.Provider>
          </ffmpegContext.Provider>
        </UserContext.Provider>
      </ChakraProvider>
    // </ApolloProvider>
  )
}

export default App

