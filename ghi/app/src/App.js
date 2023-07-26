import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ModelsList from './ModelsList';
import NewModelForm from './NewModelForm';
import AutomobileList from './AutomobileList';
import ManufacturerForm from './ManufacturerForm';
import NewAutomobileForm from './NewAutomobileForm';
import SalespersonList from './SalespersonList';
import NewSalespersonForm from './NewSalespersonForm';
import CustomerList from './CustomerList';
import NewCustomerForm from './NewCustomerForm';
import SalesList from './SalesList';
import NewSaleForm from './NewSaleForm';
import SalesByPersonList from './SalesByPersonList';
import TechnicianForm from './TechnicianForm';
import TechniciansList from './TechniciansList';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import AppointmentsList from './ServiceAppointmentsList';
import HistoryList from './ServiceHistoryList';


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
          <Route path="/salespeople" element={<SalespersonList />} />
          <Route path="/salespeople/create" element={<NewSalespersonForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<NewCustomerForm />} />
          <Route path="/sales" element={<SalesList/>}/>
          <Route path="/sales/salesperson" element={<SalesByPersonList/>}/>
          <Route path="/sales/create" element={<NewSaleForm/>}/>
          <Route path="/technicians" element={<TechniciansList />} />
          <Route path="/technicians/create" element={<TechnicianForm />} />
          <Route path="/appointments/create" element={<ServiceAppointmentForm />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/history" element={<HistoryList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
