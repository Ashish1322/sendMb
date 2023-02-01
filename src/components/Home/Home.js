import React, {useContext} from 'react'
import "./home.css"
import UploadCard from "../UploadCard/UploadCard"
import ConnectCard from "../ConnectCard/ConnectCard"
import Files from "../ShowFiles/Files"
import Navbar from '../Navbar/Navbar'
import { FileContext } from '../../Context'

export default function Home() {

  return (
    <div>
    <Navbar />
       <div className='d-flex g-2 p-2 mt-md-5 justify-content-center flex-wrap' style={{gap: "1rem"}}>
          <div>
            <UploadCard />
          </div>
          <div className='d-flex flex-column justify-content-between'>
            <ConnectCard />
            <Files />
          </div>
       </div>
        <div className="stacked_bg stacked_bg_image"></div>
    </div>
   
  )
}
