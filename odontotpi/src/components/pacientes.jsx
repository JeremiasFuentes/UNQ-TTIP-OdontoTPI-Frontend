import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import '../App.css';
import sIcon from '../images/search_icon.png';
import dIcon from '../images/delete-icon.png';
import vIcon from '../images/view-icon.png';
import eIcon from '../images/edit-icon.png';

const Pacientes = () => {
    const navigate = useNavigate();

    const [pacientes, setPacientes] = useState([])
    const [search ,  setSearch] = useState("")

    const showData = async () =>{
        const response = await fetch('http://localhost:8080/paciente')
        const data = await response.json()
        setPacientes(data)
    }

    const searcher = (e) => {
        setSearch(e.target.value)   
    }

    const results = !search ? pacientes : pacientes.filter((dato)=> dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()) || dato.apellido.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(() =>{
        showData()
    }, [])

    const handleClick = (legajo) => {
        navigate("/paciente?q="+legajo);
       }


    return(
        <div>
            <h1 className="text-dark mt-3">Lista de Pacientes</h1>
            
            <div class="main">
            <div class="form-group">
                <span class="form-control-icon"><img src={sIcon} width="15" height="15"/></span>
                <input value={search} onChange={searcher} type="text" placeholder='Ingrese Nombre o Apellido buscado' className='form-control'/>
            </div>  
            </div>
            
            
            
            
            <table className="table table-striped table-hover mt-4 shadow-lg">
                <thead>
                    <tr className="bg-table text-white">
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th style={{width: 20 + '%' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((paciente) =>(
                        <tr key={paciente.legajo} onClick={() =>handleClick(paciente.legajo)}>
                            <td>{paciente.nombre}</td>
                            <td>{paciente.apellido}</td>
                            <td>{paciente.dni}</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary"><img src={vIcon} width="30" height="20"/></button>
                                    <button type="button" class="btn btn-primary"><img src={eIcon} width="30" height="20"/></button>
                                    <button type="button" class="btn btn-primary"><img src={dIcon} width="30" height="20"/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Pacientes