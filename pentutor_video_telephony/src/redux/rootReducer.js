

import { combineReducers } from "redux";
import SocketReducer from "./reducer/Socket";
import { StreamReducer } from "./reducer/stream";


import UserReducer from "./reducer/User";
import UtilityReducer from "./reducer/Utility";
import VideoReducer from "./reducer/Video";

export default combineReducers({
    user: UserReducer,
    utility: UtilityReducer,
    video: VideoReducer,
    stream: StreamReducer,
    socket: SocketReducer
})