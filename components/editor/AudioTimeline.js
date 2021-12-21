import { MdOutlineAudiotrack } from 'react-icons/md'
import { Box, Container, Flex, Icon, Text, HStack } from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../pages/main'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({
  corePath:'/ffmpeg-core/ffmpeg-core.js',
  log: true
})

const AudioTimeline = () => {
  const { videoSettings, setVideoSettings } = useContext(AppContext)
  
  const getWaveForm = async(file) => {
    await ffmpeg.load()
    ffmpeg.FS("writeFile", `${file}`, await fetchFile(file))
    await ffmpeg.run('-i', `${file}`, '-filter_complex', 'showwavespic=s=640x120', '-frames:v', '1', 'output.png')
    // await fs.promises.writeFile('./output.png', ffmpeg.FS('readFile','./output.png'))
    process.exit(0)
  }

  const [ audioState, setAudioState ] = useState({
    audioBuffer: null,
    source: null,
    lastTime: 0,
    lastRefTime: 0,
    ready: false
  }) 

  const reader = new FileReader()
  const audioCtx = new AudioContext()

  reader.onload = ()=> {
    let buffer = reader.result
    audioCtx.decodeAudioData( buffer, (audBuffer) => {
      setAudioState({
        audioBuffer: audBuffer,
        ready: true
      })
    })
  }

  reader.readAsArrayBuffer(videoSettings.video[0])

  return (
    <HStack
      h="33%"
    >
      <Flex>
        <Box>
          <Icon as={MdOutlineAudiotrack} />
        </Box>
        <Container>
            <Text> test </Text>
        </Container>
      </Flex>
    </HStack>
  )
}

export default AudioTimeline
