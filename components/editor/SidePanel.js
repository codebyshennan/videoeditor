import FileUpload from '../../components/editor/FileUpload'
import { Stack } from '@chakra-ui/react'

const SidePanel = () => {
  return (
    <Stack
      direction="column"
    >
      <FileUpload videoSettings={videoSettings} setVideoSettings={setVideoSettings}/>
    </Stack>
  )
}

export default SidePanel