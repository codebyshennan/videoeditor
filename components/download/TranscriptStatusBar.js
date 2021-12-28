import { useEffect, useContext } from 'react'
import { parseTranscript } from '../utils'
import { Flex, Box, HStack, Tooltip } from '@chakra-ui/react'
import { TranscriptionContext } from '../context'

const TranscriptStatusBar = () => {
  
  const { transcription, 
    mergedTranscript, setMergedTranscript,
    cleanedTranscript, setCleanedTranscript,
    transcriptList, setTranscriptList, 
    optimizedList, setOptimizedList, 
    remainingPercentage, setRemainingPercentage } = useContext(TranscriptionContext)
   
  // on transcript available
  useEffect(()=> {
    parseTranscript( mergedTranscript, setTranscriptList, setOptimizedList, remainingPercentage, setRemainingPercentage)
  }, [ mergedTranscript ] )

  return (
    <Flex>

      <Box>
        <HStack width="100%" border="0.5px solid" spacing={0}>
          { transcriptList }
        </HStack>
      </Box>

      <Box>
        <HStack width="100vw" border="0.5px solid" spacing={0}>
          { optimizedList ? (
            <>
              { optimizedList }
              <Tooltip
                hasArrow
                label={`Potential Time Savings = ${Math.abs(
                  Math.round(remainingPercentage)
                )}% | ${Math.abs(
                  Math.round(
                    (remainingPercentage / 100) * transcriptDuration
                  )
                )}s`}
              >
                <Flex
                  width={`${Math.abs(remainingPercentage)}%`}
                  height="20px"
                  bgColor="white"
                >
                  {' '}
                </Flex>
              </Tooltip>
            </>
          ) : null}
        </HStack>
      </Box>

    </Flex>
  )
}

export default TranscriptStatusBar
