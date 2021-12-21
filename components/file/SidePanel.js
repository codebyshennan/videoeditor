import FileUpload from './FileUpload'
import { Stack } from '@chakra-ui/react'

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