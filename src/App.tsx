import { Route, Routes } from 'react-router-dom'
import { ConnectForm } from './ConnectForm'
import { LiveVideo } from './LiveVideo'

import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";

import './App.css'

function App() {
  const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client


  return (
    <Routes>
      <Route path='/' element={ <ConnectForm /> } />
      <Route path='/via/:channelName/:uid/:rid/:sid/:ticketId/:flag' element={
        <AgoraRTCProvider client={agoraClient}>
          <LiveVideo />
        </AgoraRTCProvider>
      } />
    </Routes>
  )
}

export default App
