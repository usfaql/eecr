import React, { useEffect, useRef, useState } from 'react'
import "./style.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import w124 from "../assets/images/mercedes.jpg"
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoMdAdd } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { BsClipboard2Fill } from "react-icons/bs";
import printCard from "../PrintCard/PrintCard";
import PrintInvoice from "../PrintInvoice/PrintInvoice";
import PrintCard from '../PrintCard/PrintCard';

function OneClient() {
    const navigate = useNavigate();
    const [client, setClient] = useState('');
    const { id } = useParams();
    const [orderRepair, setOrder] = useState(/*Array(10).fill("")*/);

    const [openOrderIndex, setOpenOrderIndex] = useState(null);
    const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [show, setShow] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowInvoice = () => setShowInvoice(true);
    const handleCloseInvoice = () => setShowInvoice(false);
    const handleCloseOrder = ()=> setShowOrder(false);
    const handleShowOrder = ()=> setShowOrder(true);
    const [invoiceName, setInvoiceName] = useState('فاتورة رقم 1');
    const [invoiceCar, setInvoiceCar] = useState(null);
    const [itemCosts, setItemCosts] = useState({}); 
    const [itemNames, setItemNames] = useState({}); 
    const [wage, setWage] = useState('');
    const [currentInvoice, setCurrentInvoice] = useState(0);
    const [isPaidM, setisPaidM] = useState(0);
    const [isNotPaidM, setisNotPaidM] = useState(0);
    const [lastServiceDate, setLastServiceDate] = useState("");
    const [lastServiceTime, setLastServiceTime] = useState("");
    useEffect(()=>{
        setisPaidM(0);
        setisNotPaidM(0);
        axios.get(`http://localhost:5000/client/${id}`).then((result) => {
        setClient(result.data);
        
        result.data.vehicles.forEach((e)=>{
            setLastServiceDate(e.repairRequests[e.repairRequests.length-1].date)
            setLastServiceTime(e.repairRequests[e.repairRequests.length-1].time)
            axios.get(`http://localhost:5000/vehicle/invoice/${e._id}`).then((result) => {
            
                result.data.data.forEach((e) => {
                    
                    
                    if (e.isPaid) {
                        setisPaidM((prevValue) => prevValue + e.totalAmount);  
                    } else {
                        setisNotPaidM((prevValue) => prevValue + e.totalAmount); 
                    }
                });
               
                
            }).catch((err) => {
                
            });
        });
        
        }).catch((err) => {
            
        });
        
    },[newItem])



    

    
    if (!client) {
        return <div>Loading...</div>;
    }

  return (
    <div className='container-vehicle-one'>
      <div className='bar-info'>
        <div style={{display:'flex', flexDirection:"column", width:"100%", justifyContent:"start",padding:"10px 0", gap:"10px"}}>
            <div style={{display:"flex", justifyContent:"start" , cursor:"default"}}>
            <div style={{fontSize:"26px", fontWeight:"bold"}}>{client.name}</div>
            </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{display:"flex", textAlign:'start', width:"80%",  gap:"5%", cursor:"default"}}>
            <div>
                <div style={{fontSize:"14px"}}>
                    National ID
                </div>
                <div style={{fontWeight:"bold"}}>
                    {client.nationalID}
                </div>
            </div>
            
            <div>
                <div style={{fontSize:"14px"}}>
                    Gender
                </div>
                <div style={{fontWeight:"bold"}}>
                    {client.gender}
                </div>
            </div>

            <div>
                <div style={{fontSize:"14px"}}>
                    Phone
                </div>
                <div style={{fontWeight:"bold"}}>
                    {client.phoneNumber}
                </div>
            </div>

            </div>
            <div>
            <div style={{fontSize:"14px"}}>
                    Total Amount 
                </div>
                <div style={{fontWeight:"bold",textAlign:"start"}}>
                    {isPaidM + isNotPaidM}
                </div>
            </div>
            
        </div>
            
        </div>
            
      </div>


      <div className='container-info' style={{marginTop:"10px"}}>
      <div style={{width:"100%", textAlign:"start", fontWeight:"bold", fontSize:"20px", borderBottom:"1px solid #e9e9e9", display:"flex", gap:"6px" , justifyContent:"space-between"}}>
                <div style={{width:"100%", textAlign:"start", fontWeight:"bold", fontSize:"20px", display:"flex", gap:"6px", alignItems:"center"}}>
                Overview
                </div>
                
            </div>
            <div style={{display:'flex', height:"15%", justifyContent:"space-between", gap:"10px"}}>
                <div className='overview-list'>
                    <div style={{height:"30%", display:"flex", justifyContent:"start", alignItems:"center", fontSize:"18px"}}>
                    Total Paid
                    </div>
                    <div style={{height:"70%", display:"flex", justifyContent:"start", alignItems:"center", fontWeight:"bold", fontSize:"28px"}}>
                        {isPaidM}JOD
                    </div>

                </div>
                <div className='overview-list'>
                    <div style={{height:"30%", display:"flex", justifyContent:"start", alignItems:"center", fontSize:"18px"}}>
                        Total Unpaid
                    </div>
                    <div style={{height:"70%", display:"flex", justifyContent:"start", alignItems:"center", fontWeight:"bold", fontSize:"28px",textAlign:"start"}}>
                        {isNotPaidM}JOD
                    </div>

                </div>

                <div className='overview-list'>
                    <div style={{height:"30%", display:"flex", justifyContent:"start", alignItems:"center", fontSize:"18px"}}>
                        Total Cars
                    </div>
                    <div style={{height:"70%", display:"flex", justifyContent:"start", alignItems:"center", fontWeight:"bold", fontSize:"28px"}}>
                        {client.vehicles.length}
                    </div>

                </div>

                <div className='overview-list'>
                    <div style={{height:"30%", display:"flex", justifyContent:"start", alignItems:"center", fontSize:"18px"}}>
                        Total Services
                    </div>
                    <div style={{height:"70%", display:"flex", justifyContent:"start", alignItems:"center", fontWeight:"bold", fontSize:"28px"}}>
                        {client.vehicles.map((e)=>{
                            return(
                                <>
                                <span>{e.repairRequests.length}</span>
                                </>
                        )
                        })}
                    </div>

                </div>

                <div className='overview-list'>
                    <div style={{height:"30%", display:"flex", justifyContent:"start", alignItems:"center", fontSize:"18px"}}>
                        Last Service
                    </div>
                    <div style={{height:"70%", display:"flex", justifyContent:"start", alignItems:"center", fontWeight:"bold", fontSize:"18px",textAlign:"start"}}>
                        {lastServiceTime} {lastServiceDate}

                    </div>

                </div>


            </div>
        

        <div style={{width:"100%", textAlign:"start", fontWeight:"bold", fontSize:"20px", borderBottom:"1px solid #e9e9e9", display:"flex", gap:"6px" , justifyContent:"space-between"}}>
                <div style={{width:"100%", textAlign:"start", fontWeight:"bold", fontSize:"20px", display:"flex", gap:"6px", alignItems:"center"}}>
                    Vehicles
                </div>
                
            </div>
        <div className='vehicle-list'>

            {client.vehicles.map((e, i) => (
                <div key={i} className='vehicle-list-in-client' style={{cursor: 'pointer'}} onClick={()=>{
                    navigate(`/vehicle/${e.VIN}`)
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding:"5px" }}>
                        <div  style={{ fontWeight: 'bold',display:"flex", justifyContent:"space-between",width:"100%" }}>
                            <div>
                                {e.carType}
                            </div>
                            <div>
                            {e.repairRequests.length}
                            </div>
                             
                        </div>
                    </div>
                </div>
            ))}

        </div>
      </div>
    </div>
  )
}

export default OneClient