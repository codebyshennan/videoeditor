import { Slider, SliderFilledTrack, SliderTrack, SliderThumb, Icon } from "@chakra-ui/react"
import { Box, Flex, Container, Stack, Button } from "@chakra-ui/react"
import DisplayHelp from "../video/DisplayHelp"
import { FaPlay, FaCut, FaPause, FaFastBackward, FaFastForward, FaInfoCircle, FaSun, FaMoon, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { MdOutlinePanTool } from "react-icons/md"
import { SiSpeedtest } from 'react-icons/si'
import { useDisclosure } from "@chakra-ui/react"
import { AppContext } from "../../../pages/main"
import { useColorMode, useColorModeValue } from '@chakra-ui/react'

const PlayerControls = ({ videoContainerRef }) => {

    const { videoSettings } = useContext(AppContext)
    const [ refresh, setRefresh] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    // for toggling light/dark modes
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue('white', 'gray.800')

    const togglePlay = (ev) => {
      const playStatus = videoSettings.current.isPlaying

      if(playStatus && 
        videoContainerRef.current.currentTime > 0 && 
        !videoContainerRef.current.paused && 
        !videoContainerRef.current.ended) {
          videoContainerRef.current.pause()
          playStatus = !playStatus
          setRefresh(!refresh)
      } else {
        videoContainerRef.current.play()
        playStatus = !playStatus
        setRefresh(!refresh)
      }

      videoSettings.current = {
        ...videoSettings.current,
        isPlaying: playStatus
      }
    }

    const toggleSpeed = (ev)=> {
      videoSettings.current = {
        ...videoSettings.current,
        speedUp: !videoSettings.current.speedUp
      }
      setRefresh(!refresh)

    }

    const toggleMute = (ev) => {
      if(videoContainerRef.current) {
        videoContainerRef.current.muted = !videoContainerRef.current.muted
      } 
      videoSettings.current = {
        ...videoSettings.current,
        isMuted: !videoSettings.current.isMuted
      }
      setRefresh(!refresh)
    }

    const toggleSlice = (ev) => {
      videoSettings.current = {
        ...videoSettings.current,
        isSlice: !videoSettings.current.isSlice,
        isPan: false
      }
      setRefresh(!refresh)
    }

    const togglePan = (ev) => {
      videoSettings.current = {
        ...videoSettings.current,
        isPan: !videoSettings.current.isPan,
        isSlice: false,
      }
      setRefresh(!refresh)
    }

  return (
    <Stack
      marginX={2}
      direction="row"
      h="50px"
      w="100%"
      spacing={4}
      alignItems="center"
      justifyContent="space-between"
    >
      
      <Stack
        direction="row"
      >
        <Button 
          leftIcon={<Icon as={SiSpeedtest}
          variant= { videoSettings.current.speedUp ? "solid" : "outline"}
          onClick={ toggleSpeed }
          />}>
        2x
        </Button>
        <Button 
          leftIcon={<Icon as={FaCut}/>} 
          variant={ videoSettings.current.isSlice ? "solid" : "outline"}
          onClick={toggleSlice}
          >
          Slice
        </Button>
        <Button 
          leftIcon={<Icon as={MdOutlinePanTool} />} 
          variant= { videoSettings.current.isPan ? "solid" : "outline"}
          onClick={togglePan}>
          Pan
        </Button>
      </Stack>
      <Stack
        direction="row"
      >
          <Button 
          leftIcon={<Icon as={FaFastBackward}/> } 
          variant="outline" />

          { videoSettings.current.isPlaying ? 
            <Button
              onClick={ togglePlay } 
              variant="outline"
            > 
              <Icon as={FaPause} />
            </Button> :
            <Button 
              onClick={ togglePlay }
              variant="outline"
            > 
              <Icon as={FaPlay} />
            </Button> 
          }

          <Button 
            leftIcon={<Icon as={FaFastForward} /> } 
            variant="outline" /> 
          
          { videoSettings.current.isMuted ? 
            <Button
              leftIcon={<Icon as={FaVolumeUp} /> }
              onClick={ toggleMute } 
              variant="outline"
            /> :
            <Button 
              leftIcon={<Icon as={FaVolumeMute} /> }
              onClick={ toggleMute }
              variant="outline"
            /> 
          }


      </Stack>
      <Stack
      direction = "row"
      >
        <Button leftIcon={ colorMode == 'dark' ? 
          <Icon as={FaSun} onClick={toggleColorMode} /> : 
          <Icon as={FaMoon} onClick={toggleColorMode}/> } variant="outline"> Mode </Button>
        <Button leftIcon={<Icon as={FaInfoCircle} />} variant="outline" onClick={onOpen}> Help </Button>
        <DisplayHelp isOpen={isOpen} onClose={onClose} />
      </Stack>
    </Stack>
  )
}

export default PlayerControls
