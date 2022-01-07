import React, { useContext, useState, useEffect} from 'react'
import { Box, Tooltip, HStack, Container, Button } from '@chakra-ui/react'
import ExtractAudioBtn from '../controls/ExtractAudioBtn'
import OptimizeBtn from '../controls/OptimizeBtn'

const ProcessingControls = () => {
  
  //   const onDownloadClick = () => {
  //   downloadAnchor.current.click();
  // };



  return (
    <Container>

      <Button variant="ghost">
        Browse ...
      </Button>

      <ExtractAudioBtn />
      <OptimizeBtn />

      <Button
        variant="ghost"
        // onClick={onDownloadClick}
        // isDisabled={!cleanedClip}
      >
        Download
      </Button>
      <a
        // ref={downloadAnchor}
        // href={cleanedClip}
        download={'result.mp4'}
        style={{ display: 'none' }}
      >
        Click to download
      </a>
    </Container>
  )
}

export default ProcessingControls
