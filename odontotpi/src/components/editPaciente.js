

import React, { useEffect, useState, onSubmit } from 'react';
import profile from '../images/profile-image-default.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import UseQuery from './useSearch';
import axios from 'axios';

const EditPaciente = () => {

    const navigate = useNavigate();

    const [trySave,setTrySave] = useState(false)
    const [pacienteAgregado, setPacienteAgregado] = useState()
    const [mailError, setMailError] = useState(false)

    const query = UseQuery();

    const [data, setData] = useState({
        legajo: "",
        nombre: "",
        apellido: "",
        dni: "",
        tel:"",
        mail:"",
        diags: []
    })

    useEffect(() => {getPaciente()},[]);
    
	
	const getPaciente = async () => {
		const data1 = await fetch(`http://localhost:8080/paciente/`+ (query.toString().replace('q=', '')));
		const data2 = await data1.json();
        setData(data2)
        console.log(data)
		
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        try{
            setPacienteAgregado()
            handleSubmitField();
            handleSubmitMail();
            axios.put('http://localhost:8080/paciente/'+ data.legajo +'/update',data)
            .then((response) => {
                pacienteSiAgregado()
                //navigate("/paciente?q="+response.data.legajo);
            })
            .catch(pacienteNoAgregado())
        }
        catch{}

        
    }

    const pacienteSiAgregado = () => {
        setPacienteAgregado(<div className="success-added" data-test="success-added">
        <i aria-hidden="true"/>
            Paciente Actualizado 
    </div>)
    }

    const pacienteNoAgregado = () => {
        setPacienteAgregado(<div className="unsuccess-added" data-test="success-added">
                        <i aria-hidden="true"/>
                            El Paciente no pudo ser Actualizado
                    </div>)
    }

    const handleChange = (e) =>{
        const newData = {...data}
        newData[e.target.id] =e.target.value
        setData(newData)
    }

    const handleSubmitField = (event) => {
        Object.getOwnPropertyNames(data).forEach(function(val, index, array){
            if(data[val] == '' && val != 'diags' && val != 'legajo'){
                setTrySave(true)
                throw new Error(`error de campo vacio ${val}`);
            }
        })
    }

    const handleSubmitMail = (event) =>{
        var re = /\S+@\S+\.\S+/;
        if(!re.test(data.mail)){
            throw new Error(`error de mail invalido`);
        }
    }

    function validateEmail(email) 
    {
        if (email != ''){
            var re = /\S+@\S+\.\S+/;
            setMailError(!re.test(email));
        }else{
            setMailError(false)
        }
    }

      const handleChangeMail = (e) =>{
        const newData = {...data}
        newData[e.target.id] =e.target.value
        setData(newData)
        validateEmail(e.target.value)
    }

    return(
        <div >
            <h1 className="text-dark mt-3">Editar Paciente</h1>
            <div className="container mt-2 add-paciente">
                <form className='form-add' onSubmit={handleSubmit}>
                <img src={profile} className='profile-pic'/>
                <div class="form-row">
                    <div class="form-group col-md-20 mt-3 label-add">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" placeholder="Nombre"
                    value={data.nombre}
                    id = "nombre"
                    onChange={(e) => handleChange(e)}
                    />
                    { trySave && (!data.nombre) && (
                        <div class="audun_warn">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                            El campo "Nombre" no puede estar vacío
                        </div>
                    )}
                    </div>
                    <div class="form-group col-md-20">
                    <label for="apellido">Apellido</label>
                    <input type="text" class="form-control" placeholder="Apellido"
                    value={data.apellido}
                    id = "apellido"
                    onChange={(e) => handleChange(e)}
                    onSubmit={handleSubmitField}
                    />
                    { trySave && (!data.apellido) && (
                        <div class="audun_warn">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                            El campo "Apellido" no puede estar vacío
                        </div>
                    )}
                    </div>
                    <div class="form-group col-md-20">
                    <label for="dni">DNI</label>
                    <input type="number" class="form-control" placeholder="DNI"
                    value={data.dni}
                    id = "dni"
                    onChange={(e) => handleChange(e)}
                    onSubmit={handleSubmitField}
                    />
                    { trySave && (!data.dni) && (
                        <div class="audun_warn">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                            El campo "DNI" no puede estar vacío
                        </div>
                    )}
                    </div>
                    <div class="form-group col-md-20">
                    <label for="Telefono">Telefono</label>
                    <input type="number" class="form-control" placeholder="Telefono"
                    value={data.tel}
                    id = "tel"
                    onChange={(e) => handleChange(e)}
                    onSubmit={handleSubmitField}
                    />
                    </div>
                    { trySave && (!data.tel) && (
                        <div class="audun_warn">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                            El campo "Telefono" no puede estar vacío
                        </div>
                    )}
                    <div class="form-group col-md-20">
                    <label for="Mail">Mail</label>
                    <input type="text" class="form-control" placeholder="Mail"
                    value={data.mail}
                    id = "mail"
                    onChange={(e) => handleChangeMail(e)}
                    onSubmit={handleSubmitField}
                    />
                    { trySave && (!data.mail) && (
                        <div class="audun_warn" data-test="fail-title">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                            El campo "Mail" no puede estar vacío
                        </div>
                    )}
                    { mailError && (
                        <div class="audun_warn">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                            No es un mail valido
                        </div>
                    )}
                    </div>
                </div>
                <button className="comment-form-button mb-2 mt-3">
                    Actualizar Paciente
                </button>
                </form>
                
            </div>
            <center>
                {pacienteAgregado}
            </center>

        </div>
    )
}
export default EditPaciente