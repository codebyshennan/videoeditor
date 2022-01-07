import { MdOutlineAudiotrack } from 'react-icons/md'
import { Box, Container, Flex, Icon, Text, HStack, Img } from '@chakra-ui/react'
import { useState, useEffect, useContext, useRef } from 'react'
import { AppContext } from '../../context'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import transcript from '../../../transcript'

// https://github.com/beforesemicolon/BFS-Projects/blob/audio-player-tag/audio-player/audio-player.js

const AudioTimeline = () => {
  const { videoSettingsRef } = useContext(AppContext)

  const initializeAudio = (audio) => {
    const audioCtx = new AudioContext()
    const gainNode = audioCtx.createGain()
    const analyserNode = audioCtx.createAnalyser()
    analyserNode.fftSize = 2048
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteFrequencyData(dataArray)
    const track = audioCtx.createMediaElementSource(audio)

    track
      .connect(gainNode)
      .connect(analyserNode)
      .connect(audioCtx.destination)
    
    changeVolume()
  }


  const updateFrequency = () => {
    
  }
  
  return (
    <HStack spacing={0}>
      <Flex bg="tomato" borderRadius={2} width="400px" borderColor="gray.400" border={"1px solid"}>.</Flex>
      <Flex bg="orange" borderRadius={2} width="200px" borderColor="gray.400" border={"1px solid"}>.</Flex>
      <Flex bg="green" borderRadius={2} width="550px" borderColor="gray.400" border={"1px solid"}>.</Flex>
      <Flex bg="yellow" borderRadius={2} width="100px" borderColor="gray.400" border={"1px solid"}>.</Flex>
    </HStack>
  )
}

export default AudioTimeline
