
import AudioTimeline from './audio/AudioTimeline'
import TextTimeline from './text/TextTimeline'
import VideoTimeline from './video/VideoTimeline'
import { useState, useContext, useEffect, useRef } from 'react'
import { Flex, VStack, StackDivider } from '@chakra-ui/react'

const Timeline = () => {

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      marginY={3}
      h="90%"
      w="100%"
      align='stretch'
      >
      <Flex width="100%" height="33%" align="center" justify="start">
        <VideoTimeline />
      </Flex>
      <Flex width="100%" height="33%" align="center" justify="start">
        <AudioTimeline />
      </Flex>
      <Flex width="100%" height="33%" align="center" justify="start">
        <TextTimeline />
      </Flex>
    </VStack>
  )
}

export default Timeline

