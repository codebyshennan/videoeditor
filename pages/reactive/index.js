//https://codesandbox.io/s/reactive-e8suc?file=/src/Video_Editor/VideoEditor.js


import Icon from '@chakra-ui/icon'
import { useState, useEffect, useRef } from 'react'
import { FaPlay, FaCamera, FaDownload, FaGripLinesVertical, FaPause, FaStepBackward, FaStepForward, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'


const VideoEditor = ({ props }) => {

  const [editorState, setEditorState] = useState({
    isMuted: false,
    timings: [],
    playing: false,
    currentGrabbed: {
      index: 0,
      type: 'none'
    },
    difference: 0.2,
    deletingGrabber: false,
    currentWarning: null,
    imageUrl: ""
  })

  const playVideo = useRef()
  const progressBar = useRef()
  const playbackBar = useRef()

  useEffect(()=> {

    //The timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
    playVideo.current.addEventListener("timeupdate", () => {
      let currentIndex = editorState.currentGrabbed.index
      let seek = ( playVideo.current.currentTime - editorState.timings[currentIndex].start) / playVideo.current.duration * 100
      progressBar.current.style.width = `${seek}%`

      if (playVideo.current.currentTime >= editorState.timings[editorState.timings.length - 1].end) {
        playVideo.current.pause()
        setEditorState({playing: false})
      } else if (playVideo.current.currentTime >= editorState.timings[currentIndex].end) {
        if((currentIndex + 1) < editorState.timings.length) {
          setEditorState({
            currentGrabbed: {
              index: currentIndex + 1,
              type: "start"
            }
          }, () => {
            progressBar.current.style.width = '0%'
            progressBar.current.style.left = `${editorState.timings[currentIndex+1].start / playVideo.current.duration * 100}%`
            playVideo.current.currentTime = editorState.timings[currentIndex+1].start
          })
        }
      }
    })

    window.addEventListener('keyup', (event)=> {
      if(event.key === " ") {
        play_pause()
      }
    })

    let time = editorState.timings
    playVideo.current.onloadedmetadata = () => {
      time.push({start: 0, end: playVideo.current.duration})
      setEditorState({timings: time}, ()=> {
        addActiveSegments()
      })
    }
  })

  const reset = () => {
    playVideo.current.pause()
    setEditorState({
      isMuted: false,
      timings: [{
        start: 0, 
        end: playVideo.current.duration
      }],
      playing: false,
      currentGrabbed: {
        index: 0,
        type: 'none'
      },
      difference: 0.2,
      deletingGrabber: false,
      currentWarning: null,
      imageUrl: ""
    }, () => {
      playVideo.current.currentTime = editorState.timings[0].start
      progressBar.current.style.left = `${editorState.timings[0].start / playVideo.current.duration * 100 }%`
      progressBar.current.style.width = "0%"
      addActiveSegments()
    })
  }

  const captureSnapshot = () => {
    let video = playVideo.current
    const canvas = document.createElement('canvas')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

    const dataURL = canvas.toDataURL()
    setEditorState({
      imageUrl: dataURL,
    })
  }

  const downloadSnapshot = () => {
    let link = document.createElement('a')
    link.href = editorState.imageUrl
    link.download = "thumbnail.png"
    link.click()
  }

  const skipPrevious = () => {
    if(editorState.playing) {
      playVideo.current.pause()
    }
    let previousIndex = ( editorState.currentGrabbed.index != 0 ) ? ( editorState.currentGrabbed.index - 1 ) : ( editorState.timings.length - 1 )
    setEditorState({
      currentGrabbed: {
        index: previousIndex,
        type: "start"
      },
      playing: false
    }, ()=>{
      progressBar.current.style.left = `${editorState.timings[previousIndex].start / playVideo.current.duration * 100}%`
      progressBar.current.style.width = "0%"
      playVideo.current.currentTime = editorState.timings[previousIndex].start
    })
  }

  const playPause = () => {
    if(editorState.playing){
      playVideo.current.pause()
    } else{
      if((playVideo.current.currentTime >= editorState.timings[editorState.timings.length - 1].end)) {
        playVideo.current.pause()
        setEditorState({
          playing: false,
          currentGrabbed: {
            index: 0,
            type: start
          }
        }, ()=> {
          playVideo.current.currentTime = editorState.timings[0].start
          progressBar.current.style.left = `${editorState.timings[0].start / playVideo.current.duration * 100}%`
        })
      }
      playVideo.current.play()
    }
    setEditorState({
      playing: !editorState.playing
    })
  }

  const skipNext = () => {
    if(editorState.playing){
      playVideo.current.pause()
    } 

    let nextIndex = (editorState.currentGrabbed.index != (editorState.timings.length - 1 )) ? (editorState.currentGrabbed.index +1) : 0
    setEditorState({
      currentGrabbed: {
        index: nextIndex,
        type: "start"
      },
      playing: false
    }, () => {
      progressBar.current.style.left = `${editorState.timings[nextIndex].start / playVideo.current.duration * 100}%`
      progressBar.current.style.width = '0%'
      playVideo.current.currentTime = editorState.timings[nextIndex].start
    })
  }

  const updateProgress = (event) => {
    let playbackRect = playbackBar.current.getBoundingClientRect()
    let seekTime = ((event.clientX - playbackRect.left) / playbackRect.width) * playVideo.current.duration
    playVideo.current.pause()

    // find where seekTime is in the segmenet
    let index = -1
    let counter = 0
    for (let times of editorState.timings) {
      if (seekTime >= times.start && seekTime <= times.end) {
        index = counter
      }
      counter +=1
    }
    if(index == -1){
      return
    }

    setEditorState({
      playing: false,
      currentGrabbed: {
        index: index,
        type: "start"
      }
    }, ()=> {
      progressBar.current.style.width = "0%"
      progressBar.current.style.left = `${editorState.timings[index].start / playVideo.current.duration * 100}%`
      playVideo.current.currentTime = seekTime
    })
  }

  const startGrabberMove = (event) => {
    playVideo.current.pause()
    let playBackRect = playbackBar.current.getBoundingClientRect()
    let seekRatio = ( event.clientX - playbackRect.left ) / playbackRect.width
    const index = editorState.currentGrabbed.index
    const type = editorState.currentGrabbed.type
    
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", startGrabberMove)
    })

    let time = editorState.timings
    let seek = playVideo.current.duration * seekRatio

    if ((type == "start") && (seek > ((index!=0) ? (time[index-1].end + editorState.difference+0.2) : 0)) && seek < time[index].end - editorState.difference) {
      progressBar.current.style.left = `${seekRatio * 100}%`
      playVideo.current.currentTime = seek
      time[index]["start"] = seek
      setEditorState({
        timings: true,
        playing: false
      })
    }
    else if ((type == "end") && (seek > time[index].start + editorState.difference) && (seek < (index!=(editorState.timings.length-1) ? time[index+1].start - editorState.difference - 0.2 : playVideo.current.duration))){
      progressBar.current.style.left = `${time[index].start / playVideo.current.duration * 100 }%`
      playVideo.current.currentTime = time[index].start
      time[index]["end"] = seek
      setEditorState({
        timings: time,
        playing: false
      })
    }
    progressBar.current.style.width = "0%"
  }

  const renderGrabbers = () => {
    return editorState.timings.map( (x, index) => {
      // start grabber
      <div key={"grabber_"+index}>
        <div className="grabber start" style={{ left: `${x.start / playVideo.current.location * 100}%`}} onMouseDown = {(event)=> {
          if(editorState.deletingGrabber){
            deleteGrabber(index)
          } else {
            setEditorState({
              currentGrabbed: {
                index: index,
                type: "start"
              }
            }, ()=> {
              window.addEventListener("mousemove", startGrabberMove)
            })
          }
        }} >
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="10" height="14" viewBox="0 0 10 14" xmlSpace="preserve">
            <path className="st0" d="M1 14L1 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C2 13.6 1.6 14 1 14zM5 14L5 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C6 13.6 5.6 14 5 14zM9 14L9 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C10 13.6 9.6 14 9 14z"/>
          </svg>
        </div>

        // end Grabber
        <div className = "grabber end" style={{left: `${x.end / playVideo.current.duration * 100 }%`}} onMouseDown={(event) => {
          if(editorState.deletingGrabber) {
            deleteGrabber(index)
          } else {
            setEditorState({
              currentGrabbed: {
                index: index,
                type: "end"
              }
            }, ()=> {
              window.addEventListener("mousemove", startGrabberMove)
            })
          }
        }}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="10" height="14" viewBox="0 0 10 14" xmlSpace="preserve">
            <path className="st0" d="M1 14L1 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C2 13.6 1.6 14 1 14zM5 14L5 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C6 13.6 5.6 14 5 14zM9 14L9 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C10 13.6 9.6 14 9 14z"/>
          </svg>
        </div>
      </div>
    })
  }

  const addGrabber = () => {
    let time = editorState.timings
    let end = time[time.length - 1].end + editorState.difference
    setEditorState({
      deletingGrabber: false,
      currentWarning: null
    })
    if(end >= playVideo.current.duration){
      return
    }
    time.push({
      start: end+0.2,
      end: playVideo.current.duration
    })
    setEditorState({
      timings: time
    }, ()=> {
      addActiveSegments()
    })
  }

  const preDeleteGrabber = () => {
    if(editorState.deletingGrabber) {
      setEditorState({
        deletingGrabber: false,
        currentWarning: null
      })
    } else {
      setEditorState({
        deletingGrabber: true,
        currentWarning: "delete_grabber"
      })
    }
  }

  const deleteGrabber = (index) => {
    let time = editorState.timings
    setEditorState({
      timings: time,
      deletingGrabber: false,
      currentWarning: null,
      currentGrabbed: {
        index: 0,
        type: "start"
      }
    })
    if(time.length == 1) {
      return
    }
    time.splice(index,1)
    progressBar.current.style.left = `${time[0].start / playVideo.current.duration * 100}%`
    playVideo.current.currentTime = time[0].start
    progressBar.current.style.width = "0%"
    addActiveSegments()
  }

  const addActiveSegments = ()=> {
    let colors = ""
    let counter = 0
    colors += `, rgb(240,240,240) 0%, rgb(240,240,240) ${editorState.timings[0].start / playVideo.current.duration * 100}%`
    for(let times of editorState.timings) {
      if(counter > 0) {
        colors += `, rgb(240,240,240) ${editorState.timings[counter -1].end / playVideo.current.duration *100}%, rgb(240,240,240) ${times.start / playVideo.current.duration *100}%`
      }

      colors += `, #ccc ${times.start / playVideo.current.duration * 100}%, #ccc ${times.end / playVideo.current.duration * 100}%`
      counter +=1
    }
    colors += `, rgb(240,240,240) ${editorState.timings[counter-1].end / playVideo.current.duration * 100}%, rgb(240,240,240) 100%`
    playbackBar.current.style.background = `linear-gradient(to right${colors})`
  }

  const saveVideo = () => {
    let metadata ={
      trim_times: editorState.timings,
      mute: editorState.isMuted
    }
    props.saveVideo(metadata)
  }

  return (
    <div className="wrapper">
      <video className="video" autoload="metadata" muted={editorState.isMuted} ref={playVideo} onClick={playPause}>
        {/* <source src={props.videoUrl} type="video/mp4" /> */}
      </video>
      <div className="playback">
        { renderGrabbers() }
        <div className="seekable" ref={playbackBar} onClick={updateProgress}></div>
        <div className="progress" ref={progressBar}></div>
      </div>

      <div className="controls">
        <div className="player-controls">
          <button className="settings-control" title="Reset Video" onClick={reset}>
            
          </button>
          <button className ="settings-control" title="Mute/Unmute Video" onClick={()=> setEditorState({
            isMuted: !editorState.isMuted
          })}>
            { editorState.isMuted ? <Icon as={FaVolumeMute} /> : <Icon as={FaVolumeUp} />}
          </button>
          <button className = "settings-control" title="Capture Thumbnail" onClick={captureSnapshot}>
            <Icon as={FaCamera} />
          </button>
        </div>

        <div className = "player-controls">
          <button className = "seek-start" title="Skip to Previous Clip" onClick={skipPrevious}>
            <Icon as={FaStepBackward} />
          </button>
          <button className = "play-control" title="Play / Pause" onClick={playPause}>
            {editorState.playing ? <Icon as={FaPause} /> : <Icon as={FaPlay} />}
          </button>
          <button className = "seek-end" title="Skip to Next Clip" onClick={skipNext}>
            <Icon as={FaStepForward} />
          </button>
        </div>

        <div>
          <button title="Add grabber" className="trim-control margined" onClick = {addGrabber}>
          Add <Icon as={FaGripLinesVertical} />
          </button>
          <button title="Delete grabber" className="trim-control margined" onClick={preDeleteGrabber}>
            Delete <Icon as={FaGripLinesVertical} />
          </button>
          <button title="Save Changes" className="trim-control" onClick={saveVideo}>
            Save
          </button>
        </div>
      </div>
      { editorState.currentWarning != null ? <div className={"warning"}>
        {warnings[editorState.currentWarning]} </div> : ""}
      {(editorState.imageUrl != "") ?
        <div className={"marginVertical"}>
          <img src={editorState.imageUrl} className={"thumbnail"} />
          <div className="controls">
            <div className="player-controls">
              <button className="settings-control" title="Reset Video">
                <Icon as={FaDownload} />
              </button>
              <button className="settings-control" title="Save Video">
                <Icon as={FaEraser} />
                </button> 
            </div>
          </div>
        </div>
        : ""
      }
    </div>
  )
}

export default VideoEditor
