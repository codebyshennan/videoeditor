import React, { useState, useEffect } from 'react'

const ConvertToVTT = ( flattenedTranscript ) => {
  
  const [ VTT, setVTT ] = useState("")

  useEffect( ()=> {
    let template = "WEBVTT \n \n"

    flattenedTranscript.forEach( t => {

      if(t.type == "WORD") {
        let startTime, endTime, ms, min, sec
        ms = Math.floor(t.startTime % 1 *1000)
        sec = Math.floor(t.startTime % 60)
        min = Math.floor(t.startTime / 60)

        if(min < 10) {
          min = "".concat("0", min)
        }
        if(sec < 10) {
          sec = "".concat("0", sec)
        }

        startTime = "".concat(min, ":", sec,".", ms)

        ms = Math.floor(t.endTime % 1 *1000)
        sec = Math.floor(t.endTime % 60)
        min = Math.floor(t.endTime / 60)

        if(min < 10) {
          min = "".concat("0", min)
        }
        if(sec < 10) {
          sec = "".concat("0", sec)
        }

        endTime = "".concat(min, ":", sec,".", ms)
        template += "".concat(startTime, " --> ", endTime, "\n", t.value, "\n \n")
      }
    })

    const blob = new Blob([template])
    const fileURL = URL.createObjectURL(blob)
    setVTT(fileURL)
    URL.revokeObjectURL(fileURL)
  }, [flattenedTranscript])

  return VTT
  
}

export default ConvertToVTT
