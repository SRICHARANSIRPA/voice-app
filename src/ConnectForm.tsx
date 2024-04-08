import { useState } from 'react'
import CallLoading from './CallLoading'
import { IconButton, Tooltip } from '@mui/material'
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

const popupCenter = ({ url, title, w, h } : { url: string, title: string, w: number, h: number }) => {
  // Fixes dual-screen position
  let dualScreenLeft = window.screenLeft;
  if (dualScreenLeft === undefined) {
      dualScreenLeft = window.screenX;
  }
  let dualScreenTop = window.screenTop;
  if (dualScreenTop === undefined) {
      dualScreenTop = window.screenY;
  }

  let width = window.innerWidth;
  if (!width) {
      width = document.documentElement.clientWidth;
      if (!width) {
          width = screen.width;
      }
  }
  
  let height = window.innerHeight;
  if (!height) {
      height = document.documentElement.clientHeight;
      if (!height) {
          height = screen.height;
      }
  }

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
      url,
      title,
      `
    scrollbars=yes,
    width=${w / systemZoom}, 
    height=${h / systemZoom}, 
    top=${top}, 
    left=${left},
    resizable=no,
    status=no,
    toolbar=no,
    menubar=no,
    location=no
    `,

  );
  
  if (newWindow) {
      newWindow.focus();
  } else {
      // Handle case where window.open returns null
      console.error('Popup window blocked or failed to open.');
  }
  
};


export const ConnectForm = () => {

  // const [callIP, setCallIP] = useState(false)
  const [isLoading, setLoader] = useState(false)

  const handleConnect = () => {
    setLoader(true)

    // const connectionParam = {
    //   chanelName: "test1",
    //   uid: "1244"
    // }

    fetch("https://kapdemo.kapturecrm.com/ms/kreport/noauth/get-call-detail")
      .then(res => res.json())
          .then(connectionParam => {
            setLoader(false)
            // setCallIP(true)
          
            popupCenter({url: `https://voice-app-seven.vercel.app/via/${connectionParam.chanelName}/${connectionParam.uid}/_/_/_/_/`, title: "KapCall - Real Time", w: 650, h: 500})

            location.href = `https://webdemo.agora.io/basicVoiceCall/index.html?appid=02e71be652c7402797cb26762cb4114d&channel=${connectionParam.chanelName}&uid=${connectionParam.uid}`
          }
    )

   
  

  }

  return (
    <>
      {  isLoading &&  <CallLoading /> }
   
      <div className="card">
           <Tooltip title="Start Call" >
           
                <IconButton style={{ display: isLoading ? 'none' : 'flex' }} className="connect-button-call" color="success" onClick={handleConnect}>
                  <AddIcCallIcon fontSize='small'/>
                </IconButton> 
                
          </Tooltip>
      </div>
    
     </>
  )
}