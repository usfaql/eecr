import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import "./style.css"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


function Employees() {
    const [employees, setEmployees] = useState([]);
    const [showAddEmployees, setShowAddEmployees] = useState(false);

    const [firstName,setFirstName] =useState('');
    const [midName,setMidName] =useState('');
    const [lastName,setLastName] =useState('');
    const [imageEmployee,setImageEmployee] =useState('');
    const [nationalID,setNationalID] =useState('');
    const [imageNationalID,setImageNationalID] =useState('');
    const [phoneNumber,setPhoneNumber] =useState('');
    const [dateOfBirth,setDateOfBirth] =useState('');
    const [gender,setGender] =useState('');
    const [position,setPosition] =useState('');
    const [SalaryPerWeek,setSalaryPerWeek] =useState('');
    const [showEmployees , setShowEmployees] = useState("Active");

    const [showEditEmployee, setShowEditEmployee] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null); 
  
    const handleCloseEditEmployee = () => setShowEditEmployee(false);

    const handleShowEditModal = (employee) => {
      setCurrentEmployee(employee); // إعداد الموظف المحدد للتعديل
      setShowEditEmployee(true);
    };

    const handleDismissEmployee = (employeeStatus) => {
      if(employeeStatus.Status === "fired"){
        console.log("تم اعادة الموظف بنجاح")
        axios.put(`http://localhost:5000/employee/${employeeStatus._id}`, { Status: "Active" })
        .then((response) => {
          console.log("Employee fired:", response.data);
          setEmployees(prevEmployees => 
            prevEmployees.map(employee => 
              employee._id === employeeStatus._id ? { ...employee, Status: "Active" } : employee
            )
          );
        })
        .catch((error) => {
          console.error("Error firing employee:", error);
        });
      }else {
        axios.put(`http://localhost:5000/employee/${employeeStatus._id}`, { Status: "fired" })
          .then((response) => {
            console.log("Employee fired:", response.data);
            setEmployees(prevEmployees => 
              prevEmployees.map(employee => 
                employee._id === employeeStatus._id ? { ...employee, Status: "fired" } : employee
              )
            );
          })
          .catch((error) => {
            console.error("Error firing employee:", error);
          });
      }
    };

    const handleEditEmployee = () => {      
      // إرسال الطلب لتحديث بيانات الموظف
      axios.put(`http://localhost:5000/employee/${currentEmployee._id}`, 
        {
        firstName,      
        midName,        
        lastName,       
        imageEmployee,  
        nationalID,     
        imageNationalID,
        phoneNumber,    
        dateOfBirth,    
        gender,         
        position,       
        SalaryPerWeek,   
      })
        .then((result) => {

          setEmployees(prevEmployees => 
            prevEmployees.map(employee => 
              employee._id === currentEmployee._id 
                ? { 
                    ...employee, // نسخ البيانات القديمة للموظف
                    firstName: firstName || employee.firstName,
                    midName: midName || employee.midName,
                    lastName: lastName || employee.lastName,
                    imageEmployee: imageEmployee || employee.imageEmployee,
                    nationalID: nationalID || employee.nationalID,
                    imageNationalID: imageNationalID || employee.imageNationalID,
                    phoneNumber: phoneNumber || employee.phoneNumber,
                    dateOfBirth: dateOfBirth || employee.dateOfBirth,
                    gender: gender || employee.gender,
                    position: position || employee.position,
                    SalaryPerWeek: SalaryPerWeek || employee.SalaryPerWeek,
                  } 
                : employee
            )
          );
          setShowEditEmployee(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const handleCloseAddEmployees = () => setShowAddEmployees(false);
    const handleShow = () => setShowAddEmployees(true);



    useEffect(()=>{
      axios.get("http://localhost:5000/employee/").then((result) => {
        setEmployees(result.data);        
      }).catch((err) => {
        console.error(err);
      });
    }, [])
     
    const filteredEmployees = ()=>{
    if(showEmployees === "Active"){
      return employees.filter(employee => employee.Status === "Active");
    }else{
      return employees.filter(employee => employee.Status === "fired");
    }
    }

    const activeEmployees = filteredEmployees();
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


    const AddEmployee = ()=>{
      axios.post('http://localhost:5000/employee/add', {firstName, midName, lastName, imageEmployee, nationalID, imageNationalID, phoneNumber, dateOfBirth,
        gender, position, SalaryPerWeek}).then((result) => {
          console.log(result);
          handleCloseAddEmployees();
        }).catch((err) => {
          console.error(err)
        });
    }

    return (
      <div className='container-veh'>
        <div className='employees-main'>
          <div className='title-employees'>
            <div>{showEmployees === "fired" ? "Fired Employees" : "Active Employees"}</div>
            <div><button onClick={()=>{
              if(showEmployees === "fired"){
                setShowEmployees("Active")
              }else{
                setShowEmployees("fired");
              }
            }}>{showEmployees === "fired" ? "Active" : "Fired"}</button></div>
            <div><button onClick={handleShow}>+</button></div>
          </div>
          <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"#EDEDED", width:"100%"}}>
            <div style={{width:"5%"}}>Image</div>
            <div style={{width:"12%"}}>Name</div>
            <div style={{width:"9%"}}>National ID</div>
            <div style={{width:"9%"}}>Phone Number</div>
            <div style={{width:"9%"}}>Gender</div>
            <div style={{width:"9%"}}>Age</div>
            <div style={{width:"9%"}}>Position</div>
            <div style={{width:"9%"}}>Salary Per Week</div>
            <div style={{width:"10%"}}>Salary Per Month</div>
            <div style={{width:"9%"}}>Employee since</div>
            <div style={{width:"9%"}}>Action</div>
          </div>
        
        {activeEmployees.map((item, index) => (
                <div style={{display:"flex", justifyContent:"space-between", padding:"10px",borderBottom:"1px solid #ededed", alignItems:"center"}}>
                  <div style={{width:"5%"}}><img src={item.imageEmployee !== "none" ? item.imageEmployee : "https://i.ibb.co/jySmbq2/mechanic.png"} style={{width:"48px" , borderRadius:"50%"}}/></div>
                  <div style={{width:"12%"}}>{item.firstName + " " + item.lastName}</div>
                  <div style={{width:"9%"}}>{item.nationalID}</div>
                  <div style={{width:"9%"}}>{item.phoneNumber}</div>
                  <div style={{width:"9%"}}>{item.gender}</div>
                  <div style={{width:"9%"}}>{item.age}</div>
                  <div style={{width:"9%"}}>{item.position}</div>
                  <div style={{width:"9%"}}>{item.SalaryPerWeek}</div>
                  <div style={{width:"10%"}}>{item.SalaryPerWeek *4}</div>
                  <div style={{width:"9%"}}>{formatDate(item.createdAt)}</div>
                  <div style={{width:"9%"}}>
                    <button onClick={() => handleShowEditModal(item)}>Edit</button>

                    <button onClick={() => handleDismissEmployee(item)}>
                    {item.Status === "fired" ? "Active" : "Fired"}</button>
                    </div>
                </div>
        ))}
  
  
        </div>
        

        <Modal show={showAddEmployees} onHide={handleCloseAddEmployees} style={{textAlign:'start'}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{display:"flex",gap:"5px"}}>
            <FloatingLabel
              controlId="floatingInput"
              label="firstName"
              className="mb-3"
            >
              <Form.Control type="text" 
              onChange={(e)=>{
                setFirstName(e.target.value);
              }}
              placeholder="name@example.com" style={{textAlign:'start'}}/>
            </FloatingLabel>


            <FloatingLabel
              controlId="floatingInput"
              label="midName"
              className="mb-3"
            >
              <Form.Control type="text" 
              onChange={(e)=>{
                setMidName(e.target.value);
              }}
              placeholder="name@example.com" />
            </FloatingLabel>


            <FloatingLabel
              controlId="floatingInput"
              label="lastName"
              className="mb-3"
            >
              <Form.Control type="text" 
              onChange={(e)=>{
                setLastName(e.target.value);
              }}
              placeholder="name@example.com" />
            </FloatingLabel>
          </div>
          

          <div style={{display:"flex",gap:"5px"}}>
            <FloatingLabel
              controlId="floatingInput"
              label="imageEmployee"
              className="mb-3"
            >
              <Form.Control type="text"
              onChange={(e)=>{
                setImageEmployee(e.target.value);
              }}
              placeholder="name@example.com" />
            </FloatingLabel>


            <FloatingLabel
            controlId="floatingInput"
            label="nationalID"
            className="mb-3"
          >
            <Form.Control type="text"
            onChange={(e)=>{
              setNationalID(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>


            <FloatingLabel
            controlId="floatingInput"
            label="imageNationalID"
            className="mb-3"
          >
            <Form.Control type="text" 
            onChange={(e)=>{
              setImageNationalID(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>
          </div>

          <div style={{display:"flex",gap:"5px"}}>
            <FloatingLabel
            controlId="floatingInput"
            label="phoneNumber"
            className="mb-3"
          >
            <Form.Control type="text" 
            onChange={(e)=>{
              setPhoneNumber(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingInput"
            label="dateOfBirth"
            className="mb-3"
          >
            <Form.Control type="text" 
            onChange={(e)=>{
              setDateOfBirth(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>

          </div>
          <div style={{display:"flex",gap:"5px"}}>

          <Form.Select aria-label="Gender" onChange={(e)=>{
              setGender(e.target.value);
            }}>
              <option>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>


            <Form.Select aria-label="position" onChange={(e)=>{
              setPosition(e.target.value);
            }}>
              <option>Select Position</option>
              <option value="GENERAL MANAGER">GENERAL MANAGER</option>
              <option value="TECHNICAL MANAGER">TECHNICAL MANAGER</option>
              <option value="QUALITY CONTROLLER">QUALITY CONTROLLER</option>
              <option value="MECHANICAL TECHNICIAN">MECHANICAL TECHNICIAN</option>
              <option value="MECHANICAL ASSISTANT">MECHANICAL ASSISTANT</option>
              <option value="TRAINEE">TRAINEE</option>
            </Form.Select>

            <FloatingLabel
            controlId="floatingInput"
            label="SalaryPerWeek"
            className="mb-3"
          >
            <Form.Control type="text" 
            onChange={(e)=>{
              setSalaryPerWeek(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddEmployees}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            AddEmployee();}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal show={showEditEmployee} onHide={handleCloseEditEmployee}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentEmployee && (
              <div>
                          <div style={{display:"flex",gap:"5px"}}>
            <FloatingLabel
              controlId="floatingInput"
              label="firstName"
              className="mb-3"
            >
              <Form.Control type="text" 
              defaultValue={currentEmployee.firstName}
              onChange={(e)=>{
                setFirstName(e.target.value);
              }}
              placeholder="name@example.com" style={{textAlign:'start'}}/>
            </FloatingLabel>


            <FloatingLabel
              controlId="floatingInput"
              label="midName"
              className="mb-3"
            >
              <Form.Control type="text" 
               defaultValue={currentEmployee.midName}
              onChange={(e)=>{
                setMidName(e.target.value);
              }}
              placeholder="name@example.com" />
            </FloatingLabel>


            <FloatingLabel
              controlId="floatingInput"
              label="lastName"
              className="mb-3"
            >
              <Form.Control type="text" 
              defaultValue={currentEmployee.lastName}
              onChange={(e)=>{
                setLastName(e.target.value);
              }}
              placeholder="name@example.com" />
            </FloatingLabel>
          </div>
          

          <div style={{display:"flex",gap:"5px"}}>
            <FloatingLabel
              controlId="floatingInput"
              label="imageEmployee"
              className="mb-3"
            >
              <Form.Control type="text"
               defaultValue={currentEmployee.imageEmployee}
              onChange={(e)=>{
                setImageEmployee(e.target.value);
              }}
              placeholder="name@example.com" />
            </FloatingLabel>


            <FloatingLabel
            controlId="floatingInput"
            label="nationalID"
            className="mb-3"
          >
            <Form.Control type="text"
            defaultValue={currentEmployee.nationalID}
            onChange={(e)=>{
              setNationalID(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>


            <FloatingLabel
            controlId="floatingInput"
            label="imageNationalID"
            className="mb-3"
          >
            <Form.Control type="text" 
            defaultValue={currentEmployee.imageNationalID}
            onChange={(e)=>{
              setImageNationalID(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>
          </div>

          <div style={{display:"flex",gap:"5px"}}>
            <FloatingLabel
            controlId="floatingInput"
            label="phoneNumber"
            className="mb-3"
          >
            <Form.Control type="text" 
            defaultValue={currentEmployee.phoneNumber}
            onChange={(e)=>{
              setPhoneNumber(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingInput"
            label="dateOfBirth"
            className="mb-3"
          >
            <Form.Control type="text" 
            defaultValue={currentEmployee.dateOfBirth}
            onChange={(e)=>{
              setDateOfBirth(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>

          </div>
          <div style={{display:"flex",gap:"5px"}}>

          <Form.Select aria-label="Gender" 
          defaultValue={currentEmployee.gender}
          onChange={(e)=>{
              setGender(e.target.value);
            }}>
              <option>{currentEmployee.gender}</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>


            <Form.Select aria-label="position"
            value={currentEmployee.position || "Select Position"}
            onChange={(e)=>{
              setPosition(e.target.value);
            }}>
              <option>{currentEmployee.position}</option>
              <option value="GENERAL MANAGER">GENERAL MANAGER</option>
              <option value="TECHNICAL MANAGER">TECHNICAL MANAGER</option>
              <option value="QUALITY CONTROLLER">QUALITY CONTROLLER</option>
              <option value="MECHANICAL TECHNICIAN">MECHANICAL TECHNICIAN</option>
              <option value="MECHANICAL ASSISTANT">MECHANICAL ASSISTANT</option>
              <option value="TRAINEE">TRAINEE</option>
              
            </Form.Select>

            <FloatingLabel
            controlId="floatingInput"
            label="SalaryPerWeek"
            className="mb-3"
          >
            <Form.Control type="text" 
            defaultValue={currentEmployee.SalaryPerWeek}
            onChange={(e)=>{
              setSalaryPerWeek(e.target.value);
            }}
            placeholder="name@example.com" />
            </FloatingLabel>
          </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditEmployee}>Close</Button>
            <Button variant="primary" onClick={handleEditEmployee}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }

export default Employees
