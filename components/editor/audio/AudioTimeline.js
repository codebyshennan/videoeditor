import { MdOutlineAudiotrack } from 'react-icons/md'
import { Box, Container, Flex, Icon, Text, HStack, Img } from '@chakra-ui/react'
import { useState, useEffect, useContext, useRef } from 'react'
import { AppContext } from '../../../pages/main'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import transcript from '../../../transcript'

const ffmpeg = createFFmpeg({
  corePath:'/ffmpeg-core/ffmpeg-core.js',
  log: true
})

const AudioTimeline = () => {
  const { videoSettings } = useContext(AppContext)
  
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
