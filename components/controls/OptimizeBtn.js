import { useContext } from 'react'
import { Button } from '@chakra-ui/react'
import { ffmpegContext, FileContext, ProcessingContext, TranscriptionContext } from '../context'
import { cleanClip } from '../clip-handlers/cleanClip'
import { timeStampAtStage, PROCESSEDAUDIOFN } from '../../pages/_app'

const OptimizeBtn = () => {
  const { setCleanedClip, processStage } = useContext(ProcessingContext)
  const { ffmpeg } = useContext(ffmpegContext)
  const { uploadedVideo } = useContext(FileContext)
  const { transcription, setMergedTranscript, setCleanedTranscript, setTranscriptDuration } = useContext(TranscriptionContext)

  return (
    <Button
        variant="ghost"
        onClick={() => {
          cleanClip(
            transcription,
            ffmpeg,
            uploadedVideo,
            PROCESSEDAUDIOFN,
            setCleanedClip,
            timeStampAtStage,
            setMergedTranscript,
            setCleanedTranscript,
            setTranscriptDuration
          );
        }}
        isDisabled={ (processStage.length < 6) || (!transcription && !uploadedVideo) }
      >
        Optimize Video
      </Button>
  )
}

export default OptimizeBtn
