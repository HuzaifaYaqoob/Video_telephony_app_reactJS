import Cookies from "js-cookie"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"



const Header = (props) => {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-full">
                <div className="py-3 px-3 max-w-[1300px] gap-5 w-full mx-auto flex items-center justify-between">
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/images/logo.webp`} className='w-[260px]' alt="" />
                    </div>
                    {
                        props.user.profile?.user && Cookies.get('auth_token') &&
                        <div className="flex items-center gap-4">
                            <div
                                className="bg-gray-900 text-white px-3 py-2 rounded-md cursor-pointer hover:shadow-lg"
                                onClick={() => {
                                    Cookies.remove('auth_token')
                                    navigate(0)
                                }}
                            >
                                Logout
                            </div>
                            <div className="w-[55px] h-[55px] bg-gray-200 rounded-full flex items-center justify-center capitalize text-[25px]">
                                {props.user.profile?.user.username[0]}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}


const mapState = state => {
    return state
}

export default connect(mapState, null)(Header)