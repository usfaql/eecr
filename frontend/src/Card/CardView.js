import React from 'react';
import "./style.css";
import openCard from "../assets/images/openCard.png";
import carRepair from "../assets/images/repair.png";
import Clients from "../assets/images/people.png";
import employees from "../assets/images/employees.png"
import Expenses from "../assets/images/expenses.png";
import { useNavigate } from 'react-router-dom';
function CardView() {
  const navigate = useNavigate();
  return (
    <div className='container-main'>
      <div className='card'>
          <img src={openCard} className='img'/>
          
          <div className='container-title-desc'>
            <div className='title-card'>
              Repair Card
            </div>
            <div>
              description Repair Card
            </div>
            
          </div>
          <div className='container-btn'>
            <button className='btn-car' onClick={()=>{
              navigate("/openCard");
            }}>Open Card</button>
          </div>
      </div>

      <div className='card'>
          <img src={carRepair} className='img'/>
          <div className='container-title-desc'>
            <div className='title-card'>
            Vehicles
            </div>
            <div>
              description Repair Card
            </div>
            
          </div>
          <div className='container-btn'>
            <button className='btn-car' onClick={()=>{
              navigate("/vehicles");
            }}>Show Vehicles</button>
          </div>
      </div>

      <div className='card'>
          <img src={Clients} className='img'/>
          <div className='container-title-desc'>
            <div className='title-card'>
            Clients
            </div>
            <div>
              description Repair Card
            </div>
            
          </div>
          <div className='container-btn'>
            <button className='btn-car' onClick={()=>{
              navigate("/clients")
            }}>Show Clients</button>
          </div>
      </div>

      <div className='card'>
          <img src={employees} className='img'/>
          <div className='container-title-desc'>
            <div className='title-card'>
            Employees
            </div>
            <div>
              description Repair Card
            </div>
            
          </div>
          <div className='container-btn'>
            <button className='btn-car' onClick={()=>{
              navigate("/employee");
            }}>Show Employees</button>
          </div>
      </div>

      <div className='card'>
          <img src={openCard} className='img'/>
          <div className='container-title-desc'>
            <div className='title-card'>
            Obligations
            </div>
            <div>
              description Repair Card
            </div>
          </div>
          <div className='container-btn'>
            <button className='btn-car' onClick={()=>{
              navigate("/Obligations");
            }}>Show Obligations</button>
          </div>
      </div>

      <div className='card'>
          <img src={Expenses} className='img'/>
          <div className='container-title-desc'>
            <div className='title-card'>
            Expenses
            </div>
            <div>
              description Repair Card
            </div>
            
          </div>
          <div className='container-btn'>
            <button className='btn-car'>Show Expenses</button>
          </div>
      </div>
    </div>
  );
}

export default CardView;
