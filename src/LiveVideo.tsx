import { useState } from "react";
import { useParams } from "react-router-dom";
import ConversationIcon from './ConversationIcon'
import CallEndIcon from '@mui/icons-material/CallEnd';

import MicIcon from '@mui/icons-material/Mic';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import {
  // LocalUser,
  // RemoteUser,
  useJoin,
  //     useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { Button, CircularProgress, IconButton, Typography } from "@mui/material";


export const LiveVideo = () => {

  const appId = 'e7f6e9aeecf14b2ba10e3f40be9f56e7'
  // const agoraEngine = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client
  const { channelName, uid, rid, sid,ticketId,flag } = useParams() //pull the channel name from the param

  // set the connection state
  const [activeConnection, setActiveConnection] = useState(true);

  // track the mic/video state - Turn on Mic and Camera On
  const [micOn, setMic] = useState(true);

  const [isLoading, setLoader] = useState(false)
  //   const [cameraOn, setCamera] = useState(true);

  // get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  //   const { localCameraTrack } = useLocalCameraTrack(cameraOn);



  // Join the channel
  useJoin(
    {
      appid: appId,
      channel: channelName!,
      token: null,
      uid: parseInt(uid || '')
    },
    activeConnection,
  );

  usePublish([localMicrophoneTrack]);

  //remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // play the remote user audio tracks
  audioTracks.forEach((track) => track.play());


  const handleCloseWindow = () => {

    setLoader(true)

    const params = {
      "channel": channelName,
      "sid": sid,
      "rid": rid,
      "uid": uid,
      "ticket_id": ticketId 
    }
    
    

      if(flag === "678") {
        
          const options = {
              headers: {
                  "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(params),
          }

          fetch("https://kapdemo.kapturecrm.com/ms/kreport/noauth/stop-call-recored", options)
            .then(res => res.json())
            .then(connectionParam => {
                console.log(connectionParam)
                setActiveConnection(false)
                setLoader(false)
                window.close()
              }
            )
      } else {
        alert("You are not allowed to perform this action")
      }
  }

  return (
    <>
      {/* <div id='remoteVideoGrid'>
        { 
          // Initialize each remote stream using RemoteUser component
          remoteUsers.map((user) => (
            <div key={user.uid} className="remote-video-container">
              <RemoteUser user={user} /> 
            </div>
          ))
        }
      </div> */}

      <ConversationIcon />

      <div id="mediaControls">
        <IconButton style={localMicrophoneTrack ? { color: "#139905", outline: "none" } : { color: "#959595", outline: "none" }} onClick={() => setMic(a => !a)}>
          <MicIcon />
        </IconButton>
      </div>
      {/* <div id='localVideo'>
        <LocalUser
          audioTrack={localMicrophoneTrack}
      //     videoTrack={localCameraTrack}
      //     cameraOn={cameraOn}
          micOn={micOn}
          playAudio={micOn}
      //     playVideo={cameraOn}
          className=''
        />
        <div> */}
      {/* media-controls toolbar component - UI controling mic, camera, & connection state  */}
      {/* <div id="controlsToolbar">
            <div id="mediaControls">
              <IconButton className="btn" onClick={() => setMic(a => !a)}>
                <MicIcon />
              </IconButton>
              <button className="btn" onClick={() => setCamera(a => !a)}>
                Camera
              </button>
            </div>
           
            
          </div>
        </div>
      </div> */}

      { flag === "678" ?
          <div className="disconnect-button-wrapper">
            <Button variant="contained" className="disconnect-button" color="error"
              onClick={handleCloseWindow}>
                { isLoading ?  
                    <>
                      Disconnecting...
                    </> : (
                    <>
                      <CallEndIcon style={{ paddingRight: "10px" }} />
                      Disconnect
                    </>
                )}
            </Button>
          </div>
          : 
          <Typography style={{color: "#416D19", fontSize: "15px", fontWeight: "600", alignItems: "center", display: "flex"}}>
              <TaskAltIcon style={{paddingRight: "10px" , fontSize: "40px", color: "#416D19"}}/> Connected with Kapture Support
          </Typography>
      }

    </>
  )
}