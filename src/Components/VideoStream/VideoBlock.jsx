import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { ToggleVideoMode } from "../../redux/actions/Video"


const UserVideoBlock = ({user, mediaStream}) =>{
    const rm_vid = useRef(null)
    const is_vid_active = mediaStream?.getVideoTracks()[0].enabled


    useEffect(() => {
        if (rm_vid.current) {
            rm_vid.current.srcObject = mediaStream
            rm_vid.current.play()
        }
    }, [rm_vid.current])
    return (
        <>
            <div className="border relative rounded-3xl overflow-hidden min-h-[250px] min-w-[300px] flex-1 flex items-center justify-center border-gray-300">
                <p className={`absolute text-white ${is_vid_active ? 'bottom-0 left-0 bg-black px-3 py-1' : ''}`}>{user.first_name} {user.last_name}</p>
                <video ref={rm_vid} autoPlay muted className="w-full"></video>
            </div>
        </>
    )
}


const VideoBlock = (props) => {
    const video_ref = useRef()

    useEffect(() => {
        if (video_ref && video_ref.current) {
            video_ref.current.srcObject = props.stream.pinned_stream
            video_ref.current.play()
        }
    }, [
        props.stream.pinned_stream,
        video_ref.current
    ])

    const is_vid_active = (props.stream.pinned_stream) && props.stream.pinned_stream.getVideoTracks()[0].enabled

    return (
        <>
            <div
                className="flex-1 bg-gray-200 p-4 flex items-center justify-center gap-4 rounded-3xl overflow-hidden relative"
                style={{
                    // backgroundImage: 'url("https://images.unsplash.com/photo-1622630998477-20aa696ecb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw0fHxibG9jayUyMGNoYWlufGVufDB8fHx8MTY1NTk2MTkzMw&ixlib=rb-1.2.1&q=80&w=1080")'
                }}
            >
                <UserVideoBlock user={props.user.profile?.user} mediaStream={props.stream.pinned_stream}/>
                {
                    props?.connection?.connections?.map(cnctn => {
                        return (
                            <UserVideoBlock user={cnctn?.user} mediaStream={cnctn?.stream} />
                        )
                    })
                }
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    ToggleVideoMode: ToggleVideoMode

}

export default connect(mapStateToProps, mapDispatchToProps)(VideoBlock)