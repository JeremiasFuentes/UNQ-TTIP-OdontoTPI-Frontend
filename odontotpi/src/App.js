
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Inicio from './components/inicio';
import Pacientes from './components/pacientes';
import NavBarHeader from './layouts/navbar';
import Paciente from './components/paciente';
import NuevoPaciente from './components/nuevoPaciente';
import EditPaciente from './components/editPaciente';
import Odontograma from './components/odontograma';
import HistoriaClinica from './components/historiaClinica';
import Turnos from './components/turnos';

function App() {
  return (
    <div className="App">

<BrowserRouter>
<Routes>
    <Route path='/' element={ <NavBarHeader /> }>
    <Route index element={ <Inicio /> } />
    <Route path='Inicio' element={ <Inicio /> } />
    <Route path='Pacientes' element={ <Pacientes /> } />
    <Route path='Turnos' element={ <Turnos /> } />
    <Route path="/paciente" element={<Paciente />} />
    <Route path="/pacientes/nuevo" element={<NuevoPaciente />} />
    <Route path="/paciente/edit" element={<EditPaciente />} />
    <Route path="/paciente/odontograma" element={<Odontograma />} />
    <Route path="/paciente/historia-clinica" element={<HistoriaClinica />} />
  </Route>
</Routes> 
</BrowserRouter>

    </div>
  );
}

export default App;