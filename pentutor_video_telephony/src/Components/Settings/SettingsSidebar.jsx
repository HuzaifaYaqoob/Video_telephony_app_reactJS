import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { SidebarHeader } from "../ChatBox/Chat"


const SwitchButton = ({ text, active, name, onChangeFunction }) => {
    return (
        <>
            <div className="flex items-center justify-between gap-3 mb-3">
                <p className={`${active ? 'text-gray-800' : 'text-gray-500'} text-[18px]`}>{text}</p>
                <div>
                    <input
                        type="checkbox"
                        name={name}
                        id={name}
                        onChange={onChangeFunction}
                        className='scale-[140%]'
                        checked={active}
                    />
                </div>
            </div>
        </>
    )
}


const SettingSideBar = (props) => {
    const [allow_chat, setallow_chat] = useState(false)
    const [allow_rename, setallow_rename] = useState(false)
    const [lock_meeting, setlock_meeting] = useState(false)
    const [share_screen, setshare_screen] = useState(false)
    const [start_video, setstart_video] = useState(false)
    const [unmute, setunmute] = useState(false)
    const [waiting_room, setwaiting_room] = useState(false)

    useEffect(()=>{
        if(props.video.video_chat?.settings){
            // setSettings(props.video.video_chat?.settings)
        }
        
    }, [props.video.video_chat?.settings])
    console.log(props.video.video_chat)


    useEffect(()=>{
        if (props.socket.active_video_socket){

            let s_data = {
                allow_chat, allow_rename, lock_meeting, share_screen, start_video, unmute, waiting_room
            }
            props.socket.active_video_socket.send(JSON.stringify(s_data))
        }
    } , [allow_chat, allow_rename, lock_meeting, share_screen, start_video, unmute, waiting_room])
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 lg:relative w-full lg:min-w-[400px] lg:max-w-[400px] bg-[#eef2f8] lg:rounded-3xl p-3 flex flex-col gap-3">
                <SidebarHeader text={'Security Settings'} />
                <div className="flex-1 overflow-auto">
                    <div className="pr-3">
                        <SwitchButton
                            text={'Allow Chat'}
                            active={allow_chat}
                            name='allow_chat'
                            onChangeFunction={()=>{setallow_chat(!allow_chat)}}
                        />
                        <SwitchButton
                            text={'Allow Rename'}
                            active={allow_rename}
                            name='allow_rename'
                            onChangeFunction={()=>{setallow_rename(!allow_rename)}}
                        />
                        <SwitchButton
                            text={'Lock Meeting'}
                            active={lock_meeting}
                            name='lock_meeting'
                            onChangeFunction={()=>{setlock_meeting(!lock_meeting)}}
                        />
                        <SwitchButton
                            text={'Allow Screen Share'}
                            active={share_screen}
                            name='share_screen'
                            onChangeFunction={()=>{setshare_screen(!share_screen)}}
                        />
                        <SwitchButton
                            text={'Allow start video'}
                            active={start_video}
                            name='start_video'
                            onChangeFunction={()=>{setstart_video(!start_video)}}
                        />
                        <SwitchButton
                            text={'Unmute All'}
                            active={unmute}
                            name='unmute'
                            onChangeFunction={()=>{setunmute(!unmute)}}
                        />
                        <SwitchButton
                            text={'Enable waiting room'}
                            active={waiting_room}
                            name='waiting_room'
                            onChangeFunction={()=>{setwaiting_room(!waiting_room)}}
                        />
                        {/* {
                            props.connection.connections.filter(cnt => cnt.stream).length > 0 ?
                                props.connection.connections.filter(cnt => cnt.stream).map((cnctn, index) => {
                                    return (
                                        <User user_part={cnctn} {...props} key={index} />
                                    )
                                })
                                :
                                <div className="text-center">
                                    <p className="text-gray-500">No Participant</p>
                                </div>
                        } */}
                    </div>
                </div>
            </div>
        </>
    )
}

const mapState = state => {
    return state
}

const mapDispatch = {

}

export default connect(mapState, mapDispatch)(SettingSideBar)