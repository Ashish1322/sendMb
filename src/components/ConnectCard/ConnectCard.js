import React, {useContext, useState} from 'react'
import "./connect.css"
import { FileContext } from '../../Context'

export default function ConnectCard() {
  const {id, connect,disconnect, isConnected, connection} = useContext(FileContext)
  const [remoteId,setRemoteId] = useState("")


  const copyId = () => {
    navigator.clipboard.writeText(id)
  }

  return (
    <div className='card p-3' style={{width: "30rem"}}>
    
      <p className='text-center form-text mt-2' >Connect With Your Peer</p>

     <div className='container'>

      <input
        type="text"
        className="form-control"
        placeholder='Enter id of receiver'
        onChange={e => setRemoteId(e.currentTarget.value)}
        value={remoteId}
      />
   
     

      <div className='mt-2 d-flex' style={{gap:"1rem"}}>
      {
        !isConnected ? 
        <button type='button' onClick={() => connect(remoteId) } className='btn btn-primary flex-grow-1' >Connect</button> 
        :
        <button type='button' onClick={disconnect} className='btn btn-danger flex-grow-1' >Disconnect</button>
      }
      
      <button type='button' onClick={copyId} className='btn btn-primary'  ><i class="fa-solid fa-clipboard"></i> Copy My Id</button>
      </div>
      
    </div>

   </div>
  )
}
