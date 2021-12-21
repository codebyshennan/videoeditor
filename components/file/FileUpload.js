
import { useCallback, useMemo, useRef, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { AppContext } from '../../pages/main';
import FileCard from './FileCard'
import { v4 as uuidv4} from 'uuid'

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { cleanClip } from '../clip-handlers/cleanClip';
import { extractAudioClip } from '../clip-handlers/extractAudioClip';
import { optimiseAudioClip } from '../clip-handlers/optimiseAudioClip';

// import { Loader } from '../Loader';

// ============FIREBASE=============
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore';

// import { firestore, auth } from '../firebase'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


const FileUpload = () => {

  const { videoSettings, setVideoSettings } = useContext(AppContext)
  const thumbnailContainer = useRef()
  const ffmpegRatio = useRef()
  // let user = auth.currentUser
  const AUDIOFILENAME = 'test.aac';
  const FINALAUDIO = 'finalAudio.aac';
  const PROCESSEDAUDIOFN = 'finalcut.mp4';

  // callback is just to get a snapshot of the video file
  const onDrop = useCallback( acceptedFiles => {
    //do something with the files

    acceptedFiles.forEach( file => {
      const reader = new FileReader()
      
      reader.onabort = () => {
        console.log('File reading was aborted');
      }

      reader.onerror = () => {
        console.log('File reading has failed');
      }

      reader.onload = () => {
        let blob = new Blob([reader.result], { type: file.type })
        let url = URL.createObjectURL(blob)

        // save video settings upon reading
        setVideoSettings({
          video: [...video, file],
          audioUuid: uuidv4()
        })

        let video = document.createElement('video')
        let timeupdate = () => {
          if(snapImage()) {
            video.removeEventListener('timeupdate', timeupdate)
          }
        }

        video.addEventListener('loadeddata', () => {
          if(snapImage()) {
            video.removeEventListener('timeupdate', timeupdate)
          }
        })

        const snapImage = () => {
          let canvas = document.createElement('canvas')
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          canvas.getContext('2d').drawImage(video, 0, 0 , canvas.width, canvas.height)
          let image = canvas.toDataURL()
          let success = image.length > 100000
          if (success) {
            let thumbnail =  document.createElement('img')
            thumbnail.src = image
            thumbnailContainer.current.appendChild(thumbnail)
            URL.revokeObjectURL(url)
          }
          return success
        }

        video.addEventListener('timeupdate', timeupdate)
        video.preload = 'metadata'
        video.src = url
        video.muted = true
        video.playsInline = true
        video.play()
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  

  const timeStampAtStage = (stage) => {
    const currTime = Math.round(+ new Date())
    // can be combined
    setVideoSettings({
      timeTaken: [...videoSettings.timeTaken, currTime],
      processStage: [...videoSettings.processStage, stage]
    })
  }

  const load = async () => {
    if(!ffmpeg.isLoaded()) {
      console.log('ffmpeg was not loaded')
      try {
        await ffmpeg.load().then(()=> {
          setVideoSettings({
            ffmpegReady: true
          })
        })

        await ffmpeg.setProgress(p => {
          console.log(ratio, 'p')
          ffmpegRatio.current = p.ratio
        })
      } catch (e) {
        console.log("error loading ffmpeg", e)
        location.reload()
      }
    } else {
      console.log('ffmpeg loaded')
      setVideoSettings({
        ffmpegReady: true
      })
    }
  }
  
  // useEffect(()=> {
  //   // check auth fr user
  //   if (user != null && videoSettings.audioUuid !== null) {
  //     const userUid = user.uid
  //     console.log('userUid', userUid)

  //     // listen for transcript
  //     const ubsub = onSnapshot(
  //       doc(firestore, 'users', userUid, 'transcript', videoSettings.audioUuid),
  //       (doc) => {
  //         if(doc.data() != undefined && 'response' in doc.data()) {
  //           console.log('current data:', JSON.parse(doc.data().response))
  //           setVideoSettings({
  //             transcription: JSON.parse(doc.data().response).result
  //           })
  //         }
  //       }
  //     )

  //     // deleting transcription takes time
  //     const deleteStatus = deleteDoc(
  //       doc(firestore, 'users', userUid, 'transcript', videoSettings.audioUuid)
  //     )
  //     timeStampAtStage(stage.ANALYSED_AUDIO)
  //   } else {
  //     console.log('no user logged in, kindly log in')
  //   }
  // }, [videoSettings.audio])


  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone( { onDrop } )

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        {
          isDragActive ? 
            <p> Drop the files here ... </p> :
            <p> Drag and drop some files here or click to select files</p>
        }
        
      </div>
      <div ref={thumbnailContainer}>
        {/* <FileCard /> */}
      </div>
    </div>
  )

}

export default FileUpload