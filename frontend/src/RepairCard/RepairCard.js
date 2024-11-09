import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./style.css";
import axios from "axios";

function RepairCard() {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationalID, setNationalID] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [typeCar, setTypeCar] = useState("");
    const [modelCar, setModelCar] = useState("");
    const [year, setYear] = useState("");
    const [plateNumber, setPlateNumber] = useState('');
    const [engineNumber, setEngineNumber] = useState("");
    const [fuelType, setFuelType] = useState('');
    const [color, setColor] = useState("");
    const [vin, setVin] = useState('');
    const [orderRepair, setOrder] = useState(Array(10).fill(""));
    const [message, setMessage] = useState(""); // حالة لتخزين الرسالة


    const handleCreateData = ()=>{

        const clientData = {
            "name" : firstName + " " + middleName + " " + lastName,
            "nationalID" : nationalID,
            "gender" : gender,
            "phoneNumber" : phoneNumber,

        }

        const vehicleData = {
            "carType" :   typeCar,
            "carModel" : modelCar,
            "engineNumber" : engineNumber,
            "plateNumber" : plateNumber,
            "fuelType" : fuelType,
            "color" : color,
            "year" : year,
            "VIN" : vin
        }

        const repairRequests = {
            "details" : orderRepair,
            "status" : "قيد الانتظار"
        }


        axios.post("http://localhost:5000/veh/create-order", {clientData, vehicleData, repairRequests}).then((result) => {
            setMessage(result.data.message);
        }).catch((err) => {
            setMessage(err.message);
        });
    }

  return (
    <div className='container-form'>
        <div className='title-create-card' style={{fontWeight:"bold"}}>Create New Repair Card</div>
        <div className='from-main'>
            <Form className='forms'>
              <Row className="mb-3">
                


                <Form.Group as={Col} controlId="formGridPassword" className='cols'>
                  <Form.Label>الاسم الاخير</Form.Label>
                  <Form.Control  placeholder="ابوعقل" onChange={(e)=>{
                    setLastName(e.target.value);
                  }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>الاسم الثاني</Form.Label>
                  <Form.Control  placeholder="حسن" onChange={(e)=>{
                    setMiddleName(e.target.value)
                  }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>الاسم الاول</Form.Label>
                  <Form.Control placeholder="يوسف" onChange={(e)=>{
                    setFirstName(e.target.value);
                  }}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                

               

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>نوع</Form.Label>
                  <Form.Select defaultValue="اختر..." onChange={(e)=>{
                    setGender(e.target.value);
                  }}>
                    <option>اختر...</option>
                    <option>ذكر</option>
                    <option>انثى</option>

                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                    <Form.Label>رقم الهاتف</Form.Label>
                    <Form.Control placeholder="0789991280" onChange={(e)=>{
                        setPhoneNumber(e.target.value);
                    }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                    <Form.Label>الرقم الوطني</Form.Label>
                    <Form.Control placeholder="2200004441" onChange={(e)=>{
                        setNationalID(e.target.value);
                    }}/>
                </Form.Group>
              </Row>  


              <Row className="mb-3">


              <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>سنة الصنع</Form.Label>
                  <Form.Select defaultValue="Choose..." onChange={(e)=>{
                    setYear(e.target.value);
                  }}>
                    <option>اختر...</option>
                    {Array.from({ length: 31 }, (_, index) => 2000 + index).map(year => (
                      <option key={year}>{year}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>موديل السيارة</Form.Label>
                  <Form.Select defaultValue="Choose..." onChange={(e)=>{
                    setModelCar(e.target.value);
                  }}>
                    <option>اختر...</option>
                    <option>E200</option>
                    <option>E350</option>
                    <option>S350</option>
                    <option>S500</option>

                  </Form.Select>
                </Form.Group>
                


                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>نوع السيارة</Form.Label>
                  <Form.Select defaultValue="Choose..."onChange={(e)=>{
                    setTypeCar(e.target.value);
                  }}>
                    <option>اختر...</option>
                    <option>Mercedes-Benz</option>
                    <option>Kia</option>
                  </Form.Select>
                </Form.Group>
              </Row>  

              <Row className="mb-3">

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>رقم اللوحة</Form.Label>
                  <Form.Control placeholder='99-554521' onChange={(e)=>{
                    setPlateNumber(e.target.value);
                  }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>رقم المحرك</Form.Label>
                  <Form.Control placeholder='4FASD44ER455RER3' onChange={(e)=>{
                    setEngineNumber(e.target.value);
                  }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>نوع الوقود</Form.Label>
                  <Form.Select defaultValue="Choose..." onChange={(e)=>{
                    setFuelType(e.target.value);
                  }}>
                    <option>اختر...</option>
                    <option>بنزين</option>
                    <option>هايبرد</option>
                    <option>كهرباء</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridColor">
                  <Form.Label>لون السيارة</Form.Label>
                  <Form.Select defaultValue="اختر..." onChange={(e)=>{
                    setColor(e.target.value);
                  }}>
                    <option>اختر...</option>
                    {['احمر', 'اخضر', 'ازرق', 'اصفر', 'سماوي', 'أرجواني', 'اسود', 'ابيض'].map(color => (
                      <option key={color}>{color}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>رقم الشاصي</Form.Label>
                  <Form.Control placeholder="8987544412121" onChange={(e)=>{
                    setVin(e.target.value);
                  }}/>
                </Form.Group>

                {Array.from({length: 10}, (_, index) => 1 + index).map(order =>(
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>الطلب .{order}</Form.Label>
                        <Form.Control placeholder={`${order} : ادخل الطلب `} onChange={(e)=>{
                    const newOrders = [...orderRepair]; 
                    newOrders[order - 1] = e.target.value; 
                    setOrder(newOrders); 
                  }}/>
                    </Form.Group>
                ))}
              

              <Button variant="primary"  onClick={()=>{
                handleCreateData()
              }}>
                اضافة
              </Button>
            </Form>
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>} 
    </div>
  )
}

export default RepairCard
