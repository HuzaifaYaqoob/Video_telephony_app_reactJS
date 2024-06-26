import { connect, useDispatch } from "react-redux"
import MenuIcon from "../Utility/Icon"
import { addUserMedia } from "../../redux/actions/userActions"
import { MakeActiveTab } from '../../redux/actions/Utility'
import { AddToPinnedStream } from "../../redux/actions/stream"
import { useNavigate } from "react-router-dom"
import { ShareScreenConnection } from "../../Constants/Connections/screenShareCon"
import { useState } from "react"
import { startRecording, stopRecording } from "../../Constants/MediaRecording/MediaRecording"


const MenuBlock = ({onWhiteboard, ...props}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [more_dropdown, setMoreDropDown] = useState()


    let settings = props?.video?.video_chat?.settings ? props.video.video_chat?.settings : {}

    const share_video_handler = () => {
        let user_stream = props.user.stream.video_stream
        if (user_stream) {
            user_stream.getVideoTracks()[0].enabled = !user_stream.getVideoTracks()[0].enabled
            props.addUserMedia(
                {
                    video: user_stream
                }
            )
            if (!props.stream.pinned_stream) {
                props.AddToPinnedStream(
                    {
                        pinned_stream: user_stream
                    }
                )
            }
        }
        else {
            alert('Please allow camera access and try refreshing the page')
        }
    }
    const share_audio_handler = () => {
        let user_stream = props.user.stream.audio_stream
        if (user_stream) {
            user_stream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled
            });
            props.addUserMedia(
                {
                    audio: user_stream
                }
            )
        }
        else {
            alert('Please allow Mic access and try refreshing the page')
        }
    }

    const share_screen_handler = async () => {
        let screen_stream = null

        try {
            screen_stream = await navigator.mediaDevices.getDisplayMedia()
        }
        catch (err) {
            dispatch({
                type: 'ADD_OR_REMOVE_SNACK_BAR',
                payload: {
                    message: `Could not share screen, ${err}`,
                    type: 'error'
                }
            })
        }

        if (screen_stream) {
            screen_stream.oninactive = () => {
                props.AddToPinnedStream(
                    {
                        pinned_stream: (props.user.stream.video_stream && props.user.stream.video_stream.getVideoTracks()[0].enabled) ? props.user.stream.video_stream : null
                    }
                )
            }
            props.addUserMedia(
                {
                    screen_share: screen_stream,
                }
            )
            props.AddToPinnedStream(
                {
                    pinned_stream: screen_stream
                }
            )
            ShareScreenConnection()
        }
    }

    const LeaveMeeting = (e) => {
        props.socket.active_video_socket.send(
            JSON.stringify({
                type: 'USER_LEFT_MEETING',
                user: props.user.profile.user
            })
        )
        props.connection.connections.map(cnt => {
            cnt.rtcp.close()
        })
        props.socket.video_socket.close()
        props.socket.active_video_socket.close()
        dispatch({
            type: 'ADD_OR_REMOVE_SNACK_BAR',
            payload: {
                message: `You left the meeting`,
                type: 'info'
            }
        })
        navigate('/')
    }

    const meeting_recording_handler = (e) => {
        if (props.utility.recording) {
            stopRecording()
        }
        else {
            startRecording()
        }
        setMoreDropDown(false)
    }

    return (
        <>
            <div className="md:min-h-[100px] fixed bottom-5 left-5 right-5 md:static bg-[#f1f4f9] rounded-3xl md:rounded-3xl flex items-center justify-between md:justify-center gap-3 md:gap-8 py-3 px-5 md:px-8">
                <MenuIcon
                    icon={
                        <>
                            <svg className="w-[20px] h-[20px] md:w-[28px] md:h-[28px]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    className={`${props.user.stream.video_stream?.getVideoTracks()[0].enabled ? 'fill-black' : 'fill-white'}`}
                                    fillRule="evenodd" clipRule="evenodd" d="M0 5C0 4.46957 0.210714 3.96086 0.585786 3.58579C0.960859 3.21071 1.46957 3 2 3H9.5C9.98509 2.99994 10.4537 3.17619 10.8185 3.49593C11.1833 3.81566 11.4195 4.25709 11.483 4.738L14.593 3.356C14.7452 3.28817 14.912 3.25946 15.0781 3.27249C15.2443 3.28551 15.4045 3.33985 15.5443 3.43056C15.6841 3.52128 15.7991 3.6455 15.8786 3.79192C15.9582 3.93835 15.9999 4.10235 16 4.269V11.731C15.9999 11.8975 15.9581 12.0614 15.8786 12.2077C15.7991 12.354 15.6843 12.4781 15.5446 12.5688C15.4049 12.6595 15.2448 12.7139 15.0788 12.727C14.9128 12.7401 14.7462 12.7116 14.594 12.644L11.483 11.262C11.4195 11.7429 11.1833 12.1843 10.8185 12.5041C10.4537 12.8238 9.98509 13.0001 9.5 13H2C1.46957 13 0.960859 12.7893 0.585786 12.4142C0.210714 12.0391 0 11.5304 0 11V5ZM11.5 10.175L15 11.731V4.269L11.5 5.825V10.175ZM2 4C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V11C1 11.2652 1.10536 11.5196 1.29289 11.7071C1.48043 11.8946 1.73478 12 2 12H9.5C9.76522 12 10.0196 11.8946 10.2071 11.7071C10.3946 11.5196 10.5 11.2652 10.5 11V5C10.5 4.73478 10.3946 4.48043 10.2071 4.29289C10.0196 4.10536 9.76522 4 9.5 4H2Z" />
                            </svg>
                        </>
                    }
                    color='black'
                    text='cam'
                    onClick={() => {
                        share_video_handler()
                    }}
                    active={props.user.stream.video_stream?.getVideoTracks()[0].enabled ? true : false}
                />
                <MenuIcon
                    icon={
                        <>
                            <svg className="w-[12px] h-[20px] md:w-[20px] md:h-[27px]" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    className={`${props.user.stream.audio_stream?.getAudioTracks()[0].enabled ? 'fill-black' : 'fill-white'}`}
                                    d="M5.11111 6.25C5.11111 4.5924 5.78422 3.00269 6.98237 1.83058C8.18052 0.65848 9.80556 0 11.5 0C13.1944 0 14.8195 0.65848 16.0176 1.83058C17.2158 3.00269 17.8889 4.5924 17.8889 6.25V15C17.8889 16.6576 17.2158 18.2473 16.0176 19.4194C14.8195 20.5915 13.1944 21.25 11.5 21.25C9.80556 21.25 8.18052 20.5915 6.98237 19.4194C5.78422 18.2473 5.11111 16.6576 5.11111 15V6.25ZM11.5 2.5C10.4833 2.5 9.50831 2.89509 8.78942 3.59835C8.07053 4.30161 7.66667 5.25544 7.66667 6.25V15C7.66667 15.9946 8.07053 16.9484 8.78942 17.6517C9.50831 18.3549 10.4833 18.75 11.5 18.75C12.5167 18.75 13.4917 18.3549 14.2106 17.6517C14.9295 16.9484 15.3333 15.9946 15.3333 15V6.25C15.3333 5.25544 14.9295 4.30161 14.2106 3.59835C13.4917 2.89509 12.5167 2.5 11.5 2.5ZM1.27778 13.75C1.61667 13.75 1.94167 13.8817 2.1813 14.1161C2.42093 14.3505 2.55556 14.6685 2.55556 15C2.55556 17.3206 3.49791 19.5462 5.17532 21.1872C6.85273 22.8281 9.12779 23.75 11.5 23.75C13.8722 23.75 16.1473 22.8281 17.8247 21.1872C19.5021 19.5462 20.4444 17.3206 20.4444 15C20.4444 14.6685 20.5791 14.3505 20.8187 14.1161C21.0583 13.8817 21.3833 13.75 21.7222 13.75C22.0611 13.75 22.3861 13.8817 22.6257 14.1161C22.8654 14.3505 23 14.6685 23 15C23.0005 17.7676 21.9582 20.4383 20.0723 22.5014C18.1865 24.5644 15.5894 25.875 12.7778 26.1825V28.75C12.7778 29.0815 12.6432 29.3995 12.4035 29.6339C12.1639 29.8683 11.8389 30 11.5 30C11.1611 30 10.8361 29.8683 10.5965 29.6339C10.3568 29.3995 10.2222 29.0815 10.2222 28.75V26.1825C7.41062 25.875 4.81355 24.5644 2.92767 22.5014C1.04179 20.4383 -0.000543002 17.7676 2.12215e-07 15C2.12215e-07 14.6685 0.134623 14.3505 0.374253 14.1161C0.613883 13.8817 0.93889 13.75 1.27778 13.75Z" />
                            </svg>
                        </>
                    }
                    text='mic'
                    onClick={() => {
                        share_audio_handler()
                    }}
                    active={props.user.stream.audio_stream?.getAudioTracks()[0].enabled ? true : false}
                />
                {
                    (settings?.share_screen || props?.user?.profile?.user?.username == props?.video?.video_chat?.host?.username) && 
                    <MenuIcon
                        className='hidden md:block'
                        icon={
                            <>
                                <svg className="w-[20px] h-[17px] md:w-[28px] md:h-[26px]" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        className={`${(props.user.stream.screen_share?.getVideoTracks()[0].enabled ? 'fill-[#0469fa]' : 'fill-white')}`}
                                        d="M1.5 21.5H14V26H9V28H21V26H16V21.5H28.5C28.8977 21.4995 29.2789 21.3414 29.5601 21.0601C29.8414 20.7789 29.9995 20.3977 30 20V1.5C29.9995 1.10232 29.8414 0.721056 29.5601 0.439851C29.2789 0.158647 28.8977 0.000463153 28.5 0H1.5C1.10232 0.000463153 0.721056 0.158647 0.439851 0.439851C0.158647 0.721056 0.000463153 1.10232 0 1.5V20C0.000463153 20.3977 0.158647 20.7789 0.439851 21.0601C0.721056 21.3414 1.10232 21.4995 1.5 21.5V21.5ZM2 2H28V19.5H2V2Z" />
                                </svg>
                            </>
                        }
                        text='share'
                        onClick={() => {
                            share_screen_handler()
                        }}
                        active={props.user.stream.screen_share && props.user.stream.screen_share.getVideoTracks()[0].enabled}
                    />
                }
                {
                    (settings?.allow_chat || props?.user?.profile?.user?.username == props?.video?.video_chat?.host?.username) && 
                    <MenuIcon
                        icon={
                            <>
                                <svg className="w-[20px] h-[20px] md:w-[28px] md:h-[27px]" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.02125 21.1587C5.21587 21.361 5.365 21.6054 5.45802 21.8743C5.55103 22.1432 5.58564 22.43 5.55937 22.7144C5.4276 24.0304 5.17777 25.3308 4.81312 26.5989C7.42875 25.9715 9.02625 25.2451 9.75188 24.8644C10.1634 24.6485 10.6374 24.5973 11.0831 24.7207C12.3608 25.0736 13.6777 25.2512 15 25.249C22.4925 25.249 28.125 19.7972 28.125 13.5956C28.125 7.39602 22.4925 1.94223 15 1.94223C7.5075 1.94223 1.875 7.39602 1.875 13.5956C1.875 16.4468 3.03187 19.0921 5.02125 21.1587ZM4.09687 28.7431C3.65263 28.8343 3.20694 28.9178 2.76 28.9936C2.385 29.0558 2.1 28.6518 2.24813 28.2905C2.41461 27.8838 2.5672 27.4712 2.70562 27.0533L2.71125 27.0339C3.17625 25.6355 3.555 24.0273 3.69375 22.5299C1.39313 20.1409 0 17.0139 0 13.5956C0 6.08695 6.71625 0 15 0C23.2838 0 30 6.08695 30 13.5956C30 21.1043 23.2838 27.1912 15 27.1912C13.5143 27.1933 12.0349 26.9935 10.5994 26.5969C9.62437 27.1077 7.52625 28.038 4.09687 28.7431V28.7431Z" fill="black" />
                                </svg>
                            </>
                        }
                        color='black'
                        text='chat'
                        onClick={(e) => {
                            props.MakeActiveTab({ tab: 'CHAT' })
                            dispatch(
                                {
                                    type: 'ON_CHAT_NEW_MESSAGE',
                                    payload: false
                                }
                            )
                        }}
                        active={true}
                        badge={props.utility.is_message}
                    />
                }
                <MenuIcon
                    icon={
                        <>
                            <svg className="w-[20px] h-[17px] md:w-[23px] md:h-[24px]" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2891 10.15C10.9944 9.45183 10.5666 8.81766 10.0297 8.28281C9.49447 7.74642 8.8604 7.31876 8.16254 7.02344C8.15629 7.02031 8.15004 7.01875 8.14379 7.01562C9.11723 6.3125 9.75004 5.16719 9.75004 3.875C9.75004 1.73438 8.01566 0 5.87504 0C3.73441 0 2.00004 1.73438 2.00004 3.875C2.00004 5.16719 2.63285 6.3125 3.60629 7.01719C3.60004 7.02031 3.59379 7.02187 3.58754 7.025C2.88754 7.32031 2.25941 7.74375 1.72035 8.28438C1.18396 8.81964 0.756296 9.4537 0.460977 10.1516C0.170855 10.8348 0.0143858 11.5673 3.90719e-05 12.3094C-0.000377967 12.3261 0.00254708 12.3426 0.00864193 12.3582C0.0147368 12.3737 0.0238781 12.3879 0.0355272 12.3998C0.0471763 12.4117 0.0610975 12.4212 0.0764706 12.4277C0.0918436 12.4342 0.108358 12.4375 0.125039 12.4375H1.06254C1.13129 12.4375 1.18598 12.3828 1.18754 12.3156C1.21879 11.1094 1.70316 9.97969 2.55941 9.12344C3.44535 8.2375 4.62191 7.75 5.87504 7.75C7.12816 7.75 8.30473 8.2375 9.19066 9.12344C10.0469 9.97969 10.5313 11.1094 10.5625 12.3156C10.5641 12.3844 10.6188 12.4375 10.6875 12.4375H11.625C11.6417 12.4375 11.6582 12.4342 11.6736 12.4277C11.689 12.4212 11.7029 12.4117 11.7146 12.3998C11.7262 12.3879 11.7353 12.3737 11.7414 12.3582C11.7475 12.3426 11.7505 12.3261 11.75 12.3094C11.7344 11.5625 11.5797 10.8359 11.2891 10.15V10.15ZM5.87504 6.5625C5.15785 6.5625 4.48285 6.28281 3.97504 5.775C3.46723 5.26719 3.18754 4.59219 3.18754 3.875C3.18754 3.15781 3.46723 2.48281 3.97504 1.975C4.48285 1.46719 5.15785 1.1875 5.87504 1.1875C6.59223 1.1875 7.26723 1.46719 7.77504 1.975C8.28285 2.48281 8.56254 3.15781 8.56254 3.875C8.56254 4.59219 8.28285 5.26719 7.77504 5.775C7.26723 6.28281 6.59223 6.5625 5.87504 6.5625Z" fill="black" />
                            </svg>
                        </>
                    }
                    color='black'
                    text='participants'
                    onClick={(e) => {
                        props.MakeActiveTab({ tab: 'PARTICIPANTS' })
                    }}
                    active={true}

                />
                <div className="relative">
                    <MenuIcon
                        icon={
                            <>
                                <svg width="5" height="23" viewBox="0 0 5 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.75 3.46C3.42931 3.46 3.98 2.90931 3.98 2.23C3.98 1.55069 3.42931 1 2.75 1C2.07069 1 1.52 1.55069 1.52 2.23C1.52 2.90931 2.07069 3.46 2.75 3.46Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.75 12.48C3.42931 12.48 3.98 11.9293 3.98 11.25C3.98 10.5707 3.42931 10.02 2.75 10.02C2.07069 10.02 1.52 10.5707 1.52 11.25C1.52 11.9293 2.07069 12.48 2.75 12.48Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.75 21.5C3.42931 21.5 3.98 20.9493 3.98 20.27C3.98 19.5907 3.42931 19.04 2.75 19.04C2.07069 19.04 1.52 19.5907 1.52 20.27C1.52 20.9493 2.07069 21.5 2.75 21.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </>
                        }
                        color='black'
                        text='Options'
                        onClick={(e) => {
                            setMoreDropDown(!more_dropdown)
                        }}
                        active={true}
                    />
                    {
                        more_dropdown &&
                        <div className="bg-white max-w-[250px] w-[250px] rounded-md p-1 absolute bottom-full right-0 shadow-md">
                            {
                                props.user.profile.user.username == props.video.video_chat.host.username &&
                                <>
                                    {/* <div
                                        className="py-2 px-3 hidden md:block hover:bg-gray-100 cursor-pointer rounded-md mb-2 text-[#2f3f69]"
                                        onClick={meeting_recording_handler}
                                    >
                                        {
                                            props.utility.recording ?
                                                'Stop Recording'
                                                :
                                                'Start Recording'
                                        }
                                    </div> */}
                                    {/* {

                                        props.utility.recording_available &&
                                        <div
                                            className="py-2 px-3 hidden md:block hover:bg-gray-100 cursor-pointer rounded-md mb-2 text-[#2f3f69]"
                                            onClick={() => {
                                                setMoreDropDown(false)
                                            }}
                                        >
                                            Download Recording
                                        </div>
                                    } */}
                                </>
                            }
                            <div
                                className="py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md text-[#2f3f69]"
                                onClick={() => {
                                    setMoreDropDown(false)
                                    // let a = document.createElement('a');
                                    // a.target = '_blank';
                                    // a.href = '/whiteboard';
                                    // a.click();
                                    onWhiteboard()
                                }}
                            >
                                White Board
                            </div>
                            {
                                props.user.profile.user.username == props.video.video_chat.host.username &&
                                <div
                                    className="py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md text-[#2f3f69]"
                                    onClick={() => {
                                        props.MakeActiveTab({ tab: 'SETTINGS' })
                                        setMoreDropDown(false)
                                    }}
                                >
                                    Security Settings
                                </div>
                            }
                            <div
                                className="py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md text-red-600"
                                onClick={() => {
                                    LeaveMeeting()
                                }}
                            >
                                Leave Meeting
                            </div>
                        </div>
                    }
                </div>
                {/* <MenuIcon
                    icon={
                        <>
                            <svg className="w-[18px] h-[18px] md:w-[26px] md:h-[26px]" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="fill-[#ff7070]" d="M19.4998 30C19.8976 30 20.2791 29.842 20.5604 29.5607C20.8417 29.2794 20.9998 28.8978 20.9998 28.5C20.9998 28.1022 20.8417 27.7206 20.5604 27.4393C20.2791 27.158 19.8976 27 19.4998 27H6.99992C5.93907 27 4.92166 26.5786 4.17153 25.8284C3.42139 25.0783 2.99997 24.0609 2.99997 23V7C2.99997 5.93913 3.42139 4.92172 4.17153 4.17157C4.92166 3.42143 5.93907 3 6.99992 3H19.4998C19.8976 3 20.2791 2.84196 20.5604 2.56066C20.8417 2.27936 20.9998 1.89782 20.9998 1.5C20.9998 1.10218 20.8417 0.720644 20.5604 0.43934C20.2791 0.158035 19.8976 0 19.4998 0H6.99992C5.14343 0 3.36297 0.737498 2.05023 2.05025C0.73749 3.36301 0 5.14348 0 7V23C0 24.8565 0.73749 26.637 2.05023 27.9497C3.36297 29.2625 5.14343 30 6.99992 30H19.4998ZM21.4818 7.398C21.6265 7.26428 21.7961 7.16039 21.9809 7.09224C22.1658 7.02409 22.3623 6.99303 22.5592 7.00083C22.756 7.00863 22.9494 7.05514 23.1283 7.1377C23.3072 7.22026 23.4681 7.33726 23.6017 7.482L29.6017 13.982C29.8578 14.2591 30 14.6226 30 15C30 15.3774 29.8578 15.7409 29.6017 16.018L23.6017 22.518C23.3315 22.81 22.9563 22.9827 22.5587 22.9981C22.1612 23.0134 21.7738 22.8703 21.4818 22.6C21.1898 22.3297 21.0171 21.9546 21.0017 21.557C20.9863 21.1594 21.1295 20.772 21.3998 20.48L25.0757 16.498H9.49989C9.10207 16.498 8.72055 16.34 8.43925 16.0587C8.15794 15.7774 7.99991 15.3958 7.99991 14.998C7.99991 14.6002 8.15794 14.2186 8.43925 13.9373C8.72055 13.656 9.10207 13.498 9.49989 13.498H25.0737L21.3978 9.516C21.264 9.3713 21.1602 9.20167 21.092 9.01681C21.0239 8.83195 20.9928 8.63547 21.0006 8.4386C21.0084 8.24173 21.0549 8.04833 21.1375 7.86943C21.22 7.69054 21.337 7.52967 21.4818 7.396V7.398Z" />
                            </svg>
                        </>
                    }
                    color='black'
                    text='leave'
                    active={true}
                /> */}
            </div>
        </>
    )
}

const mapState = state => {
    return state
}

const mapDispatch = {
    addUserMedia: addUserMedia,
    MakeActiveTab: MakeActiveTab,
    AddToPinnedStream: AddToPinnedStream
}

export default connect(mapState, mapDispatch)(MenuBlock)