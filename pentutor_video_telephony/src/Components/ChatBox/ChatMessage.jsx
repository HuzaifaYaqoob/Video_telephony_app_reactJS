


const ChatMessage = () => {
    return (
        <>
            <div className="flex items-start gap-3 mb-4">
                <div
                    className="w-[45px] h-[45px] rounded-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1639762681057-408e52192e55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxMHx8YmxvY2slMjBjaGFpbnxlbnwwfHx8fDE2NTU5NjE5MzM&ixlib=rb-1.2.1&q=80&w=1080I")'
                    }}
                >
                </div>
                <div className="flex-1">
                    <div className="bg-white rounded-lg px-4 py-1 max-w-max shadow-md">
                        <p>Huzaifa</p>
                        <span className="text-sm text-gray-700">hello buddy kesay ho how are you</span>
                    </div>
                    <span className="text-xs text-gray-500">4 min ago</span>
                </div>
            </div>
        </>
    )
}

export default ChatMessage