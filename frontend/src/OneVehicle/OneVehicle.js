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


function OneVehicle() {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState('');
    const { vin } = useParams();
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
    
    const handleAddItems = () => {
        const newItems = selectedOrderDetails?.details.map((detail, index) => {
            const itemCost = itemCosts[index]; 
            if (itemCost) {
                return {
                    name: detail,
                    cost: parseFloat(itemCost), 
                    id: items.length + index + 1 
                };
            }
            return null;
        }).filter(item => item !== null); 
        
        setItems(prevItems => [...prevItems, ...newItems]);
    
        if (wage) {
            setItems(prevItems => [
                ...prevItems,
                { name: 'الأجور', cost: parseFloat(wage), id: prevItems.length + 1 }
            ]);
        }
    
        setItemCosts({});
        setWage('');
    };

    const handleCostChange = (index, value) => {
        setItemCosts(prevCosts => ({
            ...prevCosts,
            [index]: value
        }));
    };

    const handleCreateInvoice = () => {
       console.log(selectedOrderDetails);
       
        console.log(selectedOrderDetails);
        if (items.length > 0 && selectedOrderDetails) {

            
            axios.post('http://localhost:5000/vehicle/invoice', {
                vehicleId: vehicle.vehicle.id,
                clientId: vehicle.owner.id,
                items
            }).then(() => {
                alert('تم إنشاء الفاتورة بنجاح');
            }).catch((error) => {
                console.error(error);
                alert('حدث خطأ أثناء إنشاء الفاتورة');
            });
        } else {
            alert('يرجى تحديد طلب وإدخال العناصر.');
        }
    };


    const toggleOrderDetails = (index) => {
        setOpenOrderIndex(openOrderIndex === index ? null : index);
    };


    const handleRadioChange = (index) => {
        setSelectedOrderIndex(index);
        setSelectedOrderDetails(vehicle.repairRequests[index]);
        console.log(vehicle.repairRequests[index]);
        
    };

    const handleAddOrder = ()=>{

        const repairRequests = {
            "details" : orderRepair,
            "status" : "قيد الانتظار"
        }


        axios.post(`http://localhost:5000/add-order`, {vehicle : vehicle.vehicle.id, repairRequests}).then((result) => {
            
        }).catch((err) => {
            
        });
    }

    const filledOrderDetails = Array.from({ length: 10 }, (_, index) => {
        if (selectedOrderDetails) {
            
            return selectedOrderDetails.details[index] || ' ';
        } else {
            return { details: ' ' }; 
        }
    });

    useEffect(()=>{
        axios.get(`http://localhost:5000/vehicle/${vin}`).then((result) => {
        setVehicle(result.data);
            axios.get(`http://localhost:5000/vehicle/invoice/${result.data.vehicle.id}`).then((result) => {
                setInvoiceCar(result.data.data);
            }).catch((err) => {
                setInvoiceCar(null);
            });
        }).catch((err) => {
            
        });
    },[newItem])


    if (!vehicle) {
        return <div>Loading...</div>;
    }

  return (
    <div className='container-vehicle-one'>
      <div className='bar-info'>
        <div style={{display:'flex', flexDirection:"column", width:"100%", justifyContent:"start",padding:"10px 0", gap:"10px"}}>
            <div style={{display:"flex", justifyContent:"start" , cursor:"default"}}>
            <div style={{fontSize:"26px", fontWeight:"bold"}}>{vehicle.vehicle.carType}</div>
            </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{display:"flex", textAlign:'start', width:"100%",  gap:"5%", cursor:"default"}}>
            <div>
                <div style={{fontSize:"14px"}}>
                    MODEL
                </div>
                <div style={{fontWeight:"bold"}}>
                    {vehicle.vehicle.carModel}
                </div>
            </div>
            
            <div>
                <div style={{fontSize:"14px"}}>
                    VIN
                </div>
                <div style={{fontWeight:"bold"}}>
                    {vehicle.vehicle.VIN}
                </div>
            </div>
            <div>
                <div style={{fontSize:"14px"}}>
                    COLOR
                </div>
                <div style={{fontWeight:"bold"}}>
                    {vehicle.vehicle.color}
                </div>
            </div>

            <div>
                <div style={{fontSize:"14px"}}>
                    FUEL
                </div>
                <div style={{fontWeight:"bold"}}>
                    {vehicle.vehicle.fuelType}
                </div>
            </div>
            <div>
                <div style={{fontSize:"14px"}}>
                    PLATE NO.
                </div>
                <div style={{fontWeight:"bold"}}>
                    {vehicle.vehicle.plateNumber}
                </div>
            </div>

            <div>
                <div style={{fontSize:"14px"}}>
                    YEAR
                </div>
                <div style={{fontWeight:"bold"}}>
                    {vehicle.vehicle.year}
                </div>
            </div>

            <div>
                <div style={{fontSize:"14px"}}>
                    CLIENT
                </div>
                <div style={{fontWeight:"bold", cursor:"pointer", color:"#cd0000"}} onClick={()=>{
                    navigate(`/client/${vehicle.owner.id}`)
                }}>
                    {vehicle.owner.name}
                </div>
            </div>
            </div>
            
            <button className='btn-car' onClick={()=>{
                if(selectedOrderDetails){
                    PrintCard(vehicle, selectedOrderDetails,filledOrderDetails)
                }
                
                }}>Print</button>
        </div>
            
        </div>
            
      </div>


      <div className='container-info'>
      <div style={{width:"100%", textAlign:"start", fontWeight:"bold", fontSize:"20px", borderBottom:"1px solid #e9e9e9", display:"flex", gap:"6px" , justifyContent:"space-between"}}>
                <div style={{width:"100%", textAlign:"start", fontWeight:"bold", fontSize:"20px", display:"flex", gap:"6px", alignItems:"center"}}>

                Order List
                </div>
                <div>
                <button className="btn-delete"  onClick={handleShowOrder}><IoMdAdd  style={{width:"1.3em", height:"1.3em"}}/></button>
                </div>
                
            </div>
        <div className='order-list'>

            {vehicle.repairRequests.map((e, i) => (
                <div key={i} className='order-list-in' onClick={() => toggleOrderDetails(i)} style={{cursor: 'pointer'}}>
                    <div style={{ display: 'flex', alignItems: 'center', padding:"5px" }}>
                        <input
                            type="radio"
                            name="order"
                            checked={selectedOrderIndex === i}
                            onChange={() => handleRadioChange(i)}
                        />
                        <div  style={{ fontWeight: 'bold', marginLeft: '5px',display:"flex", justifyContent:"space-between",width:"100%" }}>
                            <div>
                                Order {i + 1}
                            </div>
                            <div style={{
                                color: e.status === "قيد الانتظار" ? "orange" :
                                e.status === "قيد العمل" ? "blue" :
                                e.status === "مكتمل" ? "green" :
                                "black"
                            }}>
                                
                            {e.status}
                            </div>
                             
                        </div>
                    </div>
                    {openOrderIndex === i && (
                        <div className='order-details' style={{ marginLeft: '5px', marginTop: '5px' }}>
                            <ul style={{listStyle:"none", textAlign:"start", paddingLeft:"0", margin:"0"}}>
                                {e.details.map((order, index) => (
                                    <li key={index} style={{backgroundColor:"white", borderRadius:"2px", marginBottom:"2px", padding:"5px"}}>{index+1 }: {order}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

        </div>

        <div style={{display:"flex", justifyContent:"space-between" , borderBottom:"1px solid #e9e9e9", paddingBottom:"5px"}}>
                <div style={{textAlign:"start", fontWeight:"bold", display:'flex', alignItems:"center", fontSize:"20px", gap:"6px"}}>
                    Invoice</div>
                <div style={{display:"flex", justifyContent:"space-evenly", gap:"10px"}}>
                <button className="btn-delete"  onClick={handleShowInvoice}><IoMdAdd  style={{width:"1.3em", height:"1.3em"}}/></button>
                <button className="btn-delete" onClick={()=>{PrintInvoice(vehicle, invoiceCar,currentInvoice);}}><IoMdPrint style={{width:"1.3em", height:"1.3em"}}/></button>
                
                </div>
            </div>
            <div style={{display:'flex', justifyContent:"space-between"}}>
                    <div style={{display:"flex", gap:"5px"}}>
                        {invoiceCar?.map((e,i)=>{
                            
                            
                            return(
                                <button className={e.isPaid ? "btn-car-paid" : "btn-car"} onClick={()=>{setCurrentInvoice(i); setInvoiceName(`فاتورة رقم ${i+1}`)}}>فاتورة رقم {i+1} {e.isPaid ? "مدفوع" : "غير مدفوع"}</button>
                            )
                        })}
                    </div>
                    <div>
                <button className={invoiceCar && invoiceCar[currentInvoice].isPaid ? "btn-car" : "btn-car-paid"}  onClick={() => {
                    if (invoiceCar[currentInvoice].isPaid) {
                        axios.post(`http://localhost:5000/vehicle/invoice/${invoiceCar[currentInvoice].id}`, { isPaid: false }).then((result) => {
                            setNewItem(newItem + 1);
                        }).catch((err) => {
                            console.error(err);
                        });
                    } else {
                        axios.post(`http://localhost:5000/vehicle/invoice/${invoiceCar[currentInvoice].id}`, { isPaid: true }).then((result) => {
                            setNewItem(newItem + 1);
                        }).catch((err) => {
                            console.error(err);
                        });
                    }
                }}>
                    {invoiceCar && invoiceCar[currentInvoice] ? 
                        (invoiceCar[currentInvoice].isPaid ? "غير مدفوع" : "مدفوع") : 
                        "No Invoice Available"}
                </button>
                </div>
                </div>
        <div className='invoice'>

                
                
            <div>
                <div style={{fontSize:"19px", fontWeight:"bold"}}>
                    {invoiceName}
                </div>
                <div style={{ marginBottom: '2px' , display:"flex", justifyContent:"space-between", fontSize:"16px", fontWeight:"bold"}}>
                
                <div>
                    Item
                </div>
                <div style={{display:"flex", gap:"5px" , width:"10%", justifyContent:"end", textAlign:"center"}}>
                    
                    <div style={{width:"50%"}}>
                        Delete
                    </div>
                    <div style={{width:"50%"}}>
                        Price
                    </div>
                </div>
                
                </div>

            </div> 
            <div style={{borderBottom:"1px solid #ededed", width:"100%"}}></div>

            {invoiceCar ? 
            <>

                    {invoiceCar[currentInvoice]?.items.map((item,i) => (
                        <>
                        <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <div style={{fontWeight:"bold", paddingLeft:'10px'}}>
                                    {item.name}
                                </div>
                            </div>
                            

                            <div style={{display:"flex", gap:"5px" , width:"10%", justifyContent:"end", textAlign:"center", alignItems:"center"}}>
                                

                                <div style={{width:"50%"}}>
                                <button className="btn-delete"  onClick={() => {
                                    axios.delete(`http://localhost:5000/vehicle/invoice/${invoiceCar[currentInvoice].id}/${item._id}`).then((result) => {
                                        setNewItem(newItem + 1);
                                    }).catch((err) => {
                                        console.error(err);
                                    });
                                }}><MdDelete stroke="red" fill="red" style={{height:"1.5em", width:"1.5em"}}/></button>
                                </div>

                                <div style={{fontWeight:"bold", width:"50%"}}>
                                    {item.cost} JOD
                                </div>
                            </div>
                           
                        </div>
                        <div style={{borderBottom:"1px solid #f7f7f7", width:"100%"}}></div>
                        </>
                    ))}
            <div style={{borderBottom:"1px solid #ededed", width:"100%"}}></div>
            <div style={{ marginTop: '5px' , display:"flex", justifyContent:"space-between", fontSize:"16px", fontWeight:"bold"}}>
                <div>
                </div>
                <div style={{display:"flex", gap:"5px" , width:"10%", justifyContent:"end", textAlign:"center"}}>
                    
                    <div style={{width:"50%", textAlign:"end"}}>
                        Total
                    </div>
                    <div style={{width:"50%", textAlign:"center"}}>
                        {invoiceCar[currentInvoice]?.totalAmount} JOD
                    </div>
                </div>
                
            </div>

            </>
            :
            <div>
                لا يوجد فواتير
            </div>
            }
            </div>

      </div>

            <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>تأكيد الطباعة</Modal.Title>
                            </Modal.Header>
                                {selectedOrderIndex !== null ? 
                                <>
                                    <Modal.Body>هل ترغب في طباعة الطلب؟</Modal.Body>

                                    <Modal.Footer>

                                        <Button variant="secondary" onClick={handleClose}>
                                            إلغاء
                                        </Button>

                                        <Button variant="primary" onClick={() => { printCard(vehicle, selectedOrderDetails, filledOrderDetails); handleClose(); }}>
                                            طباعة
                                        </Button>
                                    </Modal.Footer>
                                    </>
                                    :
                                    <>
                                    <Modal.Body>يرجى اختيار الطلب الذي تريد طباعته</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            إلغاء
                                        </Button>
                                    </Modal.Footer>
                                    </>
                                }

                            
            </Modal>
                            
                            
                            
                            
            <Modal show={showInvoice} onHide={handleCloseInvoice}>
                <Modal.Header closeButton>
                    <Modal.Title>تأكيد الطباعة</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <thead>
                            <tr>
                                <td>الصنف</td>
                                <td>السعر</td>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrderDetails?.details.map((e, index) => (
                                <tr key={index}>
                                    <td>{e}</td> {/* عرض اسم المنتج */}
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="السعر"
                                            value={itemCosts[index] || ''} // استخدام القيمة من الحالة
                                            onChange={(e) => handleCostChange(index, e.target.value)} // تحديث السعر
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        
                    {/* حقل إدخال للأجور */}
                    <div>
                        <label>الأجور:</label>
                        <input
                            type="number"
                            placeholder="أدخل الأجر"
                            value={wage}
                            onChange={(e) => setWage(e.target.value)} // تحديث الأجر
                        />
                    </div>
                        
                    {/* زر إضافة الأصناف */}
                    <button className="btn-car"  onClick={handleAddItems}>إضافة أصناف</button>
                        
                    {/* عرض العناصر المضافة */}
                    <h3>العناصر المضافة:</h3>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>{item.name} - {item.cost} ريال</li>
                        ))}
                    </ul>
                    
                    {/* زر إنشاء الفاتورة */}
                    <button className="btn-car"  onClick={handleCreateInvoice}>
                    
                    </button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseInvoice}>
                        إلغاء
                    </Button>
                    <Button variant="primary" onClick={() => {handleCreateInvoice(); handleCloseInvoice(); setNewItem(newItem-1)}}>
                    إنشاء الفاتورة
                    </Button>
                </Modal.Footer>
            </Modal>       

            <Modal show={showOrder} onHide={handleCloseOrder}>
                <Modal.Header closeButton>
                    <Modal.Title>طلب جديد</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                    
                {Array.from({length: 10}, (_, index) => 1 + index).map(order =>(
                    <FloatingLabel
                    controlId="floatingInput"
                    label={`${order} الطلب`}
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder={`${order} : ادخل الطلب `} onChange={(e)=>{
                    const newOrders = [...orderRepair]; 
                    newOrders[order - 1] = e.target.value; 
                    setOrder(newOrders); 
                    
                  }}/>
                  </FloatingLabel>
                   
                ))}
                
                </>

                

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOrder}>
                        إلغاء
                    </Button>
                    <Button variant="primary" onClick={() => {handleAddOrder(); handleCloseOrder();}}>
                    إنشاء طلب جديد
                    </Button>
                </Modal.Footer>
            </Modal>   
    </div>
  )
}

export default OneVehicle
