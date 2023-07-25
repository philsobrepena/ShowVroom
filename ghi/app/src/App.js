import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ModelsList from './ModelsList';
import NewModelForm from './NewModelForm';
import AutomobileList from './AutomobileList';
import ManufacturerForm from './ManufacturerForm';
import NewAutomobileForm from './NewAutomobileForm';
import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechniciansList';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import AppointmentsList from './ServiceAppointmentsList'; 
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/create" element={<ManufacturerForm />} />
          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/create" element={<NewModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/create" element={<NewAutomobileForm />} />
          <Route path="/technicians" element={<TechniciansList />} />
          <Route path="/technicians/create" element={<TechnicianForm />} />
          <Route path="/appointments/create" element={<ServiceAppointmentForm />} />
          <Route path="/appointments" element={<AppointmentsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
