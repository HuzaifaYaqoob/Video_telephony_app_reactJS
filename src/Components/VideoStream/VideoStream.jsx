

import { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import MenuBlock from "./BottomMenu"
import VideoBlock from "./VideoBlock"
import BaseURL, { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { AddActiveVideoSocket } from "../../redux/actions/socket"
import ParticipantAudioComp from './ParticipantsAudio'
import { JoinVideoChatParticipants } from "../../Constants/VideoChats/VideoChat"
import WhiteboardScreen from "../../Pages/Whiteboard/Whiteboard"


const VideoStream = (props) => {
    const params = useParams()
    const dispatch = useDispatch()
    const [copy_link_popup, setCopyLinkPopup] = useState(true)
    const [whiteBoardActive, setWhiteBoardActive] = useState(false)

    useEffect(() => {
        // if (props.connection.connections.length < 1 && props.user.stream.video_stream && props.user.stream.audio_stream) {
        if (props.connection.connections.length < 1) {
            JoinVideoChatParticipants(
                { type: 'CAM' },
                () => {
                }
            )
        }
    }, [props.user.stream.video_stream, props.user.stream.audio_stream])

    console.log(whiteBoardActive)
    return (
        <>
            <div className="w-full flex-1 flex flex-col gap-2 md:gap-4">
                {
                    copy_link_popup && props.video.video_chat?.host?.username == props.user.profile.user?.username &&
                    <div className="fixed w-[400px] p-3 bg-white rounded-md bottom-[130px] left-[30px] shadow z-10">
                        <h3 className="text-[25px] mb-3 ">Your Meeting is ready</h3>
                        <div>
                            <p className="mb-2">share this meeting link with others you want in the meeting</p>
                            <div
                                className="w-full my-3 bg-gray-900 text-white cursor-pointer rounded-md px-3 py-2" title="Copy Link"
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://meet.redexpo.co.uk/${params.video_chat_id}`)
                                    dispatch({
                                        type: 'ADD_OR_REMOVE_SNACK_BAR',
                                        payload: {
                                            message: 'Link Copies',
                                            type: 'info'
                                        }
                                    })
                                }}
                            >
                                https://meet.redexpo.co.uk/{params.video_chat_id}
                            </div>
                            <p className="mb-2 text-gray-500">people who use this meeting link must get your permission before they can join</p>
                            <div
                                className="bg-gray-200 hover:bg-gray-300 transition-all cursor-pointer text-center px-3 py-2 rounded-md "
                                onClick={() => {
                                    setCopyLinkPopup(false)
                                }}
                            >
                                Close
                            </div>
                        </div>
                    </div>
                }
                <ParticipantAudioComp />
                {
                    (whiteBoardActive || props?.video?.whiteboard) ? 
                    <div
                        className="flex-1 bg-gray-100 rounded-3xl overflow-hidden relative"
                    >
                        {
                            props?.user?.profile?.user?.username == props?.video?.video_chat?.host?.username ?
                            <WhiteboardScreen/>
                            :
                            <div>
                                <img src={props?.video?.whiteboard} alt="" />
                            </div>
                        }
                    </div>
                    :
                    <VideoBlock />
                }
                <MenuBlock 
                    onWhiteboard={(isEnabled)=>{
                        setWhiteBoardActive(!whiteBoardActive)
                    }}
                />
            </div>
        </>
    )
}



const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    AddActiveVideoSocket: AddActiveVideoSocket
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoStream)