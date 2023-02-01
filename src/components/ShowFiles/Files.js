import React, {useContext} from 'react'
import "./files.css"
import { FileContext } from '../../Context'

export default function Files() {
  const {files} = useContext(FileContext)

  return (
    <div className='card flex-grow-1 mt-3 p-3' style={{width: "30rem"}}>
    
     <div className="container files__container" >
 
       <h4><b>Received Files</b></h4>
       {
        files.map( file => 
      
          <div  class="alert alert-light" role="alert" style={{cursor:"pointer"}}>
           <a style={{textDecoration: "none", color:"inherit"}} href={file.url} download={file.name}><i class="fa-solid fa-download"></i>  {file.name}</a> 
          </div> )
       }
      
      
     </div>
   </div>
  )
}
