
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Inicio from './components/inicio';
import Pacientes from './components/pacientes';
import NavBarHeader from './layouts/navbar';
import Paciente from './components/paciente';

function App() {
  return (
    <div className="App">

<BrowserRouter>
<Routes>
  <Route path='/' element={ <NavBarHeader /> }>
    <Route index element={ <Inicio /> } />
    <Route path='Inicio' element={ <Inicio /> } />
    <Route path='Pacientes' element={ <Pacientes /> } />
    <Route path="/paciente" element={<Paciente />} />
  </Route>
</Routes> 
</BrowserRouter>

    </div>
  );
}

export default App;