import { SHOW_VIDEO_STREAM, VIDEO_MODEL_TOGGLE } from "../ActionTypes/VideoTypes"



export const ToggleVideoMode = (data, success, fail) => dispatch =>{
    dispatch({
        type : VIDEO_MODEL_TOGGLE,
        payload : {
            mode : data.mode
        }
    })
}

export const add_video_to_stream = (data , success, fail) => dispatch => {
    dispatch({
        type : SHOW_VIDEO_STREAM,
        payload : {
            stream  : data.stream
        }
    })
}