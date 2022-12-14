import React, { useEffect, useState, onSubmit } from 'react';
import profile from '../images/profile-image-default.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NuevoPaciente = () => {
    const navigate = useNavigate();

    const [trySave,setTrySave] = useState(false)
    const [pacienteAgregado, setPacienteAgregado] = useState()
    const [mailError, setMailError] = useState(false)

    const [data, setData] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        tel:"",
        mail:"",
        domicilio:"",
        diags: [],
        adulto: false
    })

    const handleSubmit = (event) =>{
        event.preventDefault()
        try{
            handleSubmitField();
            handleSubmitMail();
            axios.post('http://localhost:8080/paciente/save',data)
            .then((response) => {
                pacienteSiAgregado()
                setData({
                    nombre: "",
                    apellido: "",
                    dni: "",
                    tel:"",
                    mail:"",
                    domicilio:"",
                    diags: [],
                    adulto: false
                })
                navigate("/pacientes");
            })
            .catch(err => pacienteNoAgregado())
        }
        catch{}

        
    }

    const pacienteSiAgregado = () => {
        setPacienteAgregado(<div className="success-added" data-test="success-added">
        <i aria-hidden="true"/>
            Paciente agregado 
    </div>)
    }

    const pacienteNoAgregado = () => {
        setPacienteAgregado(<div className="unsuccess-added" data-test="success-added">
                        <i aria-hidden="true"/>
                            Paciente no Creado
                    </div>)
    }

    const handleChange = (e) =>{
        const newData = {...data}
        newData[e.target.id] =e.target.value
        setData(newData)
        console.log(data)
    }

    const handleSubmitField = (event) => {
        Object.getOwnPropertyNames(data).forEach(function(val, index, array){
            if(data[val] == '' && val != 'diags' && val != 'adulto'){
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

    const toggleChecked = (e) => {
        const newData = {...data}
        newData[e.target.id] = !data.adulto
        setData(newData)
        console.log(data)
    };


    return(
        <div>
            <h1 className="text-dark mt-3">Nuevo Paciente</h1>
            <div className="container mt-2 add-paciente">
                <form className='form-add' onSubmit={handleSubmit} data-testid="submit">
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
                            El campo "Nombre" no puede estar vac??o
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
                            El campo "Apellido" no puede estar vac??o
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
                            El campo "DNI" no puede estar vac??o
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
                            El campo "Telefono" no puede estar vac??o
                        </div>
                    )}
                    <div class="form-group col-md-20">
                    <label for="Domicilio">Domicilio</label>
                    <input type="text" class="form-control" placeholder="Domicilio"
                    value={data.domicilio}
                    id = "domicilio"
                    onChange={(e) => handleChange(e)}
                    onSubmit={handleSubmitField}
                    />
                    </div>
                    { trySave && (!data.domicilio) && (
                        <div class="audun_warn">
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                            El campo "Domicilio" no puede estar vac??o
                        </div>
                    )}
                    <div class="form-group col-md-20">
                    <label for="Mail">Mail</label>
                    <input type="text" class="form-control" placeholder="Mail"
                    value={data.mail}
                    data-testid="mail"
                    id = "mail"
                    onChange={(e) => handleChangeMail(e)}
                    onSubmit={handleSubmitField}
                    />
                    { trySave && (!data.mail) && (
                        <div class="audun_warn" >
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                            El campo "Mail" no puede estar vac??o
                        </div>
                    )}
                    { mailError && (
                        <div class="audun_warn" >
                            <i class="fa fa-exclamation-triangle" aria-hidden="true" data-testid="fail-mail"/>
                            No es un mail valido
                        </div>
                    )}
                    </div>

                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
                    <div class="form-check form-switch tipoPaciente">
                        <input class="form-check-input" type="checkbox" id="adulto" checked={data.adulto} onChange={(e) => toggleChecked(e)}/>
                        <label class="form-check-label checkAdulto" for="flexSwitchCheckChecked">Adulto</label>
                    </div>

                </div>
                <button className="comment-form-button mb-2 mt-3" data-testid="boton-submit">
                    Agregar Paciente
                </button>
                </form>
                
            </div>
            <center>
                {pacienteAgregado}
            </center>
        </div>
        
    )

}

export default NuevoPaciente