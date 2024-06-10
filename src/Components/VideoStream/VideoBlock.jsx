import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { ToggleVideoMode } from "../../redux/actions/Video"


const UserVideoBlock = ({user, mediaStream, connections, ...props}) =>{
    const rm_vid = useRef(null)
    const is_vid_active = mediaStream?.getVideoTracks()?.length > 0 ? mediaStream?.getVideoTracks()[0]?.enabled : 'no track found'
    const is_audio_active = mediaStream?.getAudioTracks().length > 0 ? mediaStream?.getAudioTracks()[0]?.enabled : false
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
                {
                    !is_audio_active && 
                    <span className="absolute top-2 right-2">
                        <svg className="w-[12px] h-[20px] md:w-[20px] md:h-[27px]" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                className={`fill-black`}
                                d="M5.11111 6.25C5.11111 4.5924 5.78422 3.00269 6.98237 1.83058C8.18052 0.65848 9.80556 0 11.5 0C13.1944 0 14.8195 0.65848 16.0176 1.83058C17.2158 3.00269 17.8889 4.5924 17.8889 6.25V15C17.8889 16.6576 17.2158 18.2473 16.0176 19.4194C14.8195 20.5915 13.1944 21.25 11.5 21.25C9.80556 21.25 8.18052 20.5915 6.98237 19.4194C5.78422 18.2473 5.11111 16.6576 5.11111 15V6.25ZM11.5 2.5C10.4833 2.5 9.50831 2.89509 8.78942 3.59835C8.07053 4.30161 7.66667 5.25544 7.66667 6.25V15C7.66667 15.9946 8.07053 16.9484 8.78942 17.6517C9.50831 18.3549 10.4833 18.75 11.5 18.75C12.5167 18.75 13.4917 18.3549 14.2106 17.6517C14.9295 16.9484 15.3333 15.9946 15.3333 15V6.25C15.3333 5.25544 14.9295 4.30161 14.2106 3.59835C13.4917 2.89509 12.5167 2.5 11.5 2.5ZM1.27778 13.75C1.61667 13.75 1.94167 13.8817 2.1813 14.1161C2.42093 14.3505 2.55556 14.6685 2.55556 15C2.55556 17.3206 3.49791 19.5462 5.17532 21.1872C6.85273 22.8281 9.12779 23.75 11.5 23.75C13.8722 23.75 16.1473 22.8281 17.8247 21.1872C19.5021 19.5462 20.4444 17.3206 20.4444 15C20.4444 14.6685 20.5791 14.3505 20.8187 14.1161C21.0583 13.8817 21.3833 13.75 21.7222 13.75C22.0611 13.75 22.3861 13.8817 22.6257 14.1161C22.8654 14.3505 23 14.6685 23 15C23.0005 17.7676 21.9582 20.4383 20.0723 22.5014C18.1865 24.5644 15.5894 25.875 12.7778 26.1825V28.75C12.7778 29.0815 12.6432 29.3995 12.4035 29.6339C12.1639 29.8683 11.8389 30 11.5 30C11.1611 30 10.8361 29.8683 10.5965 29.6339C10.3568 29.3995 10.2222 29.0815 10.2222 28.75V26.1825C7.41062 25.875 4.81355 24.5644 2.92767 22.5014C1.04179 20.4383 -0.000543002 17.7676 2.12215e-07 15C2.12215e-07 14.6685 0.134623 14.3505 0.374253 14.1161C0.613883 13.8817 0.93889 13.75 1.27778 13.75Z" />
                        </svg>
                    </span>
                }
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