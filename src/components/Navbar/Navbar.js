import React from 'react'
import "./navbar.css"
export default function Navbar() {
  return (
    <nav className="navbar " style={{backgroundColor:"transparent"}}>
        <div className="container ">
            <a className="navbar-brand" href="#">
              <h2 style={{color:"white"}}>
                <span className='darkFont' >Send</span>
                <span className='darkFont' >Mb</span>
              </h2>
            </a>
            
        </div>
</nav>

  )
}
