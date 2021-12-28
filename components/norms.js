import * as stage from '../components/clip-handlers/stage-constants'

const NORMS = {};

NORMS[stage.LOADING_VIDEO] = 5;
NORMS[stage.EXTRACTING_AUDIO] = 5;
NORMS[stage.EXTRACTED_AUDIO] = 5;
NORMS[stage.UPLOADING_AUDIO] = 5;
NORMS[stage.ANALYSING_AUDIO] = 5;
NORMS[stage.ANALYSED_AUDIO] = 25;
NORMS[stage.PROCESSING_VIDEO] = 5;
NORMS[stage.CLEANING_TRANSCRIPT] = 5;
NORMS[stage.CUTTING_VIDEO] = 5;
NORMS[stage.SPEEDING_UP_PAUSES] = 16;
NORMS[stage.PREPARING_TO_STITCH] = 4;
NORMS[stage.STITCHING_VIDEO] = 5;
NORMS[stage.CLEARING_MEMORY] = 9;
NORMS[stage.COMPLETED] = 1;

export default NORMS