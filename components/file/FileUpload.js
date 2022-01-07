
import { useCallback, useMemo, useRef, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { AppContext, FileContext } from '../context';
import FileCard from './FileCard'
import { v4 as uuidv4} from 'uuid'
import { useToast } from '@chakra-ui/react'
import { fileSizeInMb, getFileExtension } from '../utils';


const styles = {
  baseStyle : {
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
  }, 
  activeStyle : {
    borderColor: '#2196f3'
  },
  acceptStyle : {
    borderColor: '#00e676'
  },
  rejectStyle : {
    borderColor: '#ff1744'
  }
}

const FileUpload = () => {
  const toast = useToast()
  const { uploadedVideo, setUploadedVideo } = useContext(FileContext)
  const { videoSettings } = useContext(AppContext)
  const thumbnailContainer = useRef()
  const waveFormContainer = useRef()
  // let user = auth.currentUser
  const AUDIOFILENAME = 'test.aac';
  const FINALAUDIO = 'finalAudio.aac';
  const PROCESSEDAUDIOFN = 'finalcut.mp4';

  // callback is just to get a snapshot of the video file
  const onDrop = useCallback( acceptedFiles => {
    //do something with the files
    acceptedFiles.forEach( file => {

      videoSettings.current = {
          ...videoSettings.current,
          videos: [...videoSettings.current.videos, file],
          audioUuid: uuidv4()
        }
      
      const reader = new FileReader()
      
      reader.onabort = () => {
        console.log('File reading was aborted');
      }

      reader.onerror = () => {
        console.log('File reading has failed');
      }

      reader.onload = () => {
        let videoBlob = new Blob([reader.result], { type: file.type })
        let url = URL.createObjectURL(videoBlob)
      
        // save video settings upon reading
        videoSettings.current = {
          ...videoSettings.current,
          videos: [...videoSettings.current.videos, file],
          audioUuid: uuidv4()
        }

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
            thumbnail.width = video.videoWidth * 0.3
            thumbnail.height = video.videoHeight * 0.3
            thumbnail.src = image
            thumbnailContainer.current.appendChild(thumbnail)
            toast({
              position: 'top',
              title: 'Video Loaded.',
              description: "The video file is ready to be processed.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
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
      setUploadedVideo([...uploadedVideo, file])

    })
  }, [])
  
  const fileValidator = (file)=> {
    const fileSize = fileSizeInMb(file)
    if(fileSize > 100 && getFileExtension(file) !== 'mp4'){
      toast({
              position: 'top',
              title: 'File Limit Exceeded.',
              description: `${file.name} of ${fileSize}MB exceeds the 100MB limit.`,
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
      }
    }


  const { fileRejections, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone( { onDrop, accept: '.mp4', validator: fileValidator } )

  const style = useMemo(() => ({
    ...styles.baseStyle,
    ...(isDragActive ? styles.activeStyle : {}),
    ...(isDragAccept ? styles.acceptStyle : {}),
    ...(isDragReject ? styles.rejectStyle : {})
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
      <div ref={waveFormContainer} ></div>
    </div>
  )

}

export default FileUpload