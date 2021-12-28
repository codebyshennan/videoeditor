import React, { useContext, useState, useEffect} from 'react'
import { Box, Tooltip, HStack } from '@chakra-ui/react'

const ProcessingControls = () => {
  


  return (
    <Container>

      <Button variant="ghost" onClick={onBrowseBtnClick}>
        Browse ...
      </Button>

      <Button
        variant="ghost"
        onClick={() => {
          extractAudioClip(
            ffmpeg,
            video,
            FINALAUDIO,
            setAudioUuid,
            timeStampAtStage
          );
          // setProcessStage([]);
          setTimeTaken([]);
          setAudioAnalysisBegan(true);
        }}
        isDisabled={!video || processStage.length > 0}
      >
        Analyse Video
      </Button>

      <Button
        variant="ghost"
        onClick={() => {
          cleanClip(
            transcription,
            ffmpeg,
            video,
            PROCESSEDAUDIOFN,
            setCleanedClip,
            timeStampAtStage,
            setMergedTranscript,
            setCleanedTranscript,
            setTranscriptDuration
          );
        }}
        isDisabled={ (processStage.length < 6) || (!transcription && !video) }
      >
        Clean Video
      </Button>

      <Button
        variant="ghost"
        onClick={onDownloadClick}
        isDisabled={!cleanedClip}
      >
        Download
      </Button>
      <a
        ref={downloadAnchor}
        href={cleanedClip}
        download={'result.mp4'}
        style={{ display: 'none' }}
      >
        Click to download
      </a>
    </Container>
  )
}

export default ProcessingControls
