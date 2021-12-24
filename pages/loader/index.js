import React, {useState, useEffect} from 'react'
import saveAsVTT from '../../components/vtt/SaveAsVTT'
import { flattenedTranscript } from "../../refTranscriptData/cxTranscripts5min"

const Convert = () => {
  const [ source, setSource ] = useState("")

  useEffect(()=> {
    const template = saveAsVTT(flattenedTranscript)
    const blob = new Blob([template])
    const fileURL = URL.createObjectURL(blob)
    setSource(fileURL)
  }, [])

  return (
    <div>
      <a href={source} > Download</a>
    </div>
  )
}

export default Convert
