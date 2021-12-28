import React, { useContext, useState} from 'react'
import { Flex, Progress, ProgressLabel, Container } from '@chakra/react' 

const ProgressBar = () => {
  return (
    <Flex direction="column" justify="center" align="center">
      { (progress > 0) && (
      <>
      <Progress
        height="20px"
        w="90vw"
        colorScheme = { progress < 100 ? 'blue': 'green'}
        hasStripe = {progress < 100}
        isAnimated = { progress < 100}
        value={ progress }
      >
        <ProgressLabel fontSize="1rem" color="black">
          {`${progress}%`}
        </ProgressLabel>
      </Progress>
      <Container textAlign="center">
        {
          processStage.length > 0 &&
            timeTaken.length > 0 &&
            <strong> {`${processStage.at(-1)} | Time taken: ${(
              (timeTaken.at(-1) - timeTaken.at(0)) /
              1000 /
              60
            ).toFixed(2)} min`} </strong>
          // && processStage.map((stage, i) => (
          //   <span key={i}>
          //     {stage}: {calcTimeTakenPerStage()[i]}
          //   </span>
          // ))
        }
      </Container>
      </>
      )}
  </Flex> 
  )
}

export default ProgressBar
