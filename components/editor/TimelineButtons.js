import { VStack, Icon, Flex, StackDivider } from '@chakra-ui/react'
import React from 'react'
import { MdVideocam, MdOutlineTextFields, MdOutlineAudiotrack } from 'react-icons/md'


const TimelineButtons = () => {


  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      marginY={3}
      h="90%"
      align='stretch'
      borderRight="0.5px solid"
      borderColor="gray.200"
    >
      <Flex minWidth="50px" height="33%" align="center" justify="center">
          <Icon as={MdVideocam} />
      </Flex>

      <Flex minWidth="50px" height="33%" align="center" justify="center">
          <Icon as={MdOutlineAudiotrack} />
      </Flex>

      <Flex minWidth="50px" height="33%" align="center" justify="center">
        <Icon as={MdOutlineTextFields} />
      </Flex>
      
    </VStack>
  )
}

export default TimelineButtons
