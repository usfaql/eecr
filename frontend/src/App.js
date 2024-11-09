import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useMatch } from 'react-router-dom';
import RepairCard from './RepairCard/RepairCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vehicles from './Vehicles/Vehicles';
import Clients from './Clients/Clients';
import Employees from './Employees/Employees';
import OneVehicle from './OneVehicle/OneVehicle';
import NotFoundPage from './404Page/NotFoundPage';
import OneClient from './OneClient/OneClient';
import Obligations from './Obligations/Obligations';


function App() {
  const location = useLocation();
  const isNotFound = location.pathname === '/NotFound';
  
  return (
    <div className="App">
        {!isNotFound && <Navbar />}
        <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/openCard" element={<RepairCard/>}/>
        <Route path="/vehicles" element={<Vehicles/>}/>
        <Route path='/clients' element={<Clients/>}/>
        <Route path='/employee' element={<Employees/>}/>
        <Route path="/vehicle/:vin" element={<OneVehicle/>}/>
        <Route path='/client/:id' element={<OneClient/>}/>
        <Route path='/Obligations' element={<Obligations/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
