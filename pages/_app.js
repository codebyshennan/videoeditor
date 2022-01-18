// import { ApolloProvider } from '@apollo/client'
// import { useApollo } from '../../apollo/client'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { UserContext, ffmpegContext, FileContext, AppContext, ProcessingContext, TranscriptionContext } from '../components/context'
import { useUserData } from '../components/hooks/hooks'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Theme from '../components/theme'
import Footer from '../components/Footer'
import { useState, useRef, useEffect } from 'react'
import { flattenedTranscript } from '../refTranscriptData/cxTranscripts1min'
import * as stage from '../components/clip-handlers/stage-constants';
import NORMS from '../components/norms'

const ffmpeg = createFFmpeg({
  corePath: '/ffmpeg-core/ffmpeg-core.js',
  // log: true,
  // logger: ({message})=> console.log(message),
  // progress: (p) => console.log(p)
});

export const FINALAUDIO = 'finalAudio.aac';
export const PROCESSEDAUDIOFN = 'finalcut.mp4';
export const WAVEFORM = 'waveform.png'

let user = {}

const App = ({ Component, pageProps }) => {
  // const apolloClient = useApollo(pageProps.initialApolloState)

  // ======== AUTH & USER SETTINGS ========
  const userData = useUserData()

  // ======== FFMPEG/VIDEO&AUDIO SETTINGS ========
  const videoSettingsRef = useRef()
  const videoStatusRef = useRef()
  const ffmpegRatio = useRef(0);
  videoSettingsRef.current = {
        initialized: false,
        barWidth: 3,
        barGap: 1,
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
        volume: 0.4,
        audio: "",
        audioState: {},
        audioUuid: [],
        processRatio: 1,
        processStage: [],
        timeTaken: [],
        ffmpegReady: false,
        transcription: []
      }

  const [ ffmpegReady, setffmpegReady ] = useState(false)
  const [ uploadedVideo, setUploadedVideo ] = useState([])
  const [ strippedAudio, setStrippedAudio ] = useState()
  const [ audioWaveForm, setAudioWaveform ] = useState()
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
  const [ transcriptDuration, setTranscriptDuration ] = useState()

  const timeStampAtStage = (stage) => {
    const currTime = Math.round(+new Date());
    // can be combined
    let combinedTime = [...timeTaken].push(currTime);
    let combinedStage = [...processStage].push(stage);
    setTimeTaken(combinedTime);
    setProcessStage(combinedStage);
    setProgress(progress => progress + +NORMS[stage])
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
        console.error('Error loading ffmpeg', e);
        location.reload();
      }
    } else {
      console.log('ffmpeg loaded');
      setffmpegReady(true);
    }
  }, []);

  // get audio waveform
  useEffect( async ()=> {
    if(ffmpegReady) { 
      ffmpeg.FS("writeFile", `${strippedAudio.name}`, await fetchFile(strippedAudio))
      await ffmpeg.run('-i', `${strippedAudio.name}`, '-filter_complex', 'showwavespic=s=640x120', '-frames:v', '1', WAVEFORM)
  
      const data = ffmpeg.FS('readfile', WAVEFORM)

      const waveFormBlob = new Blob([data.buffer], { type: 'image/png'})
      const waveFormUrl = URL.createObjectURL(waveFormBlob)
      setAudioWaveform(waveFormUrl)

      await ffmpegProcessd
        .removeFiles(ffmpeg, [WAVEFORM.split('.')[0]], 'png')
        .catch((e) => {
          console.error('error in removing file', e);
      });
    }

  }, [ strippedAudio ])

  useEffect(() => {
    //check auth for user
    if (user !== null && audioUuid !== null && audioAnalysisBegan) {
      const userUid = user.uid;
      console.log('userUid', userUid);
      //listen for transcript
      const unsub = onSnapshot(
        doc(firestore, 'users', userUid, 'transcript', audioUuid),
        (doc) => {
          if (doc.data() !== undefined && 'response' in doc.data()) {merg
            console.log('currentdata:', JSON.parse(doc.data().response));
            const { result } = JSON.parse(doc.data().response);
            setTranscription(result);
            timeStampAtStage(stage.ANALYSED_AUDIO);
            const { results } = result;
            const lastResult = results[results.length - 1];
            const lastResultTimeStamps = lastResult.alternatives[0].timestamps;
            const lastTime =
              lastResultTimeStamps[lastResultTimeStamps.length - 1][2];
            setTranscriptDuration(lastTime);
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
    <>
      <Head>
          <title> SuccinctCut </title>
          <meta name="description" content="Make your videos succinct" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme= {Theme} >
        <UserContext.Provider value = {{ userData }} >
          <ffmpegContext.Provider 
            value = {{ 
              ffmpeg, 
              ffmpegReady, setffmpegReady,
              audioWaveForm, setAudioWaveform,
              audioUuid, setAudioUuid,
              timeStampAtStage
            }} 
          >
            <AppContext.Provider 
              value = {{ videoSettingsRef }}>
              <FileContext.Provider 
                value = {{ videoStatusRef, 
                  uploadedVideo, setUploadedVideo, 
                  strippedAudio, setStrippedAudio
                  }}>
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
                      transcriptDuration, setTranscriptDuration,
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
    </>
    // </ApolloProvider>
  )
}

export default App

