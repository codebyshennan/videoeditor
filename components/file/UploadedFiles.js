import { useState, useEffect, useRef, useContext} from 'react'
import { Flex, Container, Box } from '@chakra-ui/react'
import FileCard from './FileCard'

const UploadedFiles = () => {

  return (
    <Flex>
      <FileCard />
    </Flex>
  )
}

export default UploadedFiles
