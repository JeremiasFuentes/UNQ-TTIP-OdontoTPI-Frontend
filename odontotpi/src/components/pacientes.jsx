import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import '../App.css';
import sIcon from '../images/search_icon.png';
import dIcon from '../images/delete-icon.png';
import vIcon from '../images/view-icon.png';
import eIcon from '../images/edit-icon.png';
import aIcon from '../images/add-icon.png';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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

    const handleClickEdit = (legajo) => {
    navigate("/paciente/edit?q="+legajo);
    }
    
    const handleDelete = (legajo) =>{
        axios.delete('http://localhost:8080/paciente/delete/'+ legajo)
        .then((response) =>
            showData()
        )
    }

    const handleNew = () =>{
        navigate("nuevo")
    }

    const submitDelete = (legajo) => {

        confirmAlert({
          title: 'Confirmacion',
          message: 'Estas seguro/a de eliminar esta paciente?.',
          buttons: [
            {
              label: 'Si    ',
              onClick: () => handleDelete(legajo)
            },
            {
              label: 'No',
              //onClick: () => alert('Click No')
            }
          ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        });
      }
    


    return(
        <div>
            <h1 className="text-dark mt-3">Lista de Pacientes</h1>
            
            <div className="main">
            <div className="form-group">
                <span className="form-control-icon"><img src={sIcon} width="15" height="15"/></span>
                <div class="input-group">
                <input value={search} onChange={searcher} type="text" placeholder='Ingrese Nombre o Apellido buscado' className='form-control'/>
                <button type="button" class="btn btn-primary" onClick={() => handleNew()}><img src={aIcon} width="30" height="30"/></button>
                </div>
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
                        <tr key={paciente.legajo}>
                            <td>{paciente.nombre}</td>
                            <td>{paciente.apellido}</td>
                            <td>{paciente.dni}</td>
                            <td>
                                <div className="btn-group">
                                    <button type="button" class="btn btn-light" onClick={() =>handleClick(paciente.legajo)}><img src={vIcon} width="30" height="25"/></button>
                                    <button type="button" class="btn btn-light"><img src={eIcon} onClick={() =>handleClickEdit(paciente.legajo)} width="30" height="30"/></button>
                                    <button type="button" class="btn btn-light" onClick={() => submitDelete(paciente.legajo)}><img src={dIcon} width="30" height="30"/></button>
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