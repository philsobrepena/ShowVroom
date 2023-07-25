import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import VehiclesList from './VehiclesList';
import AutomobileList from './AutomobileList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/vehicles" element={<VehiclesList />} />
          <Route path="/automobiles" element={<AutomobileList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
