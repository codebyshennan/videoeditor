import { useContext } from 'react'
import { extractAudioClip } from '../clip-handlers/extractAudioClip';
import { ProcessingContext, ffmpegContext, FileContext } from '../context';
import { timeStampAtStage } from '../../pages/_app'

const ExtractAudioBtn = () => {
  const { ffmpeg, setAudioUuid } = useContext(ffmpegContext)
  const { uploadedVideo } = useContext(FileContext)
  const { setAudioAnalysisBegan, setTimeTaken, processStage } = useContext(ProcessingContext)
  //also run webworker to extract audio waveform using ffmpeg

  return (
      <Button
        variant="ghost"
        onClick={() => {
          extractAudioClip(
            ffmpeg,
            uploadedVideo,
            FINALAUDIO,
            setAudioUuid,
            timeStampAtStage,
            setStrippedAudio
          );
          setTimeTaken([]);
          setAudioAnalysisBegan(true);
        }}
        isDisabled={!uploadedVideo || processStage.length > 0}
      >
        Extract Audio
      </Button>
  )
}

export default ExtractAudioBtn
