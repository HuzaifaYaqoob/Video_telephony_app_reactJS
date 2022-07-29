
import { SketchField, Tools } from 'react-sketch-whiteboard'



const BoardTool = () => {
    return (
        <>
            <div className='cursor-pointer'>
                tool
            </div>
        </>
    )
}




const SketchFieldDemo = () => {

    const all_toots = [
        'arrow',
        'line',
        'pan',
        'pencil',
        'pointer',
    ]
    return (
        <div className='relative' >
            <div className='absolute top-10 left-10 bg-white p-2 rounded-md shadow-lg flex gap-3'>
                {
                    all_toots.map((tl, index) => {
                        return (
                            <BoardTool />
                        )
                    })
                }
            </div>
            <SketchField
                width='100%'
                className='bg-gray-100'
                height='100vh'
                tool={Tools.Pencil}
                lineColor='#000'
                lineWidth={3}
                value={{}}
            />
        </div>
    )
}





const WhiteboardScreen = () => {
    return (
        <>
            <SketchFieldDemo />
        </>
    )
}

export default WhiteboardScreen