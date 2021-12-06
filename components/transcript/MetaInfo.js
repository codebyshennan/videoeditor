import { Box, Icon, Flex, Badge, Text, Stack, Spacer } from "@chakra-ui/react"
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { BsFilePerson } from 'react-icons/bs'

const tags = ['tag1', 'tag2','tag3']
const listTags = tags.map( (tag, index) => {
    return (
      <Badge variant='outline' key={index}> { tag } </Badge>
    )
})

const speakers = ['speaker1', 'speaker2']
const listSpeakers = speakers.map( (speaker, index) => {
    return (
      <Badge variant='solid' key={index}> 
        <Icon as={BsFilePerson} />
        {" "}
        { speaker }
      </Badge>
    )
})

const MetaInfo = () => {

  return (
    <Box>
      <Flex alignItems="center">
        <Box ml='6' >
          <Icon as={FaRegCalendarAlt} /> Sun, 5/12 10:02 PM
        </Box>
        <Box ml='6'>
          <Icon as={FaRegClock} /> 10:52
        </Box>
      </Flex>
      <Flex ml='6' py='2' direction="column">
        <Text fontWeight="bold">SUMMARY KEYWORDS</Text>
        <Stack direction="row"> 
          { listTags }
        </Stack>
      </Flex>
      <Flex ml='6' py='2' direction="column">
        <Text fontWeight="bold">SPEAKERS</Text>
        <Stack direction="row"> 
          { listSpeakers }
        </Stack>
      </Flex>
    </Box>
  )
}


export default MetaInfo


