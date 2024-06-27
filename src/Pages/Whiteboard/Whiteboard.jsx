
import { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { SketchField, Tools } from 'react-sketch-whiteboard'



const BoardTool = ({ data, active, onClick }) => {
    return (
        <>
            <div
                className={`cursor-pointer w-[35px] h-[35px] flex items-center justify-center ${active && 'bg-gray-200'} rounded`}
                onClick={() => {
                    onClick(data.name)
                }}
            >

                {data.icon}
            </div>
        </>
    )
}




const SketchFieldDemo = ({...props}) => {
    const [selected_tool, setSelected] = useState('pencil')
    const sketch = useRef()
    const imgage = useRef()

    const handle_select_tool = (name) => {
        setSelected(name)
    }


    const handleWhiteboardUpdate = () =>{
        if (document != undefined){
            const img = sketch?.current?.toDataURL('image/png')
            // imgage.current.src = img
            if (props?.socket?.active_video_socket){
                props.socket.active_video_socket.send(
                    JSON.stringify({
                        type: 'WHITE_BOARD_DATA',
                        isActive: true,
                        image: img,
                        sender : props?.user?.profile?.user?.username,
                    })
                )
            }
        }
    }

    useEffect(() => {
        setInterval(() => {
            handleWhiteboardUpdate()
        }, 1000);
    }, [sketch])

    useEffect(() => {
        if (props?.socket?.active_video_socket){
            props.socket.active_video_socket.send(
                JSON.stringify({
                    type: 'WHITE_BOARD_DATA',
                    isActive: true,
                    image: ''
                })
            )
        }
    }, [])
    const all_toots = [
        {
            name: 'arrow',
            icon: <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L8 20L10.051 13.846C10.3455 12.9623 10.8418 12.1592 11.5005 11.5005C12.1592 10.8418 12.9623 10.3455 13.846 10.051L20 8L1 1Z" stroke="black" stroke-width="2" stroke-linejoin="round" />
            </svg>
            ,
        },
        {
            name: 'line',
            icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.353553" y1="0.646447" x2="15.3536" y2="15.6464" stroke="black" />
            </svg>

            ,
        },
        {
            name: 'rectangle',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.75" y="0.75" width="22.5" height="22.5" stroke="black" stroke-width="1.5" />
            </svg>
        },
        {
            name: 'pan',
            icon: <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 0L5.5 4.5H13.5L9.5 0ZM4.5 5.5L0 9.5L4.5 13.5V5.5ZM14.5 5.5V13.5L19 9.5L14.5 5.5ZM9.5 7.5C8.96957 7.5 8.46086 7.71071 8.08579 8.08579C7.71071 8.46086 7.5 8.96957 7.5 9.5C7.5 10.0304 7.71071 10.5391 8.08579 10.9142C8.46086 11.2893 8.96957 11.5 9.5 11.5C10.0304 11.5 10.5391 11.2893 10.9142 10.9142C11.2893 10.5391 11.5 10.0304 11.5 9.5C11.5 8.96957 11.2893 8.46086 10.9142 8.08579C10.5391 7.71071 10.0304 7.5 9.5 7.5ZM5.5 14.5L9.5 19L13.5 14.5H5.5Z" fill="black" />
            </svg>
            ,
        },
        {
            name: 'pencil',
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.333 13.9484L14.57 1.71043C15.0534 1.2478 15.6988 0.992841 16.3679 1.00015C17.037 1.00747 17.6767 1.27647 18.1499 1.74956C18.6231 2.22265 18.8923 2.86222 18.8998 3.53132C18.9073 4.20042 18.6525 4.84586 18.19 5.32943L5.951 17.5674C5.6718 17.8467 5.31619 18.037 4.929 18.1144L1 18.9004L1.786 14.9704C1.86345 14.5832 2.05378 14.2276 2.333 13.9484V13.9484Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.5 4.40039L15.5 7.40039" stroke="black" stroke-width="2" />
            </svg>

            ,
        },
        {
            name: 'remove',
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2651 0.651613C10.4757 0.442977 10.7254 0.278012 11 0.166197C11.2745 0.0543823 11.5685 -0.0020788 11.8649 5.84852e-05C12.1613 0.00219577 12.4544 0.0628892 12.7273 0.178651C13.0002 0.294414 13.2475 0.462962 13.4551 0.674613L18.3651 5.68261C18.7788 6.10448 19.01 6.67216 19.0087 7.26305C19.0074 7.85393 18.7737 8.42059 18.3581 8.84061L16.1011 11.1216C15.3566 10.954 14.5818 10.9785 13.8494 11.1927C13.117 11.4069 12.4511 11.8039 11.9143 12.3463C11.3775 12.8887 10.9874 13.5587 10.7808 14.2933C10.5742 15.0279 10.5578 15.8029 10.7331 16.5456L8.9491 18.3486C8.53044 18.7718 7.96113 19.0119 7.36585 19.0162C6.77057 19.0205 6.19785 18.7887 5.7731 18.3716L0.673102 13.3636C0.460459 13.1547 0.291454 12.9056 0.175903 12.6308C0.0603532 12.356 0.000562193 12.061 3.94557e-06 11.7629C-0.000554301 11.4648 0.0581314 11.1695 0.172652 10.8943C0.287172 10.6191 0.455243 10.3693 0.667102 10.1596L10.2651 0.651613ZM1.7221 11.2256C1.65155 11.2956 1.5956 11.3789 1.55751 11.4707C1.51943 11.5624 1.49996 11.6609 1.50024 11.7602C1.50051 11.8596 1.52054 11.9579 1.55914 12.0495C1.59774 12.1411 1.65416 12.224 1.7251 12.2936L6.8241 17.3016C6.9657 17.4404 7.15649 17.5175 7.35475 17.516C7.55302 17.5145 7.74262 17.4345 7.8821 17.2936L9.3501 15.8106L3.2511 9.71061L1.7221 11.2256ZM15.1141 19.0136C16.0424 19.0136 16.9326 18.6449 17.589 17.9885C18.2454 17.3321 18.6141 16.4419 18.6141 15.5136C18.6141 14.5854 18.2454 13.6951 17.589 13.0387C16.9326 12.3824 16.0424 12.0136 15.1141 12.0136C14.1858 12.0136 13.2956 12.3824 12.6392 13.0387C11.9829 13.6951 11.6141 14.5854 11.6141 15.5136C11.6141 16.4419 11.9829 17.3321 12.6392 17.9885C13.2956 18.6449 14.1858 19.0136 15.1141 19.0136Z" fill="black" />
            </svg>
        }
    ]
    return (
        <div className='relative w-full' >
            <div className='absolute top-10 left-10 bg-white p-2 rounded-md shadow-lg flex gap-3 z-20'>
                {
                    all_toots.map((tl, index) => {
                        return (
                            <BoardTool
                                data={tl} active={selected_tool == tl.name ? true : false}
                                onClick={handle_select_tool}
                            />
                        )
                    })
                }
            </div>
            <SketchField
                ref={sketch}
                id='whiteboard'
                width='100%'
                className='bg-gray-100'
                height='100vh'
                tool={selected_tool}
                lineColor='#000'
                lineWidth={3}

            />
            {/* <img src="" ref={imgage} alt="" className='w-[100px] h-[100px]' /> */}
        </div>
    )
}





const WhiteboardScreen = (props) => {
    return (
        <>
            <SketchFieldDemo {...props} />
        </>
    )
}



const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(WhiteboardScreen)