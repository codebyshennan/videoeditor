import { Tooltip, Flex } from '@chakra-ui/react'

export const fileSizeInMb = (file) => {
    const fileSize = (file.size / (1024 * 1024)).toFixed(4);
    return fileSize;
  };

export const getFileExtension = (file) => {
    const re = /(?:\.([^.]+))?$/;
    const fileExt = re.exec(file.name)[1];
    return fileExt;
  };

export const parseTranscript = (
  transcripts,
  setTranscriptList,
  setOptimizedList,
  remainingPercentage,
  setRemainingPercentage,
  setTranscriptDuration
  ) => {

    const transcriptDuration = transcripts[transcripts.length - 1].endTime
    setTranscriptDuration(transcriptDuration);

    const colorMap = {
      "WORD": 'green',
      "%PAUSE": 'yellow',
      "%HESITATION": "orange",
      "BREAK": 'gray'
    }
      
    let memoPrevEnd = 0

    const tList = transcripts.map( t => {
      let percentage, tType, duration, intermediate
      if(memoPrevEnd - t.startTime != 0) {
        // implies there's a break
        duration = t.startTime - memoPrevEnd
        percentage = duration / transcriptDuration * 100
        tType = "[ BREAK ]"

        intermediate = (
          <Tooltip hasArrow label={`${tType}`}>
            <Flex height="20px" width={`${percentage}%`} bgColor={ colorMap["BREAK"]}> </Flex>
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

    setTranscriptList(tList)
      
    let memoPrevEnd2 = 0

    const oList = transcripts.map( t => {
      let percentage, tType, duration, intermediate
      if(memoPrevEnd2 - t.startTime != 0) {
        // implies there's a break
        duration = t.startTime - memoPrevEnd2
        if(duration > 0.8){
          duration = 0.8
        }
        percentage = duration / transcriptDuration * 100
        setRemainingPercentage(remainingPercentage - percentage)
        
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

      setRemainingPercentage(remainingPercentage - percentage)
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

    setOptimizedList(oList)
  }

export const calcTimeTakenPerStage = (timeTaken) => {
  const durations = [];
  for (let i = 1; i < timeTaken.length; i += 1) {
    durations.push(timeTaken[i] - timeTaken[i - 1]);
  }
  return durations;
};