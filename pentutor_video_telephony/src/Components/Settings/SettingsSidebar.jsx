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
    const [settings, setSettings] = useState({
        allow_chat: false,
        allow_rename: false,
        lock_meeting: false,
        share_screen: false,
        start_video: false,
        unmute: false,
        waiting_room: true,
    })

    useEffect(()=>{
        if(props.video.video_chat?.settings){
            setSettings(props.video.video_chat?.settings)
        }

    }, [props.video.video_chat?.settings])

    const handleOnChange = (e) =>{

    }
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 lg:relative w-full lg:min-w-[400px] lg:max-w-[400px] bg-[#eef2f8] lg:rounded-3xl p-3 flex flex-col gap-3">
                <SidebarHeader text={'Security Settings'} />
                <div className="flex-1 overflow-auto">
                    <div className="pr-3">
                        <SwitchButton
                            text={'Allow Chat'}
                            active={settings.allow_chat}
                            name='allow_chat'
                            onChangeFunction={handleOnChange}
                        />
                        <SwitchButton
                            text={'Allow Rename'}
                            active={settings.allow_rename}
                            name='allow_rename'
                            onChangeFunction={handleOnChange}
                        />
                        <SwitchButton
                            text={'Lock Meeting'}
                            active={settings.lock_meeting}
                            name='lock_meeting'
                            onChangeFunction={handleOnChange}
                        />
                        <SwitchButton
                            text={'Allow Screen Share'}
                            active={settings.share_screen}
                            name='share_screen'
                            onChangeFunction={handleOnChange}
                        />
                        <SwitchButton
                            text={'Allow start video'}
                            active={settings.start_video}
                            name='start_video'
                            onChangeFunction={handleOnChange}
                        />
                        <SwitchButton
                            text={'Unmute All'}
                            active={settings.unmute}
                            name='unmute'
                            onChangeFunction={handleOnChange}
                        />
                        <SwitchButton
                            text={'Enable waiting room'}
                            active={settings.waiting_room}
                            name='waiting_room'
                            onChangeFunction={handleOnChange}
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