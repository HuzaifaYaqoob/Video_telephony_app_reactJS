

import Homepage from "./Pages/Homepage";
import StreamPage from "./Pages/videoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { connect } from "react-redux";
import Cookies from "js-cookie";

import { useEffect } from "react";
import BaseURL, { user_websocket_url, wsBaseURL } from "./redux/ApiVariables";
import LoginPage from "./Pages/Auth/LoginPage";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Triangle } from 'react-loader-spinner'
import { get_user } from "./redux/actions/Auth";


function App(props) {
  const loading_size = 80

  const userWebSocket = () => {
    let user_socket = new WebSocket(wsBaseURL + user_websocket_url + '?token=42b2bd5cc061eecf20bde62c301314a42316690c')
    user_socket.onopen = (event) => {
    }

    user_socket.onmessage = (event) => {
    }

    user_socket.onclose = (event) => {
    }

    user_socket.onerror = (event) => {
    }
  }


  const get_user_handler = () => {
    props.get_user(
      {},
    )
  }


  useEffect(() => {
    if (Cookies.get('auth_token')) {
      get_user_handler()
    }
    // userWebSocket()

  }, [])
  return (
    <>
      {
        props.utility.loading ?
          <div className="cover fixed bg-gray-100/50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <Triangle ariaLabel="indicator" color='blue' width={loading_size} height={loading_size} />
          </div>
          :
          <></>
      }
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/:video_chat_id" element={<StreamPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


const mapState = (state) => state

const mapDispatch = {
  get_user: get_user
}

export default connect(mapState, mapDispatch)(App);
