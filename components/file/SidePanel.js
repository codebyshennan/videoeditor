import FileUpload from './FileUpload'
import { Stack } from '@chakra-ui/react'
import { AppContext } from '../../pages/main/index'
import { useState, useRef, useContext, useEffect } from 'react'


const SidePanel = () => {
  return (
    <Stack
      direction="column"
    >
      <FileUpload />
    </Stack>
  )
}

export default SidePanel