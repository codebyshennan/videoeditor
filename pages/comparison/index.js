import React, { useState } from 'react'
import transcripts from '../../transcript'
import { Flex, Box, HStack, Tooltip, Container } from '@chakra-ui/react'

const index = () => {

  const colorMap = {
    "WORD": 'green',
    "%PAUSE": 'yellow',
    "%HESITATION": "orange",
    "BREAK": 'gray'
  }

  const transcriptDuration = transcripts[transcripts.length - 1].endTime

  let memoPrevEnd = 0

  const transcriptList = transcripts.map( t => {
    let percentage, tType, duration, intermediate
    if(memoPrevEnd - t.startTime != 0) {
      // implies there's a break
      duration = t.startTime - memoPrevEnd
      percentage = duration / transcriptDuration * 100
      tType = "[ BREAK ]"

      intermediate = (
        <Tooltip hasArrow label={`${tType}`}>
          <Flex height="20px" width={`${percentage}%`} bgColor={colorMap["BREAK"]}> </Flex>
        </Tooltip>
      )

      memoPrevEnd = t.endTime
    } 

      duration = t.endTime - t.startTime
      percentage = duration / transcriptDuration * 100

      switch(t.type){
        case "%HESITATION":
          tType = "[ HESITATION ]"
          break
        case "%PAUSE":
          tType = "[ PAUSE ]"
          break
        case "WORD":
          tType = t.value
          break
        default:
          tType = `[ ${t.type.substring(1,)} ]`
          break
      }
    

      return (
        <>
          { intermediate }
          <Tooltip hasArrow label={tType}>
            <Flex height="20px" width={`${percentage}%`} bgColor={colorMap[t.type]}> </Flex>
          </Tooltip>
        </>
      )
    })
  
  let totalPercentage = 100
  let memoPrevEnd2 = 0

  const optimizedList = transcripts.map( t => {
    let percentage, tType, duration, intermediate
    if(memoPrevEnd2 - t.startTime != 0) {
      // implies there's a break
      duration = t.startTime - memoPrevEnd2
      if(duration > 0.8){
        duration = 0.8
      }
      percentage = duration / transcriptDuration * 100
      totalPercentage -= +percentage
      
      tType = "[ BREAK ]"

      intermediate = (
        <Tooltip hasArrow label={`${tType}`}>
          <Flex height="20px" width={`${percentage}%`} bgColor={colorMap["BREAK"]}> </Flex>
        </Tooltip>
      )

      memoPrevEnd2 = t.endTime
    } 

    switch(t.type){
      case "%HESITATION":
        return (
          <>
            { intermediate }
          </>
        )
      case "%PAUSE":
        tType = "[ PAUSE ]"
        duration = t.endTime - t.startTime
        if(duration > 0.8){
          duration = 0.8
        }
        percentage = duration / transcriptDuration * 100
        break
      case "WORD":
        tType = t.value
        duration = t.endTime - t.startTime
        percentage = duration / transcriptDuration * 100
        break
      default:
        tType = `[ ${t.type.substring(1,)} ]`
        break
    }

    totalPercentage -= +percentage
    memoPrevEnd2 = t.endTime


    return (
      <>
        { intermediate }
        <Tooltip hasArrow label={tType}>
          <Flex height="20px" width={`${percentage}%`} bgColor={colorMap[t.type]}> </Flex>
        </Tooltip>
      </>
    )
  })

  console.log(totalPercentage)


  return (
    <>
      <HStack
        width="100%"
        height="20px"
        border="1px solid"
        spacing={0}
        bgColor="green"
      >
        <Container> { transcriptDuration } </Container>
      </HStack>

      <HStack
        width="100vw"
        border="1px solid"
        spacing={0}
      >
        { transcriptList}
      </HStack>

      <HStack
        width="100vw"
        border="1px solid"
        spacing={0}
      >
        { optimizedList }
        <Tooltip hasArrow label={`Time Savings = ${Math.round(totalPercentage)}% | ${ Math.round(totalPercentage / 100 * transcriptDuration)}s` } >
          <Flex width={`${totalPercentage}%`} height="20px" bgColor="white"> </Flex>
        </Tooltip>
      </HStack>
    </>
  )
}

export default index
