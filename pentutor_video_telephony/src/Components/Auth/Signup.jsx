import { useState } from "react"
import { connect, useDispatch } from "react-redux"
import { LoginHandler } from "../../redux/actions/Auth"
import Cookies from 'js-cookie'
import { useNavigate, useParams, useSearchParams } from "react-router-dom"


const Login = (props) => {
    const [login_data, setLoginData] = useState({})
    const [params, setsearc] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const LoginHandler = () => {
        props.LoginHandler(
            login_data,
            (result) => {
                Cookies.set('auth_token', result.access_token, { expires: 45 })
                dispatch({
                    type: 'ADD_OR_REMOVE_SNACK_BAR',
                    payload: {
                        message: 'Login Successful',
                        type: 'success'
                    }
                })

                navigate(params.get('next') ? params.get('next') : '/')
            },
            () => {
                dispatch({
                    type: 'ADD_OR_REMOVE_SNACK_BAR',
                    payload: {
                        message: 'Authentication Fail',
                        type: 'error'
                    }
                })
            }
        )
    }

    return (
        <>
            <div>
                <div className="max-w-[400px] mb-3 bg-white shadow-lg rounded-lg w-full p-4">
                    <h3 className="text-gray-900 text-3xl text-center mb-3">Welcome back!</h3>
                    <p className="text-center text-gray-600">Login with Credentials</p>
                    <div className="my-4">
                        <div>
                            <input type="text" placeholder="example@mail.com"
                                className="px-4 py-2 w-full outline-none mb-3 bg-transparent rounded-md border-2 border-gray-200 focus:border-indigo-400"
                                onChange={e => {
                                    setLoginData({
                                        ...login_data,
                                        username: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <input type="password" placeholder="*******"
                                className="px-4 py-2 w-full outline-none mb-3 bg-transparent rounded-md border-2 border-gray-200 focus:border-indigo-400"
                                onChange={e => {
                                    setLoginData({
                                        ...login_data,
                                        password: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div
                            className="bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-center px-4 py-2 cursor-pointer"
                            onClick={() => {
                                LoginHandler()
                            }}
                        >Login</div>
                    </div>
                </div>
                <p>Don't have account? <span
                    className="text-indigo-500 cursor-pointer"
                    onClick={() => {
                        navigate('/signup')
                    }}
                >Signup</span></p>
            </div>
        </>
    )
}


const mapState = state => {
    return state
}

const mapDispatch = {
    LoginHandler: LoginHandler
}

export default connect(mapState, mapDispatch)(Login)