import { Progress } from '@chakra-ui/react'
import StatusText from './StatusText'
import { useState, useContext } from 'react'
import {Flex} from '@chakra-ui/react'

const ProgressBar = () => {

  const [ loading, setLoading ] = useState(false)

  return (
    loading ? 
        <Progress hasStripe value={64} /> : 
        <StatusText />
  )
}

export default ProgressBar
