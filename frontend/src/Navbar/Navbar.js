import React from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();

  return (
    <div className='navbars'>
      <div style={{display:'flex', width:"70%"}}>
        <div className='title' onClick={()=>{
          navigate("/")
        }}>Excellence Electric Car Repair</div>
        </div>
      </div>
      
  )
}

export default Navbar