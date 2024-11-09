import React, { useEffect, useState } from 'react'
import "./style.css";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  const navigate = useNavigate();
  useEffect(()=>{
    axios.get("http://localhost:5000/vehicles/").then((result) => {
      setVehicles(result.data);
      console.log(result.data);
      
    }).catch((err) => {
      console.error(err);
    });
  }, [])


  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 لأن الأشهر تبدأ من 0
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // تحويل 24 ساعة إلى 12 ساعة
    hours = hours ? String(hours).padStart(2, '0') : '12'; // إذا كانت الساعة 0، اجعلها 12
    return ` ${hours}:${minutes} ${ampm} - ${day}/${month}/${year}`;
  }

  return (
    <div className='container-veh'>
      <div className='veh-main'>
        <div className='title-veh'>
          All Cars
        </div>

        <div style={{height:"94%", boxShadow:"0px 0px 4px 1px #ededed", borderRadius:"8px", marginTop:"4px", padding:"10px"}}>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%", height:"5%", justifyItems:"center",borderBottom:"1px solid #ededed", marginBottom:"2.5px", fontWeight:"bold"}}>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>Car Type</div>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>car Model</div>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>Owner</div>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>Repair Requests</div>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>first Visit</div>
            </div>
          {vehicles.map((item, index) => (
            <>
            <div className='div-car'
            onClick={()=>{
              console.log(item.vehicle.VIN);
              navigate(`/vehicle/${item.vehicle.VIN}`)
            }}
            >
              <div style={{width:"15%", display:"flex", alignItems:"center", paddingLeft:"5px"}}>{item.vehicle.carType}</div>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>{item.vehicle.carModel}</div>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>{item.owner.name}</div>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>{item.totalRepairRequests}</div>
              <div style={{width:"15%", display:"flex", alignItems:"center"}}>
                {formatDate(item.owner.firstVisit)}

                
                </div>
            </div>
                  
            </>
          ))}
        </div>

        


      </div>
      
    </div>
  )
}

export default Vehicles
