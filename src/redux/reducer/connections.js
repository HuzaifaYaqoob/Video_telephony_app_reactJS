

import { ADD_ALL_SCREEN_SHARE_CONNECTIONS, ADD_NEW_USER_CONNECTION, REMOVE_USER_CONNECTION } from "../ActionTypes/connections"
import { ADD_CONNECTION_MEDIA_STREAM, ADD_SCREEN_CONNECTION_STREAM, SET_PINNED_STREAM, USER_MUTED_UNMUTED } from "../ActionTypes/streamTypes"


const initialState = {
    connections: []
}

export const ConnectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_MUTED_UNMUTED:
            return {
                ...state,
                connections: state.connections.map(cnct => {
                    if (cnct.user.id == action.payload.user) {
                        cnct.stream.getAudioTracks().forEach(track => track.enabled = action.payload.is_muted)
                        return cnct
                    }
                    return cnct
                })
            }
        case ADD_SCREEN_CONNECTION_STREAM:
            return {
                ...state,
                connections: state.connections.map(cnt => {
                    if (cnt.user.username == action.payload.user.username && cnt.user.type == 'SCREEN') {
                        return {
                            ...cnt,
                            stream: action.payload.stream
                        }
                    }
                    return cnt
                })
            }
        case ADD_ALL_SCREEN_SHARE_CONNECTIONS:
            return {
                ...state,
                connections: [
                    ...state.connections,
                    ...action.payload.connections
                ]
            }
        case REMOVE_USER_CONNECTION:
            console.log('removing all connections')
            return {
                ...state,
                connections: state.connections.filter(cnt => {
                    if (cnt.user.username != action.payload.user.username) {
                        return cnt
                    }
                })
            }
        case ADD_CONNECTION_MEDIA_STREAM:
            return {
                ...state,
                connections: state.connections.map(cnct => {
                    if (cnct.user.username == action.payload.user.username) {
                        return {
                            ...cnct,
                            stream: action.payload.stream
                        }
                    }
                    return cnct
                })
            }
        case ADD_NEW_USER_CONNECTION:
            return {
                ...state,
                connections: [
                    ...state.connections,
                    action.payload.connection
                ]
            }
        default:
            return state
    }
}