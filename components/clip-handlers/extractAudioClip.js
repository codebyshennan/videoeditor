import * as stage from './stage-constants';
import * as ffmpegProcess from '../videoprocessing/ffmpegProcess';

import { fetchFile } from '@ffmpeg/ffmpeg';

import { uploadAudio } from './uploadAudioToCloud';
import { v4 as uuidv4 } from 'uuid';

export const extractAudioClip = async (
  ffmpeg,
  video,
  FINALAUDIO,
  setAudioUuid,
  timeStampAtStage,
  setStrippedAudio
) => {
  try {
    timeStampAtStage(stage.LOADING_VIDEO);
    const videoFilename = video.name;
    ffmpeg.FS('writeFile', videoFilename, await fetchFile(video));

    timeStampAtStage(stage.EXTRACTING_AUDIO);
    await ffmpeg.run('-i', videoFilename, '-vn', '-acodec', 'copy', FINALAUDIO);
    timeStampAtStage(stage.EXTRACTED_AUDIO);

    // list files inside specific path
    const allFiles = ffmpeg.FS('readdir', '/'); 
    console.log('allFiles :>> ', allFiles);
    const data = ffmpeg.FS('readFile', FINALAUDIO);
    console.log('data :>> ', data);
    setStrippedAudio(data)

    timeStampAtStage(stage.UPLOADING_AUDIO);
    const audioBlob = new Blob([data.buffer], { type: 'audio/aac' });
    const audioUuid = uuidv4();
    await uploadAudio(audioBlob, audioUuid);

    timeStampAtStage(stage.ANALYSING_AUDIO);

    setAudioUuid(audioUuid);
  } catch (error) {
    console.error(error);
  }
};
