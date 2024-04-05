import { useEffect, useState } from 'react'
import CallLoading from './CallLoading'

interface ConnectFormProps {
  connectToVideo: (channelName: string, uid: number) => void
}

export const ConnectForm = ({ connectToVideo } : ConnectFormProps) => {

  const [channelName, setChannelName] = useState('')
  const [uid, setUid] = useState('')
  const [isLoading, setLoader] = useState(false)
  const [invalidInputMsg, setInvalidInputMsg] = useState('')



   

  const handleConnect = () => {
    // trim spaces
    setLoader(true)
    // const trimmedChannelName = channelName.trim()
    
    // // validate input: make sure channelName is not empty
    // if (trimmedChannelName === '') {
    //   e.preventDefault() // keep the page from reloading on form submission
    //   setInvalidInputMsg("Channel name can't be empty.") // show warning
    //   setChannelName('') // resets channel name value in case user entered blank spaces 
    //   return;
    // } 

    const connectionParam = {
      "chanelName":"test",
      "uid":12134
    }

    setTimeout(()=> {
      setLoader(false)
      connectToVideo(connectionParam.chanelName, connectionParam.uid)
    }, 10000)


  }

  return (
    <>
      {  isLoading &&  <CallLoading /> }
      <div className="card">
        {/* <input 
          id="channelName"
          type='text'
          placeholder='Channel Name'
          value={channelName}
          onChange={(e) => {
            setChannelName(e.target.value)
            setInvalidInputMsg('') // clear the error message
          }}
        />
        <input 
          id="UID"
          type='text'
          placeholder='UID'
          value={uid}
          onChange={(e) => {
            setUid(e.target.value)
            setInvalidInputMsg('') // clear the error message
          }}
        /> */}
         {  !isLoading && <button className="connect-button" onClick={handleConnect}>Connect Now</button> }
        {/* { invalidInputMsg && <p style={{color: 'red'}}> {invalidInputMsg} </p>} */}
      </div>
     </>
  )
}