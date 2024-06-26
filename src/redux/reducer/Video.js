import { CREATE_VIDEO_CHAT, GET_VIDEO_CHAT, SHOW_VIDEO_STREAM, VIDEO_CHAT_NOT_FOUND, VIDEO_MEETING_ACCEPTED_TO_JOIN, VIDEO_MODEL_TOGGLE } from "../ActionTypes/VideoTypes"


const initialState = {
    video: false,
    video_stream: null, // active video stream
    stream_type: null,
    video_chat: undefined,
    video_chat_joined: false,
    whiteboard : null
}


const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VIDEO_CHAT_WHITEBOARD_CHANGE':
            return {
                ...state,
                whiteboard : action.payload
            }
        case 'VIDEO_CHAT_SETTINGS_CHANGE':
            let vid_chat_prev = state.video_chat ? state.video_chat : {}
            return {
                ...state,
                video_chat : {
                    ...vid_chat_prev,
                    settings : action.payload
                }
            }
        case VIDEO_MEETING_ACCEPTED_TO_JOIN:
            return {
                ...state,
                video_chat_joined: action.payload
            }
        case GET_VIDEO_CHAT:
            return {
                ...state,
                video_chat: action.payload.data
            }
        case CREATE_VIDEO_CHAT:
            return {
                ...state,
                video_chat: action.payload.data
            }

        case VIDEO_CHAT_NOT_FOUND:
            return {
                ...state,
                video_chat: undefined,
            }
        case SHOW_VIDEO_STREAM:
            return {
                ...state,
                video: true,
                video_stream: action.payload.stream,
                stream_type: action.payload.stream_type
            }
        case VIDEO_MODEL_TOGGLE:
            return {
                ...state,
                video: action.payload.mode,
                video_stream: !action.payload.mode ? null : state.video_stream,
                stream_type: !action.payload.mode ? null : state.stream_type,
            }
        default:
            return state
    }
}

export default VideoReducer