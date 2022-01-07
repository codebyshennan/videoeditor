import { Flex } from '@chakra-ui/react'
import { AppContext } from '../../context'
import { useContext, useState, useRef, useEffect } from 'react'



const VideoSeq = ({ videoSequences, setVideoSequences }) => {

  const { videoSettingsRef } = useContext(AppContext)

  const splitVideoSequences = (event) => {

    const videoWidth = event.target.getBoundingClientRect().width
    const offset = event.target.getBoundingClientRect().left
    const mousePos = event.clientX
    let ratio = ( (mousePos - offset) / videoWidth ) * 100
    let index = event.target.id
    // split the id 
    let newVideoSequences = [...videoSequences]
    newVideoSequences.splice(index,1)

    // insert the later half first
    newVideoSequences.splice(index, 0, {
      start: (videoSequences[index].end - videoSequences[index].start) * ratio/100 + videoSequences[index].start,
      end: videoSequences[index].end,
      duration: videoSequences[index].duration * (100 - ratio)/100
    })

    // insert the front half
    newVideoSequences.splice(index, 0, {
      start: videoSequences[index].start,
      end: (videoSequences[index].end - videoSequences[index].start) * ratio/100 + videoSequences[index].start,
      duration: videoSequences[index].duration * ratio/100
    })

    setVideoSequences(newVideoSequences)
  }


  const displayVideoSequences = videoSequences.map( (video, index) => {
    return (
      <Flex 
        key={index}
        id={index}
        padding={"2px"}
        border={"2px solid"}
        width={video.duration}
        onClick={splitVideoSequences}
      >
        { video.start} & {video.end} {video.duration}
      </Flex>
    )
  })


  return (
    <Flex>
      { displayVideoSequences }
    </Flex>
    
  )
}

export default VideoSeq
