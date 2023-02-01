import React, {useState, useRef, useContext} from 'react'
import "./upload.css"
import uploadImage from "../../assets/upload.jpg"
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FileContext } from '../../Context'

export default function UploadCard() {

  const {isConnected,sendFile,loading, progress, connection} = useContext(FileContext)

    console.log(connection)
  const [file,setFile] = useState(null)
  const fileRef = useRef(null)
  

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function formatFileName(name)
{
  if(name.length <= 20)
  return name
  else
  return name.substr(0,20)+"..."
}

const progressElement = <div style={{height: "150px",width:"150px"}} className='mx-auto'>
                      <CircularProgressbarWithChildren styles={{
                        path: {
                          stroke: "#FA7268"
                        }
                      }}  value={progress}>
                     
                      <h2>{progress.toString().split(".")[0]}%</h2>

</CircularProgressbarWithChildren>
</div>


  return ( 
    <div className='card p-3'  >
     <input ref={fileRef} onChange={e => setFile(e.currentTarget.files[0])} className='input' type="file" />
     <div className='upload__header__container p-2' >
        <h4 className='font-monospace text-center text-muted'>Secure & Fast Tranfer</h4>
        
          {
            loading == false ? 
            <img onClick={() => fileRef.current.click()} src={uploadImage} width="100%" /> :
       
            progressElement
    
          }
        
        {
          file &&
          <div class="alert alert-light my-1" role="alert">
          <span ><i class="fa-solid fa-file"></i> { formatFileName(file.name)}</span>
          <span style={{float:"right"}}>{formatBytes(file.size)}</span>
          </div>

        }
       
     </div>

      <div className="container mt-3">
      {
        isConnected && file && !loading ?
        <button className='btn btn-primary  w-100' onClick={() => sendFile(file)} > Send File</button>
         :
        <button className='btn btn-primary  w-100' disabled > Send File</button>
      }
       
      </div>
      
    </div>
  )
}
