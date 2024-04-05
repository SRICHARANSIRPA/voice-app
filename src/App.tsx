import { Route, Routes, useNavigate } from 'react-router-dom'
import { ConnectForm } from './ConnectForm'
import { LiveVideo } from './LiveVideo'

import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";

import './App.css'

function App() {
  const navigate = useNavigate()
  const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client

  const handleConnect = (channelName: string, uid: string) => {
    navigate(`/via/${channelName}/${uid}`) // on form submit, navigate to new route
  }

  return (
    <Routes>
      <Route path='/' element={ <ConnectForm connectToVideo={ handleConnect } /> } />
      <Route path='/via/:channelName/:uid' element={
        <AgoraRTCProvider client={agoraClient}>
          <LiveVideo />
        </AgoraRTCProvider>
      } />
    </Routes>
  )
}

export default App
