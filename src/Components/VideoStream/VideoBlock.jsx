import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { ToggleVideoMode } from "../../redux/actions/Video"


const UserVideoBlock = ({user, mediaStream, connections, ...props}) =>{
    const rm_vid = useRef(null)
    const is_vid_active = mediaStream?.getVideoTracks()?.length > 0 ? mediaStream?.getVideoTracks()[0]?.enabled : 'no track found'
    const is_audio_active = connections?.find(user => user.username == user.username)?.stream?.getAudioTracks()?.length > 0 ? connections?.find(user => user.username == user.username)?.stream?.getAudioTracks()[0]?.enabled : 'no track found'
    console.log(user.first_name , ' audio, ', is_audio_active)


    useEffect(() => {
        if (rm_vid.current) {
            rm_vid.current.srcObject = mediaStream
            rm_vid.current.play()
        }
    }, [rm_vid.current])
    return (
        <>
            <div className="mb-4 sm:mb-0 border relative rounded-3xl overflow-hidden h-[250px] min-w-[300px] flex-1 flex items-center justify-center border-gray-300">
                <p className={`absolute text-white ${is_vid_active ? 'bottom-0 left-0 bg-black px-3 py-1' : ''}`}>{user.first_name} {user.last_name}</p>
                <video ref={rm_vid} autoPlay muted className="w-auto max-w-full max-h-full h-auto"></video>
            </div>
        </>
    )
}


const VideoBlock = (props) => {

    return (
        <>
            <div
                className="flex-1 bg-gray-200 p-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 rounded-3xl overflow-hidden relative"
                style={{
                    // backgroundImage: 'url("https://images.unsplash.com/photo-1622630998477-20aa696ecb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw0fHxibG9jayUyMGNoYWlufGVufDB8fHx8MTY1NTk2MTkzMw&ixlib=rb-1.2.1&q=80&w=1080")'
                }}
            >
                <UserVideoBlock user={props.user.profile?.user} mediaStream={props.stream.pinned_stream}/>
                {
                    props?.connection?.connections?.map(cnctn => {
                        return (
                            <UserVideoBlock user={cnctn?.user} mediaStream={cnctn?.stream} connections={props?.connection?.connections} />
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